export interface JournalEntry {
	date: string;
	workout: {
		workoutType: string;
		workoutDescription: string;
		workoutDuration: string | number | undefined;
		moodAfter: string;
		energyAfter: string;
	};
	nutrition: Array<{
		id: number;
		description: string;
		calories: number | undefined;
		protein: number | undefined;
		carbs: number | undefined;
		fats: number | undefined;
	}>;
	water: number | undefined;
	weight: string | number | undefined;
	notes: string;
}