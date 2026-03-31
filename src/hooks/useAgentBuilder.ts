import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react'
import { toast } from 'sonner'

import type { AgentData, SavedAgent } from '@/types/agent'

const STORAGE_KEY = 'savedAgents'

export function useAgentBuilder() {
  const [data, setData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])

  const [agentName, setAgentName] = useState('')
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])
  const [selectedProvider, setSelectedProvider] = useState('')

  const [sessionTime, setSessionTime] = useState(0)

  const fetchAPI = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay))

      const response = await fetch('/data.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const jsonData: AgentData = await response.json()
      setData(jsonData)
    } catch (err: unknown) {
      console.error('Error fetching data:', err)
      const message =
        err instanceof Error ? err.message : 'Failed to fetch agent data'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved) as SavedAgent[])
      } catch (e) {
        console.error('Failed to parse saved agents', e)
      }
    }
  }, [])

  useEffect(() => {
    const analyticsInterval = setInterval(() => {
      if (agentName !== '') {
        console.log(
          `[Analytics Heartbeat] User is working on agent named: "${agentName}"`,
        )
      } else {
        console.log(
          '[Analytics Heartbeat] User is working on an unnamed agent draft...',
        )
      }
    }, 8000)

    return () => clearInterval(analyticsInterval)
  }, [agentName])

  useEffect(() => {
    fetchAPI()
  }, [fetchAPI])

  const handleLayerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const layerId = e.target.value
    if (layerId && !selectedLayers.includes(layerId)) {
      setSelectedLayers([...selectedLayers, layerId])
    }
    e.target.value = ''
  }

  const handleSkillSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const skillId = e.target.value
    if (skillId && !selectedSkills.includes(skillId)) {
      setSelectedSkills([...selectedSkills, skillId])
    }
    e.target.value = ''
  }

  const handleDeleteAgent = (indexToRemove: number) => {
    const updatedAgents = savedAgents.filter(
      (_, index) => index !== indexToRemove,
    )
    setSavedAgents(updatedAgents)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAgents))
  }

  const handleSaveAgent = () => {
    if (!agentName.trim()) {
      toast.error('Please enter a name for your agent.')
      return
    }

    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    const updatedAgents = [...savedAgents, newAgent]
    setSavedAgents(updatedAgents)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAgents))
    setAgentName('')
    toast.success(`Agent "${newAgent.name}" saved successfully.`)
  }

  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills(agent.skillIds || [])
    setSelectedLayers([...(agent.layerIds || [])])
    setAgentName(agent.name)
    setSelectedProvider(agent.provider || '')
  }

  const clearAllSavedAgents = () => {
    setSavedAgents([])
    localStorage.removeItem(STORAGE_KEY)
    toast.success('All saved agents were cleared.')
  }

  const removeSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter((id) => id !== skillId))
  }

  const removeLayer = (layerId: string) => {
    setSelectedLayers(selectedLayers.filter((id) => id !== layerId))
  }

  return {
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
  }
}
