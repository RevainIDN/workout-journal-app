import { create } from 'zustand';

interface NutritionTypes {
	id: number;
	description: string;
	calories: number | undefined;
	protein: number | undefined;
	carbs: number | undefined;
	fats: number | undefined;
}

interface NutritionStore {
	meals: NutritionTypes[];
	saveMeals: (meals: NutritionTypes[]) => void;
	addMeal: () => void;
	deleteMeal: (id: number) => void;
	updateMeal: (id: number, field: keyof NutritionTypes, value: string | number) => void;
	resetMeals: () => void;
}

export const useNutritionStore = create<NutritionStore>((set, get) => ({
	meals: [],
	saveMeals: (meals: NutritionTypes[]) => set({ meals }),
	addMeal: () => {
		const meals = get().meals;
		const newId = meals.length > 0 ? Math.max(...meals.map(m => m.id)) + 1 : 1;
		set({ meals: [...meals, { id: newId, description: '', calories: undefined, protein: undefined, carbs: undefined, fats: undefined }] });
	},
	deleteMeal: (id: number) => {
		const filtered = get().meals.filter(meal => meal.id !== id);
		const renumbered = filtered.map((meal, index) => ({ ...meal, id: index + 1 }));
		set({ meals: renumbered });
	},
	updateMeal: (id: number, field: keyof NutritionTypes, value: string | number) => {
		set({
			meals: get().meals.map(meal =>
				meal.id === id ? ({ ...meal, [field]: value as any }) : meal
			),
		});
	},
	resetMeals: () => set({ meals: [] }),
}));