import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { type IRecordRepository, type ITableRepository } from '@undb/core'
import { CreateRecordsCommand, CreateRecordsCommandHandler as DomainHandler } from '@undb/cqrs'
import { InjectRecordRepository, InjectTableRepository } from '../adapters/index.js'

@CommandHandler(CreateRecordsCommand)
export class CreateRecordsCommandHandler extends DomainHandler implements ICommandHandler<CreateRecordsCommand> {
  constructor(
    @InjectTableRepository()
    protected readonly tableRepo: ITableRepository,

    @InjectRecordRepository()
    protected readonly recordRepo: IRecordRepository,
  ) {
    super(tableRepo, recordRepo)
  }
}
