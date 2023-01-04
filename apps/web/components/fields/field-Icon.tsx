import {
  Icon123,
  IconCalendar,
  IconCalendarTime,
  IconLetterT,
  IconListCheck,
  IconQuestionMark,
  IconSquareCheck,
  useEgoUITheme,
} from '@egodb/ui'
import React from 'react'
interface FieldProps {
  type: string
  size?: number
  color?: string
}

export const FieldIcon: React.FC<FieldProps> = ({ type, size = 16, color }) => {
  const theme = useEgoUITheme()
  color = color ? color : theme.colors.gray[2]
  switch (type) {
    case 'string':
      return <IconLetterT size={size} color={color} />
    case 'number':
      return <Icon123 size={size} color={color} />
    case 'date':
      return <IconCalendar size={size} color={color} />
    case 'date-range':
      return <IconCalendarTime size={size} color={color} />
    case 'bool':
      return <IconSquareCheck size={size} color={color} />
    case 'select':
      return <IconListCheck size={size} color={color} />
    default:
      return <IconQuestionMark size={size} color={color} />
  }
}
