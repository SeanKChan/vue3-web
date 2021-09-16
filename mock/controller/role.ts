

import roles from "../mockdb/role";
import faker from "faker";
import { post, prefix, get, put, del } from "../requestDecorator";

@prefix('/api/roles')
export default class Roles {

  @get('')
  async getRoles() {
    return {
      total: roles.length,
      items: roles
    }
  }

  @put('/createRole')
  async createRole() {
    return {
      key: faker.datatype.number({ min: 3, max: 10000 })
    }
  }

  @post('/updateRole')
  async updateRole(ctx: any) {
    const { role } = ctx.request.body
    return {
      role
    }
  }

  @del('/deleteRole')
  async deleteRole() {
    return 'delete success'
  }


}
