import {create} from  "zustand"

const useCanvasStore = create((set) => ({
    drawDuration: 10,
    setDrawDuration: (value) => set(() => ({ drawDuration: parseInt(value) })),

    gridDensity: 3,
    setGridDensity: (value) => set(() => ({ gridDensity: parseInt(value) })),

    particleDensity: 3,
    setParticleDensity: (value) => set(() => ({ particleDensity: parseInt(value) })),

    saveSwitch: false,
    toggleSaveSwitch: () => set((state) => ({ saveSwitch: !state.saveSwitch})),

    resetSwitch: false,
    toggleResetSwitch: () => set((state) => ({ resetSwitch: !state.resetSwitch})),
}))

export default useCanvasStore