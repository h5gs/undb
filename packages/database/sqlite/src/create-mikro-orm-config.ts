import { BetterSqliteDriver } from '@mikro-orm/better-sqlite'
import { defineConfig, FlushMode, ReflectMetadataProvider } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import path from 'path'
import { entities } from './entity/index.js'
import { SqliteLogger } from './logger.js'
import { Migration20230528115246 } from './migrations/Migration20230528115246.js'
import { Migration20230612140223 } from './migrations/Migration20230612140223.js'
import { Migration20230614092829 } from './migrations/Migration20230614092829.js'

export const createConfig = (data: string, env = 'development') =>
  defineConfig({
    entities,
    entitiesTs: entities,
    highlighter: new SqlHighlighter(),
    metadataProvider: ReflectMetadataProvider,
    driver: BetterSqliteDriver,
    dbName: path.join(data, `undb.db`),
    debug: env !== 'production' ? ['query'] : false,
    forceUndefined: true,
    flushMode: FlushMode.ALWAYS,
    loggerFactory: (options) => new SqliteLogger(options),
    migrations: {
      disableForeignKeys: true,
      snapshot: true,
      migrationsList: [
        {
          name: 'initial',
          class: Migration20230528115246,
        },
        {
          name: 'create outbox',
          class: Migration20230612140223,
        },
        {
          name: 'create webhook',
          class: Migration20230614092829,
        },
      ],
    },
    schemaGenerator: {
      disableForeignKeys: true,
      createForeignKeyConstraints: true,
    },
  })
