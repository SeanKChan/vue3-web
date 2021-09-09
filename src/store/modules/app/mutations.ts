
import { MutationTree } from 'vuex'
import { AppState, DeviceType } from './state'
import { AppMutationTypes } from './mutation-types'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
  [AppMutationTypes.SET_SIZE](state: S, size: string): void

}

export const mutations: MutationTree<AppState> & Mutations = {

  [AppMutationTypes.TOGGLE_DEVICE](state: AppState, device: DeviceType) {
    state.device = device
  },

  [AppMutationTypes.SET_SIZE](state: AppState, size: string) {
    state.size = size
  }

}
