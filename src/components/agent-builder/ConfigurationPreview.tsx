import { LayoutDashboard, Save, Sparkles, Wrench, X } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import type { AgentData } from '@/types/agent'

interface ConfigurationPreviewProps {
  data: AgentData | null
  loading: boolean
  selectedProfile: string
  selectedSkills: string[]
  selectedLayers: string[]
  selectedProvider: string
  agentName: string
  onAgentNameChange: (name: string) => void
  onSaveAgent: () => void
  onRemoveSkill: (skillId: string) => void
  onRemoveLayer: (layerId: string) => void
}

export function ConfigurationPreview({
  data,
  loading,
  selectedProfile,
  selectedSkills,
  selectedLayers,
  selectedProvider,
  agentName,
  onAgentNameChange,
  onSaveAgent,
  onRemoveSkill,
  onRemoveLayer,
}: ConfigurationPreviewProps) {
  return (
    <section
      className="flex min-h-0 flex-col"
      aria-labelledby="preview-heading"
    >
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <LayoutDashboard className="size-5 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
        <h2
          id="preview-heading"
          className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl"
        >
          Current build
        </h2>
      </div>

      <div className="card-panel flex min-h-[min(28rem,70vh)] flex-col">
        {loading && !data && (
          <div className="mb-6 space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        )}

        <div className={`space-y-6 ${loading && !data ? 'hidden' : ''}`}>
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Sparkles className="size-3.5" aria-hidden />
              Profile
            </h3>
            {selectedProfile && data ? (
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {
                    data.agentProfiles.find((p) => p.id === selectedProfile)
                      ?.name
                  }
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {' '}
                  —{' '}
                  {
                    data.agentProfiles.find((p) => p.id === selectedProfile)
                      ?.description
                  }
                </span>
              </p>
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500">No profile selected.</p>
            )}
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Wrench className="size-3.5" aria-hidden />
              Skills
            </h3>
            {selectedSkills.length > 0 && data ? (
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/50 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/60">
                {selectedSkills.map((skillId) => {
                  const skill = data.skills.find((s) => s.id === skillId)
                  return (
                    <li
                      key={skillId}
                      className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm first:rounded-t-xl last:rounded-b-xl"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {skill?.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(skillId)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <X className="size-3.5" aria-hidden />
                        Remove
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500">No skills added.</p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Layers
            </h3>
            {selectedLayers.length > 0 && data ? (
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/50 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/60">
                {selectedLayers.map((layerId) => {
                  const layer = data.layers.find((l) => l.id === layerId)
                  return (
                    <li
                      key={layerId}
                      className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm first:rounded-t-xl last:rounded-b-xl"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {layer?.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveLayer(layerId)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <X className="size-3.5" aria-hidden />
                        Remove
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500">No layers added.</p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Provider
            </h3>
            {selectedProvider ? (
              <p className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-900">
                {selectedProvider}
              </p>
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500">No provider selected.</p>
            )}
          </div>
        </div>

        {loading && !data ? (
          <div className="mt-auto border-t border-slate-200 pt-6 dark:border-slate-700">
            <Skeleton className="mb-3 h-4 w-28 dark:bg-slate-800" />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <Skeleton className="h-10 min-w-0 flex-1 dark:bg-slate-800" />
              <Skeleton className="h-10 w-28 dark:bg-slate-800" />
            </div>
          </div>
        ) : (
          <div className="mt-auto border-t border-slate-200 pt-6 dark:border-slate-700">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Save className="size-4 text-teal-600" aria-hidden />
              Save this agent
            </h3>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <input
                type="text"
                placeholder="Agent display name…"
                value={agentName}
                onChange={(e) => onAgentNameChange(e.target.value)}
                className="input-field min-w-0 flex-1"
                aria-label="Agent name"
              />
              <button
                type="button"
                onClick={onSaveAgent}
                className="btn-primary shrink-0 sm:px-6"
              >
                Save agent
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
