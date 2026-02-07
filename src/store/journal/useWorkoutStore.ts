import { create } from 'zustand';

interface WorkoutStore {
	workoutType: string;
	workoutDescription: string
	workoutDuration: string | number | undefined;
	moodAfter: string;
	energyAfter: string;
	saveWorkoutType: (type: string) => void;
	saveWorkoutDescription: (desc: string) => void;
	saveWorkoutDuration: (duration: string | number) => void;
	saveMood: (mood: string) => void;
	saveEnergy: (energy: string) => void;
	resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
	workoutType: 'Strength Training',
	workoutDescription: '',
	workoutDuration: undefined,
	moodAfter: '😊 Good',
	energyAfter: 'Moderate',
	saveWorkoutType: (type) => set({ workoutType: type }),
	saveWorkoutDescription: (desc) => set({ workoutDescription: desc }),
	saveWorkoutDuration: (duration) => set({ workoutDuration: duration }),
	saveMood: (mood) => set({ moodAfter: mood }),
	saveEnergy: (energy) => set({ energyAfter: energy }),
	resetWorkout: () => set({ workoutType: '', workoutDescription: '', workoutDuration: undefined, moodAfter: '', energyAfter: '' }),
}));