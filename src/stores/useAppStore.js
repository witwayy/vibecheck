import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  // --- AI Model ---
  selectedModel: 'deepseek-v3',
  setSelectedModel: (model) => set({ selectedModel: model }),

  // --- Chat History (persists across steps) ---
  chatHistory: [],
  addMessage: (msg) =>
    set((s) => ({ chatHistory: [...s.chatHistory, msg] })),
  clearChat: () => set({ chatHistory: [] }),

  // --- Idea Discovery ---
  ideaData: {
    method: 'pain-log', // pain-log | scamper | hmw | trend
    conversations: [],
    summary: '',
  },
  setIdeaData: (data) =>
    set((s) => ({ ideaData: { ...s.ideaData, ...data } })),

  // --- PRD Writer (5W1H x 4 items = 24 fields) ---
  prdData: {
    why: { background: '', problem: '', goal: '', kpi: '' },
    who: { targetUser: '', stakeholder: '', persona: '', userJourney: '' },
    what: { coreFeature: '', scope: '', priority: '', mvp: '' },
    when: { timeline: '', milestone: '', sprint: '', deadline: '' },
    where: { platform: '', infrastructure: '', deployment: '', environment: '' },
    how: { techStack: '', architecture: '', api: '', testing: '' },
  },
  setPrdField: (chapter, field, value) =>
    set((s) => ({
      prdData: {
        ...s.prdData,
        [chapter]: { ...s.prdData[chapter], [field]: value },
      },
    })),
  setPrdChapter: (chapter, data) =>
    set((s) => ({
      prdData: { ...s.prdData, [chapter]: { ...s.prdData[chapter], ...data } },
    })),
  bulkSetPrd: (data) =>
    set((s) => ({ prdData: { ...s.prdData, ...data } })),

  // --- Zone Map ---
  zones: [],
  setZones: (zones) => set({ zones }),
  updateZone: (id, data) =>
    set((s) => ({
      zones: s.zones.map((z) => (z.id === id ? { ...z, ...data } : z)),
    })),
}))
