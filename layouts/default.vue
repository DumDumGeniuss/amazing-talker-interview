<template>
  <div>
    <nuxt />
    <el-button-group class="el-button-group">
      <el-button
        :disabled="isPreviousWeekDisabled"
        class="el-button"
        size="medium"
        :type="$i18n.locale === 'en' ? 'primary' : null"
        @click="changeLocale('en')"
      >
        English
      </el-button>
      <el-button
        class="el-button"
        size="medium"
        :type="$i18n.locale === 'zh-TW' ? 'primary' : null"
        @click="changeLocale('zh-TW')"
      >
        中文
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>>

<style lang="scss" scoped>
.el-button-group {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>>