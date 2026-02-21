import historyStyles from './FullHistoryDescription.module.css'
import { JournalEntry } from '@/types/journalEntryTypes'

import WorkoutIcon from '@/components/icons/WorkoutIcon';
import MealIcon from '@/components/icons/MealIcon';
import InfoCard from '@/components/ui/InfoCard/InfoCard';

export default function FullHistoryDescription({ entry }: { entry: JournalEntry }) {
	const totalCalories = entry.nutrition.reduce((total, meal) => total + (meal?.calories || 0), 0);
	const totalProtein = entry.nutrition.reduce((total, meal) => total + (meal?.protein || 0), 0);
	const totalCarbs = entry.nutrition.reduce((total, meal) => total + (meal?.carbs || 0), 0);
	const totalFats = entry.nutrition.reduce((total, meal) => total + (meal?.fats || 0), 0);

	return (
		<div className={historyStyles.fullHistoryContent} onClick={(e) => e.stopPropagation()}>
			{entry.workout.workoutDescription && (
				<div className={historyStyles.workoutSection}>
					<div className={`${historyStyles.title} ${historyStyles.workoutTitle}`}>
						<WorkoutIcon width={16} height={16} />
						<h2>Workout</h2>
					</div>
					<p className={historyStyles.description}>{entry.workout.workoutDescription}</p>
				</div>
			)}
			{entry.nutrition.length > 0 && (
				<div className={historyStyles.nutritionSection}>
					<div className={`${historyStyles.title} ${historyStyles.nutritionTitle}`}>
						<MealIcon width={16} height={16} />
						<h2>Meals</h2>
					</div>
					{entry.nutrition.map((meal, index) => (
						<div className={historyStyles.meal} key={index}>
							<h2>{meal.description}</h2>
							<ul className={historyStyles.mealDetails}>
								<li className={historyStyles.mealDetail}><p>Cal: {meal.calories}</p></li>
								<li className={historyStyles.mealDetail}><p>P: {meal.protein}g</p></li>
								<li className={historyStyles.mealDetail}><p>C: {meal.carbs}g</p></li>
								<li className={historyStyles.mealDetail}><p>F: {meal.fats}g</p></li>
							</ul>
						</div>
					))}
					<h2 className={historyStyles.dailyTotal}>Daily Total: {totalCalories} cal • {totalProtein}g protein • {totalCarbs}g carbs • {totalFats}g fats</h2>
				</div>
			)}
			<div className={historyStyles.otherInfoSection}>
				{(entry.water !== undefined && entry.water > 0) && <InfoCard type="Water" title='Water' value={`${entry.water} Liters`} />}
				{entry.weight !== undefined && <InfoCard type="Weight" title='Weight' value={`${entry.weight} kg`} />}
				{entry.workout.moodAfter && <InfoCard type="Mood" title='Mood' value={entry.workout.moodAfter} />}
				{entry.workout.energyAfter && <InfoCard type="Energy" title='Energy' value={entry.workout.energyAfter} />}
			</div>
			{entry.notes && (
				<div className={historyStyles.notesSection}>
					<h2>Notes & Reflections</h2>
					<p>{entry.notes}</p>
				</div>
			)}
		</div>
	)
}