

import { prefix, get } from "../requestDecorator";
import userList from "../mockdb/userList";
import * as Koa from 'koa';
import { find } from 'lodash';
@prefix('/api/users')
export default class User {

  @get('/:id')
  async getUserInfo(ctx: Koa.Context) {
    const { id } = ctx.params
    return find(userList, ['id', id]) || userList[0]
  }

  @get('')
  async getUsers(ctx: any) {
    const { name } = ctx.query
    const users = userList.filter(user => {
      const lowerCaseName = user.name.toLowerCase()
      return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
    })
    return {
      code: 0,
      data: {
        items: users
      }
    }
  }
}
