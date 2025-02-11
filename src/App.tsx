import { useState } from 'react'
import './App.css'
import Select from './Components/Select/Select'

function App() {
  const value = [
    { value: 'One', label: 'One' },
    { value: 'Two', label: 'Two' },
    { value: 'three', label: 'Three' },
    { value: 'four', label: 'Four' },
    { value: 'five', label: 'Five' },
    { value: 'six', label: 'Six' },
    { value: 'seven', label: 'Seven' },
    { value: 'eight', label: 'Eight' },
    { value: 'nine', label: 'Nine' },
  ]

  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <div className="wrapper">
      <Select
        id="my-select"
        options={value}
        onChange={handleChange}
        placeholder="Выберите"
      />
      {selectedValue && <p>Выбрано: {selectedValue}</p>}
    </div>
  )
}

export default App
