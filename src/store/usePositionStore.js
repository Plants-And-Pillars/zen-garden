import { create } from 'zustand'

const usePositionStore = create((set) => ({
    position: [0, 0],
    setPosition: (x, y) => set({ position: [x, y] }),
}))

export default usePositionStore