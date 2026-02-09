import { renderHook, act } from '@testing-library/react'
import { useHistoryEntries } from '../useHistoryEntries'
import { storageService } from '@/lib/storage/storageService'
import { JournalEntry } from '@/types/journalEntryTypes'

// Mock the storage service
jest.mock('@/lib/storage/storageService')

describe('useHistoryEntries hook', () => {
	const mockEntries: JournalEntry[] = [
		{
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
		},
		{
			date: '2024-01-14T10:00:00.000Z',
			workout: {
				workoutType: 'Strength',
				workoutDescription: 'Upper body',
				workoutDuration: '45',
				moodAfter: '😊 Good',
				energyAfter: 'Moderate',
			},
			nutrition: [],
			water: 2,
			weight: '74.5',
			notes: 'Good session',
		},
	]

	beforeEach(() => {
		jest.clearAllMocks()
			; (storageService.getAllEntries as jest.Mock).mockReturnValue(mockEntries)
			; (storageService.deleteEntry as jest.Mock).mockImplementation(() => { })
	})

	it('should return correct shape with entries, refresh, and deleteEntry', () => {
		const { result } = renderHook(() => useHistoryEntries())

		expect(result.current).toHaveProperty('entries')
		expect(result.current).toHaveProperty('refresh')
		expect(result.current).toHaveProperty('deleteEntry')
	})

	it('should load entries on mount', () => {
		const { result } = renderHook(() => useHistoryEntries())

		expect(storageService.getAllEntries).toHaveBeenCalled()
		expect(result.current.entries).toEqual(mockEntries)
	})

	it('should have entries as an array', () => {
		const { result } = renderHook(() => useHistoryEntries())

		expect(Array.isArray(result.current.entries)).toBe(true)
	})

	it('should return empty array when no entries exist', () => {
		; (storageService.getAllEntries as jest.Mock).mockReturnValue([])

		const { result } = renderHook(() => useHistoryEntries())

		expect(result.current.entries).toEqual([])
	})

	it('should have refresh function that updates entries', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const newEntries = mockEntries.slice(0, 1)
			; (storageService.getAllEntries as jest.Mock).mockReturnValue(newEntries)

		act(() => {
			result.current.refresh()
		})

		expect(result.current.entries).toEqual(newEntries)
	})

	it('should call storageService.getAllEntries when refresh is called', () => {
		const { result } = renderHook(() => useHistoryEntries())

		act(() => {
			result.current.refresh()
		})

		expect(storageService.getAllEntries).toHaveBeenCalledTimes(2)
	})

	it('should delete entry by date', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const dateToDelete = '2024-01-15T10:00:00.000Z'

		act(() => {
			result.current.deleteEntry(dateToDelete)
		})

		expect(storageService.deleteEntry).toHaveBeenCalledWith(dateToDelete)
	})

	it('should remove deleted entry from entries state', () => {
		const { result } = renderHook(() => useHistoryEntries())

		expect(result.current.entries).toHaveLength(2)

		const dateToDelete = '2024-01-15T10:00:00.000Z'

		act(() => {
			result.current.deleteEntry(dateToDelete)
		})

		expect(result.current.entries).toHaveLength(1)
		expect(result.current.entries[0].date).toBe('2024-01-14T10:00:00.000Z')
	})

	it('should not affect other entries when deleting one', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const dateToDelete = '2024-01-15T10:00:00.000Z'

		act(() => {
			result.current.deleteEntry(dateToDelete)
		})

		const remainingEntry = result.current.entries[0]
		expect(remainingEntry).toEqual(mockEntries[1])
	})

	it('should handle deleting non-existent entry gracefully', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const nonExistentDate = '2024-01-13T10:00:00.000Z'

		act(() => {
			result.current.deleteEntry(nonExistentDate)
		})

		expect(storageService.deleteEntry).toHaveBeenCalledWith(nonExistentDate)
		expect(result.current.entries).toEqual(mockEntries)
	})

	it('should maintain entry data integrity after refresh', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const firstEntry = result.current.entries[0]

		act(() => {
			result.current.refresh()
		})

		expect(result.current.entries[0]).toEqual(firstEntry)
	})

	it('should handle multiple deletes in sequence', () => {
		const { result } = renderHook(() => useHistoryEntries())

		expect(result.current.entries).toHaveLength(2)

		act(() => {
			result.current.deleteEntry('2024-01-15T10:00:00.000Z')
		})

		expect(result.current.entries).toHaveLength(1)

		act(() => {
			result.current.deleteEntry('2024-01-14T10:00:00.000Z')
		})

		expect(result.current.entries).toHaveLength(0)
	})

	it('should update entries when storage service returns different data', () => {
		const { result } = renderHook(() => useHistoryEntries())

		expect(result.current.entries).toHaveLength(2)

		const newEntries = mockEntries.slice(0, 1)
			; (storageService.getAllEntries as jest.Mock).mockReturnValue(newEntries)

		act(() => {
			result.current.refresh()
		})

		expect(result.current.entries).toHaveLength(1)
		expect(result.current.entries[0]).toEqual(newEntries[0])
	})

	it('should properly filter entry by date when deleting', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const entriesToDelete = ['2024-01-14T10:00:00.000Z']

		act(() => {
			entriesToDelete.forEach(date => {
				result.current.deleteEntry(date)
			})
		})

		const deletedEntry = mockEntries.find(e => e.date === '2024-01-14T10:00:00.000Z')
		const remainingEntry = result.current.entries.find(e => e.date === deletedEntry?.date)

		expect(remainingEntry).toBeUndefined()
		expect(result.current.entries[0].date).toBe('2024-01-15T10:00:00.000Z')
	})

	it('should work correctly when entries array is modified externally', () => {
		const { result } = renderHook(() => useHistoryEntries())

		const newMockEntries = [mockEntries[0]]
			; (storageService.getAllEntries as jest.Mock).mockReturnValue(newMockEntries)

		act(() => {
			result.current.refresh()
		})

		expect(result.current.entries).toEqual(newMockEntries)
	})
})
