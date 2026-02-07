"use client"

import { useCallback } from "react"
import { useUIStore } from "@/store/uiStore"

import { storageService } from "@/lib/storage/storageService"
import { useWorkoutStore } from "@/store/journal/useWorkoutStore"
import { useNutritionStore } from "@/store/journal/useNutritionStore"
import { useBodyStore } from "@/store/journal/useBodyStore"
import { useNotesStore } from "@/store/journal/useNotesStore"

export function useSaveEntry() {
	const { showNotification } = useUIStore()

	const saveEntry = useCallback(() => {
		showNotification(true, 'Entry saved successfully!')

		const workoutData = useWorkoutStore.getState()
		const nutritionData = useNutritionStore.getState()
		const bodyData = useBodyStore.getState()
		const notesData = useNotesStore.getState()

		const today = new Date().toISOString()
		const entry = {
			date: today,
			workout: {
				workoutType: workoutData.workoutType || 'Strength Training',
				workoutDescription: workoutData.workoutDescription || '',
				workoutDuration: (workoutData.workoutDuration === undefined || workoutData.workoutDuration === '') ? undefined : workoutData.workoutDuration,
				moodAfter: workoutData.moodAfter || '😊 Good',
				energyAfter: workoutData.energyAfter || 'Moderate',
			},
			nutrition: nutritionData.meals,
			water: bodyData.litersOfWater,
			weight: bodyData.weight,
			notes: notesData.notes,
		}

		storageService.saveEntry(entry)

		workoutData.resetWorkout()
		nutritionData.resetMeals()
		bodyData.resetWater()
		bodyData.resetWeight()
		notesData.resetNotes()

		setTimeout(() => {
			showNotification(false, '')
		}, 5000)
	}, [showNotification])

	return saveEntry
}

export default useSaveEntry