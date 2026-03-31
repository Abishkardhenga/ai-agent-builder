import { Bot, Clock, RefreshCw } from 'lucide-react'

import { ModeToggle } from '@/components/ui/mode-toggle'

interface AgentBuilderHeaderProps {
  loading: boolean
  sessionTime: number
  onReload: () => void
}

export function AgentBuilderHeader({
  loading,
  sessionTime,
  onReload,
}: AgentBuilderHeaderProps) {
  return (
    <header className="mb-8 border-b border-slate-200/80 pb-8 dark:border-slate-700/80 lg:mb-10 lg:pb-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <Bot className="size-8 shrink-0 sm:size-9" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Studio
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            AI Agent Builder
          </h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            Design your custom AI personality and capability set in a few steps.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <ModeToggle />
          <button
            type="button"
            onClick={onReload}
            disabled={loading}
            className="btn-secondary w-full min-w-[200px] sm:w-auto"
          >
            <RefreshCw
              className={`size-4 shrink-0 ${loading ? 'animate-spin' : ''}`}
              aria-hidden
            />
            {loading ? 'Fetching…' : 'Reload configuration'}
          </button>
          <div className="inline-flex items-center gap-2 self-stretch rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:self-end">
            <Clock className="size-3.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
            <span>Session · {sessionTime}s</span>
          </div>
        </div>
      </div>
    </header>
  )
}
