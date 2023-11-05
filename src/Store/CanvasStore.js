import {create} from  "zustand"

const useCanvasStore = create((set) => ({
    drawDuration: 10,
    setDrawDuration: (value) => set(() => ({ drawDuration: parseInt(value) })),

    gridDensity: 1,
    setGridDensity: (value) => set(() => ({ gridDensity: parseInt(value) })),
}))

export default useCanvasStore