'use client'

import workoutStyles from './WorkoutSection.module.css';
import { useWorkoutStore } from '@/store/journal/useWorkoutStore';

import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Textarea/Textarea';
import Dropdown from '@/components/ui/Dropdown/Dropdown';

const dropdownList = ['Strength Training', 'Cardio', 'Yoga', 'HIIT', 'Sports', 'Rest Day']

export default function WorkoutSection() {
	const workoutType = useWorkoutStore(state => state.workoutType) || dropdownList[0];
	const workoutDescription = useWorkoutStore(state => state.workoutDescription);
	const workoutDuration = useWorkoutStore(state => state.workoutDuration);
	const { saveWorkoutType, saveWorkoutDescription, saveWorkoutDuration } = useWorkoutStore();

	return (
		<section className={workoutStyles.workoutSection}>
			<div className={workoutStyles.titleBar}>
				<div className={workoutStyles.titleSvg}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6"></path><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"></path><path d="m21.5 21.5-1.4-1.4"></path><path d="M3.9 3.9 2.5 2.5"></path><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"></path></svg>
				</div>
				<h1>Today's Workout</h1>
			</div>
			<div className={workoutStyles.workoutContent}>
				<Dropdown
					label='Workout Type'
					dropdownList={dropdownList}
					selectedValue={workoutType}
					onClick={saveWorkoutType}
				/>
				<Textarea
					label='Workout Description'
					placeholder='e.g., Upper body - Bench press 3x10, Rows 3x12...'
					value={workoutDescription}
					onChange={saveWorkoutDescription}
				/>
				<Input
					type="number"
					label='Duration (minutes)'
					placeholder="0"
					value={workoutDuration}
					onChange={saveWorkoutDuration}
				/>
			</div>
		</section>
	)
}