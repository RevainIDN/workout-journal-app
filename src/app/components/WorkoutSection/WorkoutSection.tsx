'use client'

import workoutStyles from './WorkoutSection.module.css';
import { useWorkoutStore } from '@/store/journal/useWorkoutStore';

import WorkoutIcon from '@/components/icons/WorkoutIcon';
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
					<WorkoutIcon />
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