import { RecordFactory } from '@egodb/core'
import { useGetRecordsQuery } from '@egodb/store'
import { useCurrentTable } from '../../hooks/use-current-table'
import { useCurrentView } from '../../hooks/use-current-view'
import { EGOTable } from './table'

export const TableUI: React.FC = () => {
  const table = useCurrentTable()
  const view = useCurrentView()

  const { rawRecords } = useGetRecordsQuery(
    { tableId: table.id.value, viewId: view.id.value },
    {
      selectFromResult: (result) => ({
        ...result,
        rawRecords: (Object.values(result.data?.entities ?? {}) ?? []).filter(Boolean),
      }),
      refetchOnFocus: true,
    },
  )

  const records = RecordFactory.fromQueryRecords(rawRecords, table.schema.toIdMap())

  return <EGOTable records={records} />
}