import { MutationTree } from 'vuex'
import { UserState, RoleState } from './state'
import { UserMutationTypes } from './mutation-types'

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_NAME](state: S, name: string): void
  [UserMutationTypes.SET_AVATAR](state: S, avatar: string): void
  [UserMutationTypes.SET_ROLES](state: S, roles: RoleState[]): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState, token: string) {
    state.token = token
  },

  [UserMutationTypes.SET_NAME](state: UserState, name: string) {
    state.name = name
  },

  [UserMutationTypes.SET_AVATAR](state: UserState, avatar: string) {
    state.avatar = avatar
  },

  [UserMutationTypes.SET_ROLES](state: UserState, roles: RoleState[]) {
    state.roles = roles
  }

}
