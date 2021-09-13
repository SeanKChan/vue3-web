// {
//   "code": 0,
//   "msg": "success",
//   "data": {
//       "uid": 0,
//       "username": "admin",
//       "nickname": "Super Admin",
//       "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
//       "roles": [
//         {
//           "roleId": "001773",
//           "roleName": "市场监督员"
//         }

//       ]
//   }
// }

export interface RoleInfoModel {
  roleId: string
  roleName: string
}

export interface UserInfoModel {
  uid: number
  username: string
  nickname: string
  avatar: string
  roles: RoleInfoModel[]
}
