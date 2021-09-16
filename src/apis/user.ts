import { RootObject } from '@/model/rootObject'
import { UserInfoModel, Users } from '@/model/userModel'
import { client } from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'

export const getUserInfo = (uid: string) => {
  return client.request<RootObject<UserInfoModel>>(`users/${uid}`, Method.GET, undefined, ContentType.form)
}

export const getUsers = (user: any) => {
  return client.request<RootObject<Users>>('users', Method.GET, user, ContentType.form)
}
