// import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/net.config'

const https = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      token: hasToken ? '1' : '2'
    }
  }
  return new HttpClient(config)
}

export const client = https()

const instance = client.httpClient

instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default https
