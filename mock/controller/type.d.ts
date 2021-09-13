export interface RoleBean {
  roleId: string
  roleName: string
}

export interface UserBean {
  uid: string
  username: string
  nickname: string
  avatar: string
  roles: RoleBean[]
}
