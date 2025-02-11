import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SelectOption } from './Interface/SelectOption'
import { SelectProps } from './Interface/SelectProps'
import './Select.scss'

const Select = ({
  options,
  onChange,
  placeholder = 'Выберите значение',
  id,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const listId = 'select-list'
  const activeDescendantId = 'select-option'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      )
        setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, selectRef])

  const handleOptionClick = useCallback(
    (option: SelectOption) => {
      setSelectedValue(option.value)
      onChange(option.value)
      setIsOpen(false)
      setSearchTerm('')
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
    [onChange]
  )

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options
    const lowerSearchTerm = searchTerm.toLowerCase()
    return options.filter((option) =>
      option.label.toLowerCase().includes(lowerSearchTerm)
    )
  }, [options, searchTerm])

  const handleInputClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (selectedValue) {
      setSelectedValue(null)
      onChange('')
    }
  }

  const inputValue = useMemo(() => {
    if (isOpen) return searchTerm
    return options.find((option) => option.value === selectedValue)?.label || ''
  }, [isOpen, searchTerm, selectedValue, options])

  return (
    <div className="select" ref={selectRef}>
      <input
        ref={inputRef}
        id={id}
        className="select-input"
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onClick={handleInputClick}
        onChange={handleInputChange}
        readOnly={!isOpen}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="select-label"
        role="combobox"
      />
      <div
        className={`select-arrow ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <img src="/icons/arrow-up.svg" alt="arrow-up" />
        ) : (
          <img src="/icons/arrow-down.svg" alt="arrow-down" />
        )}
      </div>
      {isOpen && (
        <ul
          className="select-options"
          id={listId}
          role="listbox"
          aria-activedescendant={activeDescendantId}
        >
          {filteredOptions.length === 0 ? (
            <li className="select-option-empty">Нет вариантов для выбора</li>
          ) : (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                className={`select-option ${
                  selectedValue === option.value ? 'select-option-selected' : ''
                }`}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={selectedValue === option.value}
                id={activeDescendantId}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default Select
