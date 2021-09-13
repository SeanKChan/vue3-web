import { UserBean } from "controller/type"
import faker from 'faker'

const userList: UserBean[] = []

for (let i = 0; i < 10; i++) {
  userList.push({
    uid: `user_${i + 1}`,
    username: faker.internet.userName(),
    nickname: faker.name.findName(),
    avatar: faker.image.avatar(),
    roles: [
      {
        roleId: faker.datatype.uuid(),
        roleName: faker.vehicle.vehicle()
      }
    ]
  })
}

export default userList
