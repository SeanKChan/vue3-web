<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'

export default defineComponent({
  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch(UserActionTypes.GET_USER_INFO, 'user_1')
    })
  }
})
</script>
