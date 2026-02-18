import tagStyles from './TagList.module.css'
import { JournalEntry } from '@/types/journalEntryTypes'

function WorkoutTag({ entry }: { entry: JournalEntry }) {
	const durationRaw = entry.workout.workoutDuration
	const durationNum = Number(durationRaw)
	const hasDuration = !isNaN(durationNum) && durationNum > 0

	if (!entry.workout.workoutType && !hasDuration) return null

	return (
		<span
			className={tagStyles.tag}
			style={{ backgroundColor: 'rgba(var(--pastel-aqua-rgb), 0.2)', color: 'rgb(var(--pastel-aqua-rgb))' }}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6"></path><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"></path><path d="m21.5 21.5-1.4-1.4"></path><path d="M3.9 3.9 2.5 2.5"></path><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"></path></svg>
			<div className={tagStyles.tagContent}>
				{entry.workout.workoutType && <h3>{entry.workout.workoutType}</h3>}
				{hasDuration && <h3>•</h3>}
				{hasDuration && <h3>{durationNum}min</h3>}
			</div>
		</span>
	)
}

function NutritionTag({ entry }: { entry: JournalEntry }) {
	return (
		(entry.nutrition.length > 0) && (
			<span
				className={tagStyles.tag}
				style={{ backgroundColor: 'rgba(var(--pastel-peach-rgb), 0.2)', color: 'rgb(var(--pastel-peach-rgb))' }}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
				<div className={tagStyles.tagContent}>
					<h3>{entry.nutrition.length} meals</h3>
				</div>
			</span>
		)
	)
}

function WaterTag({ entry }: { entry: JournalEntry }) {
	if (entry.water === undefined) return null;

	return (
		(entry.water > 0) && (
			<span
				className={tagStyles.tag}
				style={{ backgroundColor: 'rgba(var(--pastel-aqua-rgb), 0.2)', color: 'rgb(var(--pastel-aqua-rgb))' }}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>
				<div className={tagStyles.tagContent}>
					<h3>{entry.water} Liters</h3>
				</div>
			</span>
		)
	)
}

function MoodTag({ entry }: { entry: JournalEntry }) {
	return (
		(entry.workout.moodAfter) && (
			<span
				className={tagStyles.tag}
				style={{ backgroundColor: 'rgba(var(--pastel-lavender-rgb), 0.2)', color: 'rgb(var(--pastel-lavender-rgb))' }}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
				<div className={tagStyles.tagContent}>
					<h3>{entry.workout.moodAfter}</h3>
				</div>
			</span>
		)
	)
}

export default function TagList({ entry }: { entry: JournalEntry }) {
	return (
		<>
			<WorkoutTag entry={entry} />
			<NutritionTag entry={entry} />
			<WaterTag entry={entry} />
			<MoodTag entry={entry} />
		</>
	)
}