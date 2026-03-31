import { type ChangeEvent } from 'react'
import { AlertCircle, SlidersHorizontal } from 'lucide-react'

import { AI_PROVIDERS } from '@/constants/aiProviders'
import { Skeleton } from '@/components/ui/skeleton'
import type { AgentData } from '@/types/agent'

interface ConfigurationOptionsProps {
  data: AgentData | null
  loading: boolean
  error: string | null
  selectedProfile: string
  selectedProvider: string
  onProfileChange: (profileId: string) => void
  onProviderChange: (provider: string) => void
  onSkillSelect: (e: ChangeEvent<HTMLSelectElement>) => void
  onLayerSelect: (e: ChangeEvent<HTMLSelectElement>) => void
}

export function ConfigurationOptions({
  data,
  loading,
  error,
  selectedProfile,
  selectedProvider,
  onProfileChange,
  onProviderChange,
  onSkillSelect,
  onLayerSelect,
}: ConfigurationOptionsProps) {
  return (
    <section className="flex min-h-0 flex-col" aria-labelledby="config-heading">
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <SlidersHorizontal className="size-5 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
        <h2
          id="config-heading"
          className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl"
        >
          Configuration
        </h2>
      </div>

      <div className="card-panel flex flex-1 flex-col">
        {error && (
          <div
            className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-200"
            role="alert"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>{error}</span>
          </div>
        )}

        {loading && !data && (
          <div className="mb-4 space-y-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/50">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        )}

        {!data && !loading && !error && (
          <p className="text-sm text-slate-500 dark:text-slate-400">No data loaded yet.</p>
        )}

        {data && !loading && (
          <div className="flex flex-col gap-5 sm:gap-6">
            <div>
              <label htmlFor="profile-select" className="field-label">
                Base profile
              </label>
              <select
                id="profile-select"
                value={selectedProfile}
                onChange={(e) => onProfileChange(e.target.value)}
                className="input-field"
              >
                <option value="">Select a profile</option>
                {data.agentProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="skill-select" className="field-label">
                Add skill
              </label>
              <select
                id="skill-select"
                onChange={onSkillSelect}
                defaultValue=""
                className="input-field"
              >
                <option value="" disabled>
                  Choose a skill to add
                </option>
                {data.skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="layer-select" className="field-label">
                Add personality layer
              </label>
              <select
                id="layer-select"
                onChange={onLayerSelect}
                defaultValue=""
                className="input-field"
              >
                <option value="" disabled>
                  Choose a layer to add
                </option>
                {data.layers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="provider-select" className="field-label">
                AI provider
              </label>
              <select
                id="provider-select"
                value={selectedProvider}
                onChange={(e) => onProviderChange(e.target.value)}
                className="input-field"
              >
                <option value="">Select a provider</option>
                {AI_PROVIDERS.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
