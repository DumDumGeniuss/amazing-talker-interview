<template>
  <div class="container">
    <at-availability-schedule-box
      :start-date-of-week="startDateOfWeek"
      @start-date-of-week-update="handleStartDateOfWeekUpdate"
      :schedule-data="scheduleData"
      :loading="isFetchingScheduleData"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { getStartDateOfWeek } from '@/utils/date.ts'
import { fetchScheduleData } from '@/api/schedule'

export default Vue.extend({
  name: 'DemoPage',
  data() {
    return {
      startDateOfWeek: getStartDateOfWeek(new Date()),
      scheduleData: { available: [], booked: [] },
      isFetchingScheduleData: false,
    }
  },
  methods: {
    async handleStartDateOfWeekUpdate(newStartDateOfWeek) {
      this.startDateOfWeek = newStartDateOfWeek
      await this.fetchScheduleData(newStartDateOfWeek)
    },
    async fetchScheduleData(startDateOfWeek) {
      try {
        // this.isFetchingScheduleData = true
        this.scheduleData = await fetchScheduleData(startDateOfWeek)
      } catch (error) {
        console.error(error)
      } finally {
        this.isFetchingScheduleData = false
      }
    },
  },
  created() {
    this.fetchScheduleData(this.startDateOfWeek)
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  padding: 2rem 10px;
  min-height: 100vh;
}
</style>
