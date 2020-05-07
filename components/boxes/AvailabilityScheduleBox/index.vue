<template>
  <div class="at-availability-schedule-box">
    <h3 class="title">{{ $t('availableTimes') }}</h3>
    <div class="control-panel">
      <div class="left-section">
        <el-button-group class="el-button-group">
          <el-button
            :disabled="isPreviousWeekDisabled"
            class="el-button"
            icon="el-icon-arrow-left"
            size="mini"
            @click="handlePreviousWeekClick"
          />
          <el-button
            class="el-button"
            icon="el-icon-arrow-right"
            size="mini"
            @click="handleNextWeekClick"
          />
        </el-button-group>
        <div class="date-range-text">{{ dateRangeText }}</div>
      </div>
      <div class="right-section">
        <div class="timezone-specification-text">
          {{ $t('allTimesAreListedInYourTimeZone', { cityName: $t(cityName), timeZone: timeZoneText }) }}
        </div>
      </div>
    </div>
    <div class="schedule-section">
      <div
        v-for="dayOfWeek in 7"
        :key="dayOfWeek"
        class="schedule-column"
      >
        <div
          :class="{
            'date-box': true,
            disabled: !isThisDayAvailable(dayOfWeek),
          }"
        >
          <span class="day-text">{{ getDayText(dayOfWeek) }}</span>
          <span class="date-text">{{ getDateText(dayOfWeek) }}</span>
        </div>
        <div v-if="isThisDayAvailable(dayOfWeek)" class="time-slot-list">
          <div
            v-for="(time, idx) of scheduleDataGroupedByDay[dayOfWeek - 1]"
            :key="idx"
            :class="{
              'time-text': true,
              disabled: !time.available,
            }"
          >
            {{ getTimeText(time.startDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStartDateOfWeek,
  addDaysToDate,
  getDifferenceInDays,
  getDateRangeText,
  areDatesCrossYear,
  areDatesCrossMonth,
  isDateLeftBeforeDateRight,
  formatDate,
} from '@/utils/date.ts'
import i18nMessages from './i18n-messages'

export default {
  name: 'AvailabilityScheduleBox',

  i18n: {
    messages: i18nMessages,
  },

  props: {
    startDateOfWeek: {
      type: Date,
      default: new Date(),
    },
    scheduleData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      currentDate: new Date(),
      cityName: this.getCityName(),
    }
  },

  computed: {
    timeZoneText() {
      return formatDate(this.currentDate, 'OOOO')
    },
    isPreviousWeekDisabled() {
      return isDateLeftBeforeDateRight(this.startDateOfWeek, this.currentDate)
    },
    scheduleDataGroupedByDay() {
      return this.groupScheduleDataByDay(this.startDateOfWeek, this.scheduleData)
    },
    dateRangeText() {
      const endDateOfWeek = addDaysToDate(this.startDateOfWeek, 6)
      return getDateRangeText(this.startDateOfWeek, endDateOfWeek)
    },
  },

  methods: {
    groupScheduleDataByDay(startDateOfWeek, scheduleData) {
      const scheduleMap = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      }
      const availableTimes = scheduleData.available.map(({ start }) => ({
          startDate: new Date(start),
          available: true,
      }))
      const bookedTimes = scheduleData.booked.map(({ start }) => ({
          startDate: new Date(start),
          available: false,
      }))
      const combinedTimes = availableTimes.concat(bookedTimes).filter(({ startDate }) => {
        return isDateLeftBeforeDateRight(this.currentDate, startDate)
      })
      combinedTimes.sort((aTime, bTime) => {
        return isDateLeftBeforeDateRight(aTime.startDate, bTime.startDate) ? -1 : 1
      })
      combinedTimes.forEach(({ startDate, available }) => {
        const diffInDays = getDifferenceInDays(startDateOfWeek, startDate)
        if (diffInDays > 6 || diffInDays < 0) {
          return
        }
        scheduleMap[diffInDays].push({
          startDate,
          available,
        })
      })
      return scheduleMap
    },
    getCityName() {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (timeZone.indexOf('/') > -1) {
        return timeZone.split('/')[1].toLowerCase()
      } else {
        return timeZone
      }
    },
    getTimeText(date) {
      return formatDate(date, 'HH:mm')
    },
    getDayText(dayOfWeek) {
      const newDate = addDaysToDate(this.startDateOfWeek, dayOfWeek - 1)
      const DayShortCut = formatDate(newDate, 'EEE')

      return this.$t(DayShortCut)
    },
    getDateText(dayOfWeek) {
      const newDate = addDaysToDate(this.startDateOfWeek, dayOfWeek - 1)

      return formatDate(newDate, 'dd')
    },
    isThisDayAvailable(dayOfWeek) {
      const newDate = addDaysToDate(this.startDateOfWeek, dayOfWeek)
      const hasAnyTimeAvailable = this.scheduleDataGroupedByDay[dayOfWeek - 1].length > 0
      return isDateLeftBeforeDateRight(this.currentDate, newDate) && hasAnyTimeAvailable
    },

    handlePreviousWeekClick(event) {
      event.target.blur()
      this.$emit('start-date-of-week-update', addDaysToDate(this.startDateOfWeek, -7))
    },

    handleNextWeekClick(event) {
      event.target.blur()
      this.$emit('start-date-of-week-update', addDaysToDate(this.startDateOfWeek, 7))
    },
  },

  created() {
    this.currentDate = new Date()
  },
}
</script>>

<style lang="scss" scoped>
.at-availability-schedule-box {
  display: flex;
  flex-flow: column;
  width: 100%;

  .title {
    font-size: $at-font-size-md;
    text-align: left;
    font-weight: 500;
    line-height: 25px;
  }

  .control-panel {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    .left-section {
      display: flex;
      align-items: center;
      flex-shrink: 0;

      .el-button-group > .el-button {
        margin-left: 0;
        &:hover, &:focus {
          background: none;
        }
      }

      .date-range-text {
        font-size: $at-font-size-sm;
        margin-left: 15px;
      }
    }

    .right-section {
      flex-grow: 1;
      margin-left: 15px;
      .timezone-specification-text {
        text-align: right;
        font-size: $at-font-size-xs;
        line-height: 25px;
      }
    }
  }

  .schedule-section {
    display: flex;
    flex-flow: row;
    margin-top: 15px;

    .schedule-column {
      flex: 1;
      padding: 0 5px;

      .date-box {
        display: flex;
        flex-flow: column;
        align-items: center;
        border-top: 4px solid $at-green500;
        padding: 10px 0;

        .day-text, .date-text {
          line-height: 24px;
          font-size: $at-font-size-sm;
        }

        &.disabled {
          border-top: 4px solid $at-blueGrey200;

          .day-text, .date-text {
            color: $at-blueGrey200;
          }
        }
      }

      .time-slot-list {
        .time-text {
          font-size: $at-font-size-xs;
          line-height: 20px;
          padding: 3px 0;
          color: $at-green500;
          text-align: center;
          font-weight: 700;

          &.disabled {
            color: $at-blueGrey300;
            font-weight: unset;
          }
        }
      }
    }
  }
}
</style>
