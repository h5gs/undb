import type { ICollaboratorProfile, UserId } from '@undb/core'
import type { Option } from 'oxide.ts'
import type { Role } from '../rbac/role.vo.js'
import type { MemberID } from './value-objects/index.js'

export class Member {
  id!: MemberID
  role!: Role
  userId!: UserId
  userProfile!: Option<ICollaboratorProfile>

  static empty() {
    return new this()
  }
}
