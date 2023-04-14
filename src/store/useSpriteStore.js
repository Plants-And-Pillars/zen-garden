import { create } from 'zustand';

const useSpriteStore = create((set) => ({
    sprites: [{ x: 400, y: 300, id: 0 }],
    addSprite: (sprite) => set((state) => ({ sprites: [...state.sprites, sprite] })),
    // removeSprite: (sprite) => set((state) => ({ sprites: state.sprites.filter((s) => s !== sprite) })),
}))

export default useSpriteStore;