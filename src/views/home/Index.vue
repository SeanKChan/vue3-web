<template>
  <div class="home-container">
    <section class="home-container__header">
      <p>浏览最新视频，熟悉平台快速上手解决疑难问</p>
    </section>
    <section class="home-container__content">
      <el-tabs v-model="activeTab">
        <el-tab-pane
          v-for="(v, k) in MediatTabsConfig"
          :key="k"
          :label="v"
          :name="k"
        >
          {{ v }}
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MediatTabsConfig, MediaTabs } from '@/config'

export default defineComponent({
  setup() {
    const activeTab = ref<string>(MediaTabs.hot)
    return {
      activeTab,
      MediatTabsConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: relative;

  &__header {
    height: 130px;
    background-color: green;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    p {
      color: #3357d7;
      font-size: 13px;
    }
  }
}
</style>
