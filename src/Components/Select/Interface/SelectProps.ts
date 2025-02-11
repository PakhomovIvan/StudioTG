import { SelectOption } from './SelectOption'

export interface SelectProps {
  options: SelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  id?: string
}
