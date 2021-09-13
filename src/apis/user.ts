import { RootObject } from '@/model/rootObject'
import { UserInfoModel } from '@/model/userModel'
import { client } from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'

export const getUserInfo = (uid: string) => {
  return client.request<RootObject<UserInfoModel>>(`user/${uid}`, Method.GET, undefined, ContentType.form)
}
