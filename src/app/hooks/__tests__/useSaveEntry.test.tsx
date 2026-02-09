import { renderHook, act } from '@testing-library/react'
import useSaveEntry from '../useSaveEntry'
import { useUIStore } from '@/store/uiStore'
import { useWorkoutStore } from '@/store/journal/useWorkoutStore'
import { useNutritionStore } from '@/store/journal/useNutritionStore'
import { useBodyStore } from '@/store/journal/useBodyStore'
import { useNotesStore } from '@/store/journal/useNotesStore'
import { storageService } from '@/lib/storage/storageService'

// Mock the storage service
jest.mock('@/lib/storage/storageService')

// Mock UI Store
jest.mock('@/store/uiStore', () => ({
	useUIStore: jest.fn(),
}))

// Mock Zustand stores with proper factory functions
jest.mock('@/store/journal/useWorkoutStore', () => ({
	useWorkoutStore: {
		getState: jest.fn(),
	},
}))

jest.mock('@/store/journal/useNutritionStore', () => ({
	useNutritionStore: {
		getState: jest.fn(),
	},
}))

jest.mock('@/store/journal/useBodyStore', () => ({
	useBodyStore: {
		getState: jest.fn(),
	},
}))

jest.mock('@/store/journal/useNotesStore', () => ({
	useNotesStore: {
		getState: jest.fn(),
	},
}))

describe('useSaveEntry hook', () => {
	let mockShowNotification: jest.Mock
	let mockResetWorkout: jest.Mock
	let mockResetMeals: jest.Mock
	let mockResetWater: jest.Mock
	let mockResetWeight: jest.Mock
	let mockResetNotes: jest.Mock

	beforeEach(() => {
		jest.clearAllMocks()
		jest.useFakeTimers()

		// Mock showNotification
		mockShowNotification = jest.fn()
			; (useUIStore as unknown as jest.Mock).mockReturnValue({
				showNotification: mockShowNotification,
			})

		// Mock reset functions
		mockResetWorkout = jest.fn()
		mockResetMeals = jest.fn()
		mockResetWater = jest.fn()
		mockResetWeight = jest.fn()
		mockResetNotes = jest.fn()

			// Mock stores using getState
			; (useWorkoutStore.getState as jest.Mock).mockReturnValue({
				workoutType: 'Cardio',
				workoutDescription: 'Morning run',
				workoutDuration: '30',
				moodAfter: '😊 Good',
				energyAfter: 'High',
				resetWorkout: mockResetWorkout,
			})

			; (useNutritionStore.getState as jest.Mock).mockReturnValue({
				meals: [
					{
						id: 1,
						description: 'Breakfast',
						calories: 500,
						protein: 20,
						carbs: 60,
						fats: 15,
					},
				],
				resetMeals: mockResetMeals,
			})

			; (useBodyStore.getState as jest.Mock).mockReturnValue({
				litersOfWater: 2.5,
				weight: '75',
				resetWater: mockResetWater,
				resetWeight: mockResetWeight,
			})

			; (useNotesStore.getState as jest.Mock).mockReturnValue({
				notes: 'Had a great workout today!',
				resetNotes: mockResetNotes,
			})

			// Mock storage service
			; (storageService.saveEntry as jest.Mock).mockImplementation(() => { })
	})

	afterEach(() => {
		jest.useRealTimers()
	})

	it('should return a function', () => {
		const { result } = renderHook(() => useSaveEntry())
		expect(typeof result.current).toBe('function')
	})

	it('should show notification when saveEntry is called', () => {
		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		expect(mockShowNotification).toHaveBeenCalledWith(true, 'Entry saved successfully!')
	})

	it('should save entry with correct structure', () => {
		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		expect(storageService.saveEntry).toHaveBeenCalled()
		const savedEntry = (storageService.saveEntry as jest.Mock).mock.calls[0][0]

		expect(savedEntry).toHaveProperty('date')
		expect(savedEntry).toHaveProperty('workout')
		expect(savedEntry).toHaveProperty('nutrition')
		expect(savedEntry).toHaveProperty('water')
		expect(savedEntry).toHaveProperty('weight')
		expect(savedEntry).toHaveProperty('notes')
	})

	it('should include correct workout data', () => {
		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		const savedEntry = (storageService.saveEntry as jest.Mock).mock.calls[0][0]

		expect(savedEntry.workout).toEqual({
			workoutType: 'Cardio',
			workoutDescription: 'Morning run',
			workoutDuration: '30',
			moodAfter: '😊 Good',
			energyAfter: 'High',
		})
	})

	it('should include nutrition, water, weight and notes data', () => {
		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		const savedEntry = (storageService.saveEntry as jest.Mock).mock.calls[0][0]

		expect(savedEntry.nutrition).toEqual([
			{
				id: 1,
				description: 'Breakfast',
				calories: 500,
				protein: 20,
				carbs: 60,
				fats: 15,
			},
		])
		expect(savedEntry.water).toBe(2.5)
		expect(savedEntry.weight).toBe('75')
		expect(savedEntry.notes).toBe('Had a great workout today!')
	})

	it('should reset all stores after saving', () => {
		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		expect(mockResetWorkout).toHaveBeenCalled()
		expect(mockResetMeals).toHaveBeenCalled()
		expect(mockResetWater).toHaveBeenCalled()
		expect(mockResetWeight).toHaveBeenCalled()
		expect(mockResetNotes).toHaveBeenCalled()
	})

	it('should hide notification after 5 seconds', () => {
		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		act(() => {
			jest.advanceTimersByTime(5000)
		})

		expect(mockShowNotification).toHaveBeenCalledWith(false, '')
	})

	it('should use default values when stores return empty data', () => {
		; (useWorkoutStore.getState as jest.Mock).mockReturnValue({
			workoutType: undefined,
			workoutDescription: undefined,
			workoutDuration: undefined,
			moodAfter: undefined,
			energyAfter: undefined,
			resetWorkout: mockResetWorkout,
		})

		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		const savedEntry = (storageService.saveEntry as jest.Mock).mock.calls[0][0]

		expect(savedEntry.workout).toEqual({
			workoutType: 'Strength Training',
			workoutDescription: '',
			workoutDuration: undefined,
			moodAfter: '😊 Good',
			energyAfter: 'Moderate',
		})
	})

	it('should handle undefined workoutDuration properly', () => {
		; (useWorkoutStore.getState as jest.Mock).mockReturnValue({
			workoutType: 'Running',
			workoutDescription: 'Test',
			workoutDuration: undefined,
			moodAfter: '😊 Good',
			energyAfter: 'High',
			resetWorkout: mockResetWorkout,
		})

		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		const savedEntry = (storageService.saveEntry as jest.Mock).mock.calls[0][0]
		expect(savedEntry.workout.workoutDuration).toBeUndefined()
	})

	it('should handle empty string workoutDuration as undefined', () => {
		; (useWorkoutStore.getState as jest.Mock).mockReturnValue({
			workoutType: 'Running',
			workoutDescription: 'Test',
			workoutDuration: '',
			moodAfter: '😊 Good',
			energyAfter: 'High',
			resetWorkout: mockResetWorkout,
		})

		const { result } = renderHook(() => useSaveEntry())

		act(() => {
			result.current()
		})

		const savedEntry = (storageService.saveEntry as jest.Mock).mock.calls[0][0]
		expect(savedEntry.workout.workoutDuration).toBeUndefined()
	})
})