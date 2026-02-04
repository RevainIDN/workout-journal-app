"use client"

import nutritionStyles from './NutritionSection.module.css'
import { useNutritionStore } from '@/store/journal/useNutritionStore'

import Input from '@/components/ui/Input/Input'

export default function NutritionSection() {
	const meals = useNutritionStore(state => state.meals);
	const { addMeal, deleteMeal, updateMeal } = useNutritionStore();

	return (
		<section className={nutritionStyles.nutritionSection}>
			<div className={nutritionStyles.nutritionHeader}>
				<div className={nutritionStyles.titleBar}>
					<div className={nutritionStyles.titleSvg}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
					</div>
					<h1>Meals & Nutrition</h1>
				</div>
				<button className={nutritionStyles.addButton}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
					<h2 onClick={addMeal}>Add Meal</h2>
				</button>
			</div>
			<div className={nutritionStyles.nutritionMeals}>
				{meals.map((meal) => (
					<div key={meal.id} className={nutritionStyles.mealSection}>
						<div className={nutritionStyles.mealHeader}>
							<h2 className={nutritionStyles.mealTitle}>Meal {meal.id}</h2>
							<button className={nutritionStyles.mealDelete} onClick={() => deleteMeal(meal.id)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF00004D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
							</button>
						</div>
						<Input
							placeholder='Meal name (e.g. Breakfast - Oatmeal with berries)'
							value={meal.description}
							onChange={value => updateMeal(meal.id, 'description', String(value))}
						/>
						<div className={nutritionStyles.NutritionList}>
							<Input
								type='number'
								label='Calories'
								placeholder='500'
								value={meal.calories}
								onChange={value => updateMeal(meal.id, 'calories', Number(value))}
							/>
							<Input
								type='number'
								label='Protein (g)'
								placeholder='100'
								value={meal.protein}
								onChange={value => updateMeal(meal.id, 'protein', Number(value))}
							/>
							<Input
								type='number'
								label='Carbs (g)'
								placeholder='200'
								value={meal.carbs}
								onChange={value => updateMeal(meal.id, 'carbs', Number(value))}
							/>
							<Input
								type='number'
								label='Fats (g)'
								placeholder='40'
								value={meal.fats}
								onChange={value => updateMeal(meal.id, 'fats', Number(value))}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}