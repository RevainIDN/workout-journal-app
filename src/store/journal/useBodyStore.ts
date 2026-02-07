import { create } from 'zustand';

interface BodyStore {
	litersOfWater: number;
	weight: number | string | undefined;
	saveWater: (water: number | undefined) => void;
	saveWeight: (weight: number | string | undefined) => void;
	increaseWater: () => void;
	decreaseWater: () => void;
	resetWater: () => void;
	resetWeight: () => void;
}

export const useBodyStore = create<BodyStore>((set) => ({
	litersOfWater: 0,
	weight: undefined,
	saveWater: (water: number | undefined) => set({ litersOfWater: water }),
	saveWeight: (weight: number | string | undefined) => set({ weight: weight }),
	increaseWater: () => set(state => ({ litersOfWater: (state.litersOfWater ?? 0) + 1 })),
	decreaseWater: () => set(state => ({
		litersOfWater: Math.max(0, (state.litersOfWater ?? 0) - 1)
	})),
	resetWater: () => set({ litersOfWater: 0 }),
	resetWeight: () => set({ weight: undefined }),
}));