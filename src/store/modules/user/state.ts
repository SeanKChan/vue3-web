import { getToken } from '@/utils/cookies'

export interface RoleState {
  roleName: string
  roleId: string
}

export interface UserState {
  token: string
  name: string
  avatar: string
  roles?: RoleState[]
}

export const state: UserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  roles: []
}
