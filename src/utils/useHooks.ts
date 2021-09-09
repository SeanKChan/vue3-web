/* eslint no-return-assign: off */
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const inc = (delta = 1) => (count.value += delta)
  const dec = (delta = 1) => (count.value -= delta)
  const get = () => count.value
  const set = (val: number) => (count.value = val)
  const reset = (val = initialValue) => {
    initialValue = val // eslint-disable-line no-param-reassign
    return set(val)
  }
  const actions = { inc, dec, get, set, reset }

  return [count, actions] as const
}

export function useDate(
  d: dayjs.ConfigType = Date.now(),
  timeout = 0
) {
  const date = ref(dayjs(d))

  if (timeout) {
    let timerId: number

    onMounted(() => {
      timerId = window.setInterval(() => {
        date.value = dayjs(Date.now())
      }, timeout)
    })

    onUnmounted(() => {
      window.clearInterval(timerId)
    })
  }

  return date
}

export { dayjs }

export function useTimeout(delay = 0) {
  const ready = ref(false)
  let timerId: number

  onMounted(() => {
    timerId = window.setTimeout(() => {
      ready.value = true
    }, delay)
  })

  onUnmounted(() => {
    window.clearTimeout(timerId)
  })

  return ready
}

export function useMountedState() {
  const isMounted = ref(false)

  onMounted(async () => {
    await nextTick()
    isMounted.value = true
  })

  return isMounted
}

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  const widthPixel = computed(() => `${width.value}px`)
  const heightPixel = computed(() => `${height.value}px`)

  onMounted(() => {
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { width, height, widthPixel, heightPixel }
}
