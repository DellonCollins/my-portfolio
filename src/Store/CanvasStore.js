import { create } from  "zustand"

var defaultColor = "#aaaaaa", defaultColors = ["#ffffff", "#00ffff"]

const storeColorInSession = (colors) => { sessionStorage.setItem("colors", JSON.stringify(colors)); return {colors} }

const useCanvasStore = create((set) => ({
    drawDuration: 15,
    setDrawDuration: (value) => set(() => ({ drawDuration: parseInt(value) })),

    gridDensity: 3,
    setGridDensity: (value) => set(() => ({ gridDensity: parseInt(value) })),

    particleDensity: Math.sqrt(window.outerWidth * window.outerHeight) < 750 ? 1 : 3,
    setParticleDensity: (value) => set(() => ({ particleDensity: parseInt(value) })),

    chaos: 50,
    setChaos: (value) => set(() => ({ chaos: parseInt(value) })),

    saveSwitch: false,
    toggleSaveSwitch: () => set((state) => ({ saveSwitch: !state.saveSwitch })),

    resetSwitch: false,
    toggleResetSwitch: () => set((state) => ({ resetSwitch: !state.resetSwitch })),

    playSwitch: true,
    togglePlaySwitch: () => set((state) => ({ playSwitch : !state.playSwitch })),
    play: () => set((state) => ({ playSwitch : true })),

    colors: storeColorInSession(JSON.parse(sessionStorage.getItem("colors")) || defaultColors).colors,
    setColor:   (index, color) => set((state) => {
        let _colors = [...state.colors]
        _colors[index] = color
        return storeColorInSession(_colors)
    }),
    addColor:   (index) => set((state) => {
        let _colors = [...state.colors]
        _colors.splice(index + 1, 0, defaultColor)
        return storeColorInSession(_colors)
    }),
    removeColor:(index) => set((state) => {
        let _colors = state.colors.filter((v, i) => index !== i)
        return storeColorInSession(_colors)
    }),
    resetColors:() => set(() => (storeColorInSession(defaultColors)))

}))


export default useCanvasStore