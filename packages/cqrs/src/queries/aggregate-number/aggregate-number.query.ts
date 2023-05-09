import { Query } from '@undb/domain'
import type { IAggregateNumberQuery } from './aggregate-number.query.interface.js'

export class AggregateNumberQuery extends Query {
  public readonly tableId: string
  public readonly viewId?: string

  constructor(query: IAggregateNumberQuery) {
    super()
    this.tableId = query.tableId
    this.viewId = query.viewId
  }
}
