import { render, screen } from '@testing-library/react'
import TagList from '../TagList'
import { JournalEntry } from '@/types/journalEntryTypes'

describe('TagList Component', () => {
	const mockEntry: JournalEntry = {
		date: '2024-01-15T10:00:00.000Z',
		workout: {
			workoutType: 'Cardio',
			workoutDescription: 'Morning run',
			workoutDuration: '30',
			moodAfter: '😊 Good',
			energyAfter: 'High',
		},
		nutrition: [
			{
				id: 1,
				description: 'Breakfast',
				calories: 500,
				protein: 20,
				carbs: 60,
				fats: 15,
			},
		],
		water: 2.5,
		weight: '75',
		notes: 'Great workout!',
	}

	// Workout Tag Tests
	it('should render WorkoutTag with workout type and duration', () => {
		render(<TagList entry={mockEntry} />)
		const workoutType = screen.getByText('Cardio')
		const workoutDuration = screen.getByText('30min')
		expect(workoutType).toBeInTheDocument()
		expect(workoutDuration).toBeInTheDocument()
	})

	it('should not render WorkoutTag when workout type is empty', () => {
		const entryWithoutWorkout = {
			...mockEntry,
			workout: {
				...mockEntry.workout,
				workoutType: '',
				workoutDuration: undefined,
			},
		}
		render(<TagList entry={entryWithoutWorkout} />)
		const bullet = screen.queryByText('•')
		expect(bullet).not.toBeInTheDocument()
	})

	it('should render WorkoutTag with only duration when type is missing', () => {
		const entryWithDurationOnly = {
			...mockEntry,
			workout: {
				...mockEntry.workout,
				workoutType: '',
				workoutDuration: '45',
			},
		}
		render(<TagList entry={entryWithDurationOnly} />)
		const workoutDuration = screen.getByText('45min')
		expect(workoutDuration).toBeInTheDocument()
	})

	// Nutrition Tag Tests
	it('should render NutritionTag with meal count', () => {
		render(<TagList entry={mockEntry} />)
		const mealCount = screen.getByText('1 meals')
		expect(mealCount).toBeInTheDocument()
	})

	it('should not render NutritionTag when no meals', () => {
		const entryWithoutNutrition = {
			...mockEntry,
			nutrition: [],
		}
		render(<TagList entry={entryWithoutNutrition} />)
		const mealCount = screen.queryByText(/meals/)
		expect(mealCount).not.toBeInTheDocument()
	})

	it('should display correct plural for multiple meals', () => {
		const entryWithMultipleMeals = {
			...mockEntry,
			nutrition: [
				{ id: 1, description: 'Breakfast', calories: 500, protein: 20, carbs: 60, fats: 15 },
				{ id: 2, description: 'Lunch', calories: 700, protein: 30, carbs: 80, fats: 20 },
				{ id: 3, description: 'Dinner', calories: 600, protein: 25, carbs: 70, fats: 18 },
			],
		}
		render(<TagList entry={entryWithMultipleMeals} />)
		const mealCount = screen.getByText('3 meals')
		expect(mealCount).toBeInTheDocument()
	})

	// Water Tag Tests
	it('should render WaterTag with water intake', () => {
		render(<TagList entry={mockEntry} />)
		const waterIntake = screen.getByText('2.5 glasses')
		expect(waterIntake).toBeInTheDocument()
	})

	it('should not render WaterTag when water is undefined', () => {
		const entryWithoutWater = {
			...mockEntry,
			water: undefined,
		}
		render(<TagList entry={entryWithoutWater} />)
		const waterIntake = screen.queryByText(/glasses/)
		expect(waterIntake).not.toBeInTheDocument()
	})

	it('should not render WaterTag when water is 0', () => {
		const entryWithZeroWater = {
			...mockEntry,
			water: 0,
		}
		render(<TagList entry={entryWithZeroWater} />)
		const waterIntake = screen.queryByText(/glasses/)
		expect(waterIntake).not.toBeInTheDocument()
	})

	// Mood Tag Tests
	it('should render MoodTag with mood', () => {
		render(<TagList entry={mockEntry} />)
		const mood = screen.getByText('😊 Good')
		expect(mood).toBeInTheDocument()
	})

	it('should not render MoodTag when mood is empty', () => {
		const entryWithoutMood = {
			...mockEntry,
			workout: {
				...mockEntry.workout,
				moodAfter: '',
			},
		}
		render(<TagList entry={entryWithoutMood} />)
		const mood = screen.queryByText(/Good|😊/)
		expect(mood).not.toBeInTheDocument()
	})

	// Integration Tests
	it('should render all tags when entry has all data', () => {
		render(<TagList entry={mockEntry} />)
		expect(screen.getByText('Cardio')).toBeInTheDocument()
		expect(screen.getByText('1 meals')).toBeInTheDocument()
		expect(screen.getByText('2.5 glasses')).toBeInTheDocument()
		expect(screen.getByText('😊 Good')).toBeInTheDocument()
	})

	it('should render no tags when entry is empty', () => {
		const emptyEntry: JournalEntry = {
			date: '2024-01-15T10:00:00.000Z',
			workout: {
				workoutType: '',
				workoutDescription: '',
				workoutDuration: undefined,
				moodAfter: '',
				energyAfter: '',
			},
			nutrition: [],
			water: undefined,
			weight: undefined,
			notes: '',
		}
		const { container } = render(<TagList entry={emptyEntry} />)
		const tags = container.querySelectorAll('span')
		expect(tags).toHaveLength(0)
	})
})
