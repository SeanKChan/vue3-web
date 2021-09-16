<template>
  <ArticleForm :isEdit="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleForm from './components/ArticleForm.vue'

export default defineComponent({
  components: {
    ArticleForm
  }
})
</script>
