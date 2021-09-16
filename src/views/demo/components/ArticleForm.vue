<template>
  <el-form
    class="app-container"
    ref="formNode"
    :model="form"
    label-width="80px"
  >
    <el-form-item label="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="author">
      <el-select
        v-model="form.author"
        :remote-method="getRemoteUserList"
        filterable
        default-first-option
        remote
        placeholder="Search Author"
      >
        <el-option
          v-for="(item, index) in userListOptions"
          :key="item + index"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Comment">
      <el-radio-group v-model="form.disableComment">
        <el-radio :label="true">
          open
        </el-radio>
        <el-radio :label="false">
          close
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="platforms">
      <el-checkbox-group v-model="form.platforms">
        <el-checkbox label="a-platform">
          a-platform
        </el-checkbox>
        <el-checkbox label="b-platform">
          b-platform
        </el-checkbox>
        <el-checkbox label="c-platform">
          c-platform
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="SourceURL">
      <el-input v-model="form.sourceURL" />
    </el-form-item>
    <el-form-item label="Publish Time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.publishTime"
          style="width: 100%;"
        />
      </el-col>
    </el-form-item>
    <el-form-item
      label-width="90px"
      label="Importance:"
      class="postInfo-container-item"
    >
      <el-rate
        v-model="form.importance"
        :max="3"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        :low-threshold="1"
        :high-threshold="3"
        style="display: inline-block"
      />
    </el-form-item>
    <el-form-item
      prop="content"
      style="margin-bottom: 30px"
    >
      <Tinymce
        ref="editor"
        :value="form.fullContent"
        height="400px"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm"
      >
        Submit
      </el-button>
      <el-button>Cancle</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  unref,
  onDeactivated,
  onActivated,
  onBeforeMount,
  toRefs
} from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElForm } from 'element-plus'
import { isValidURL } from '@/utils/validate'
import { getArticle, defaultArticleModel } from '@/apis/articles'
import { getUsers } from '@/apis/user'
import Tinymce from '@/components/tinymce/Index.vue'

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Tinymce
  },
  setup(props) {
    const formNode = ref(ElForm)
    const validateRequire = (rule: any, value: string, callback: Function) => {
      if (value === '') {
        if (rule.field === 'imageURL') {
          ElMessage.error({
            message: 'Upload cover image is required',
            type: 'error'
          })
        } else {
          ElMessage.error({
            message: rule.field + ' is required',
            type: 'error'
          })
        }
        callback(new Error(rule.field + ' is required'))
      } else {
        callback()
      }
    }
    const validateSourceUrl = (rule: any, value: string, callback: any) => {
      if (value) {
        if (isValidURL(value)) {
          callback()
        } else {
          ElMessage.error({
            message: 'Invalid URL',
            type: 'error'
          })
          callback(new Error('Invalid URL'))
        }
      } else {
        callback()
      }
    }

    const dataMap = reactive({
      route: useRoute(),
      form: Object.assign({}, defaultArticleModel),
      loading: false,
      userListOptions: [],
      rules: {
        imageURL: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        fullContent: [{ validator: validateRequire }],
        sourceURL: [{ validator: validateSourceUrl, trigger: 'blur' }]
      },
      tinymceActive: true
    })

    const fetchData = async (id: any) => {
      try {
        const res = await getArticle(id)
        if (res?.code === 0) {
          dataMap.form = res.data
        }
      } catch (err) {
        console.error(err)
      }
    }

    const submitForm = () => {
      const _form = unref(formNode)
      _form.validate((valid: any) => {
        if (valid) {
          dataMap.loading = true
          ElMessage.success({
            message: 'The post published successfully',
            type: 'success',
            duration: 2000
          })
          setTimeout(() => {
            dataMap.loading = false
          }, 0.5 * 1000)
        } else {
          console.error('Submit Error!')
          return false
        }
      })
    }

    const getRemoteUserList = async (name: string) => {
      const res = await getUsers({ name })
      if (!res?.data.items) return
      dataMap.userListOptions = res.data.items.map((v: any) => v.name)
    }
    onDeactivated(() => {
      dataMap.tinymceActive = false
    })
    onActivated(() => {
      dataMap.tinymceActive = true
    })
    onBeforeMount(() => {
      if (props.isEdit) {
        const id = dataMap.route.params?.id
        fetchData(id)
      }
    })

    return {
      ...toRefs(dataMap),
      validateRequire,
      validateSourceUrl,
      fetchData,
      submitForm,
      getRemoteUserList
    }
  }
})
</script>
