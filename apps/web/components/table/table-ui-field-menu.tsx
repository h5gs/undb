import type { Field } from '@egodb/core'
import { ActionIcon, IconDots, Menu } from '@egodb/ui'
import { FieldMenuDropdown } from '../field/field-menu-dropdown'

export const TableUIFieldMenu: React.FC<{ field: Field }> = ({ field }) => {
  return (
    <Menu width={180}>
      <Menu.Target>
        <ActionIcon>
          <IconDots size={14} />
        </ActionIcon>
      </Menu.Target>

      <FieldMenuDropdown field={field} />
    </Menu>
  )
}