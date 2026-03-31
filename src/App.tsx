
import { AgentBuilderHeader } from '@/components/agent-builder/AgentBuilderHeader'
import { ConfigurationOptions } from '@/components/agent-builder/ConfigurationOptions'
import { ConfigurationPreview } from '@/components/agent-builder/ConfigurationPreview'
import { SavedAgentsSection } from '@/components/agent-builder/SavedAgentsSection'
import { useAgentBuilder } from '@/hooks/useAgentBuilder'

function App() {
  const {
    data,
    loading,
    error,
    selectedProfile,
    setSelectedProfile,
    selectedSkills,
    selectedLayers,
    agentName,
    setAgentName,
    savedAgents,
    selectedProvider,
    setSelectedProvider,
    sessionTime,
    fetchAPI,
    handleLayerSelect,
    handleSkillSelect,
    handleDeleteAgent,
    handleSaveAgent,
    handleLoadAgent,
    clearAllSavedAgents,
    removeSkill,
    removeLayer,
  } = useAgentBuilder()

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100/80">
      <div className="mx-auto flex min-h-dvh max-w-7xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <AgentBuilderHeader
          loading={loading}
          sessionTime={sessionTime}
          onReload={fetchAPI}
        />

        <main className="flex flex-1 flex-col gap-8 lg:gap-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
            <ConfigurationOptions
              data={data}
              loading={loading}
              error={error}
              selectedProfile={selectedProfile}
              selectedProvider={selectedProvider}
              onProfileChange={setSelectedProfile}
              onProviderChange={setSelectedProvider}
              onSkillSelect={handleSkillSelect}
              onLayerSelect={handleLayerSelect}
              onRefetch={fetchAPI}
            />
            <ConfigurationPreview
              data={data}
              selectedProfile={selectedProfile}
              selectedSkills={selectedSkills}
              selectedLayers={selectedLayers}
              selectedProvider={selectedProvider}
              agentName={agentName}
              onAgentNameChange={setAgentName}
              onSaveAgent={handleSaveAgent}
              onRemoveSkill={removeSkill}
              onRemoveLayer={removeLayer}
            />
          </div>

          <SavedAgentsSection
            savedAgents={savedAgents}
            data={data}
            onLoadAgent={handleLoadAgent}
            onDeleteAgent={handleDeleteAgent}
            onClearAll={clearAllSavedAgents}
          />
        </main>
      </div>
    </div>
  )
}

export default App
