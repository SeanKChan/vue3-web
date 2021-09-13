
import { prefix, get } from "../requestDecorator";
import userList from "../mockdb/userList";
import * as Koa from 'koa';
import { find } from 'lodash'
@prefix('/api/user')
export default class User {
  @get('/:uid')
  async getUserInfo(ctx: Koa.Context) {
    const { uid } = ctx.params
    const { token } = ctx.request.header
    console.log('token', token)
    return find(userList, ['uid', uid])
  }
}
