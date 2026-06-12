import React from 'react'

interface Props {
  value: string
  onChange: (val: string) => void
}

export function ConfigNameInput({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="config-name" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
        Design Name
      </label>
      <input
        id="config-name"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={60}
        placeholder="e.g. Summer Runner Pro"
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
        aria-label="Design name"
      />
    </div>
  )
}
