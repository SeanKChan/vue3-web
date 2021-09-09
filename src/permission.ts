import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  // Start progress bar
  NProgress.start()
  setTimeout(() => {
    NProgress.done()
    next()
  }, 500)
})

// router.afterEach((to: RouteLocationNormalized) => {
//   // Finish progress bar
//   // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
//   NProgress.done()
// })
