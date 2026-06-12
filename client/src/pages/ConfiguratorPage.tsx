import React from 'react'
import { useConfigurator } from '../hooks/useConfigurator'
import { ProductTypeSelector } from '../components/ProductTypeSelector'
import { ColorPicker } from '../components/ColorPicker'
import { MaterialSelector } from '../components/MaterialSelector'
import { ProductPreview } from '../components/ProductPreview'
import { ConfigNameInput } from '../components/ConfigNameInput'
import { SharePanel } from '../components/SharePanel'

export function ConfiguratorPage() {
  const {
    config, isSaving, shareUrl, error,
    updateProductType, updateColor, updateMaterial, updateName, saveConfig,
  } = useConfigurator()

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Design Studio</h1>
            <p className="text-xs text-gray-400 mt-0.5">Product Configurator</p>
          </div>
          <span className="text-xs text-gray-400">Real-time preview</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section aria-label="Configuration panel" className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              <ConfigNameInput value={config.name} onChange={updateName} />
              <hr className="border-gray-100" />
              <ProductTypeSelector selected={config.productType} onChange={updateProductType} />
              <hr className="border-gray-100" />
              <ColorPicker selectedId={config.colorId} onChange={updateColor} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <MaterialSelector selectedId={config.materialId} onChange={updateMaterial} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <button
                onClick={saveConfig}
                disabled={isSaving}
                className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                aria-busy={isSaving}
              >
                {isSaving ? 'Saving…' : 'Save & Get Link'}
              </button>

              {error && <p role="alert" className="mt-3 text-sm text-red-600 text-center">{error}</p>}
              {shareUrl && <SharePanel url={shareUrl} />}
            </div>
          </section>

          <section
            aria-label="Live product preview"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px] flex flex-col"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Live Preview</p>
            <div className="flex-1">
              <ProductPreview config={config} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
