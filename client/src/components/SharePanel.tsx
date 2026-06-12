import React, { useState } from 'react'

interface Props {
  url: string
}

export function SharePanel({ url }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
      <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-wide">Shareable Link</p>
      <div className="flex gap-2">
        <input
          readOnly
          value={url}
          className="flex-1 px-3 py-2 text-xs bg-white border border-green-200 rounded-lg text-gray-600 truncate focus:outline-none"
          aria-label="Share URL"
        />
        <button
          onClick={handleCopy}
          className="px-3 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
          aria-label="Copy link to clipboard"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
