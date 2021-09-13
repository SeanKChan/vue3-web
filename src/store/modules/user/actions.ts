import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { UserActionTypes } from './action-types'
import { getUserInfo } from '@/apis/user'
import { removeToken } from '@/utils/cookies'
import { RootObject } from '@/model/rootObject'
import { UserInfoModel } from '@/model/userModel'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.RESET_TOKEN](
    { commit }: AugmentedActionContext
  ): void
  [UserActionTypes.GET_USER_INFO](
    { commit }: AugmentedActionContext,
    uid: string
  ): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {

  [UserActionTypes.RESET_TOKEN](
    { commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },

  async [UserActionTypes.GET_USER_INFO](
    { commit }: AugmentedActionContext,
    uid: string
  ) {
    const res = await getUserInfo(uid) as RootObject<UserInfoModel>
    if (res.code !== 0) {
      throw Error('接口报错')
    }
    const { nickname, avatar, roles } = res.data
    commit(UserMutationTypes.SET_NAME, nickname)
    commit(UserMutationTypes.SET_AVATAR, avatar)
    commit(UserMutationTypes.SET_ROLES, roles)
  }
}
