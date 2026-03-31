import { Archive, Trash2 } from 'lucide-react'

import type { AgentData, SavedAgent } from '@/types/agent'

interface SavedAgentsSectionProps {
  savedAgents: SavedAgent[]
  data: AgentData | null
  onLoadAgent: (agent: SavedAgent) => void
  onDeleteAgent: (index: number) => void
  onClearAll: () => void
}

export function SavedAgentsSection({
  savedAgents,
  data,
  onLoadAgent,
  onDeleteAgent,
  onClearAll,
}: SavedAgentsSectionProps) {
  if (savedAgents.length === 0) return null

  return (
    <section
      className="rounded-2xl border border-slate-200/90 bg-slate-100/60 p-5 shadow-inner sm:p-6 lg:p-8"
      aria-labelledby="saved-heading"
    >
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Archive className="size-5 shrink-0 text-teal-700" aria-hidden />
          <h2
            id="saved-heading"
            className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            Saved agents
          </h2>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/80">
            {savedAgents.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirm('Clear all saved agents? This cannot be undone.')) {
              onClearAll()
            }
          }}
          className="btn-danger w-full sm:w-auto"
        >
          <Trash2 className="size-4" aria-hidden />
          Clear all
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {savedAgents.map((agent, index) => (
          <li
            key={`${agent.name}-${index}`}
            className="flex flex-col rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/5 transition-shadow hover:shadow-md"
          >
            <h3 className="mb-3 border-b border-slate-100 pb-2 text-base font-semibold text-slate-900">
              {agent.name}
            </h3>
            <dl className="mb-4 flex flex-1 flex-col gap-2 text-sm text-slate-600">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Profile</dt>
                <dd className="text-right font-medium text-slate-800">
                  {data?.agentProfiles.find((p) => p.id === agent.profileId)
                    ?.name ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Skills</dt>
                <dd className="font-medium text-slate-800">
                  {agent.skillIds?.length ?? 0}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Layers</dt>
                <dd className="font-medium text-slate-800">
                  {agent.layerIds?.length ?? 0}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Provider</dt>
                <dd className="text-right font-medium text-slate-800">
                  {agent.provider || '—'}
                </dd>
              </div>
            </dl>
            <div className="mt-auto flex gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => onLoadAgent(agent)}
                className="btn-primary flex-1 py-2 text-sm"
              >
                Load
              </button>
              <button
                type="button"
                onClick={() => onDeleteAgent(index)}
                className="btn-danger shrink-0 px-4 py-2 text-sm"
                aria-label={`Delete ${agent.name}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
