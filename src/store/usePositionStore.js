import { create } from 'zustand'

const usePositionStore = create((set) => ({
    position: [-1, -1],
    setPosition: (x, y) => set({ position: [x, y] }),
}))

export default usePositionStore