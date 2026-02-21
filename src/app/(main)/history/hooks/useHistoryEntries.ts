import { useCallback, useEffect, useState } from 'react'
import { JournalEntry } from '@/types/journalEntryTypes'
import { storageService } from '@/lib/storage/storageService'

interface UseHistoryEntriesResult {
	entries: JournalEntry[]
	refresh: () => void
	deleteEntry: (date: string) => void
}

export function useHistoryEntries(): UseHistoryEntriesResult {
	const [entries, setEntries] = useState<JournalEntry[]>([])

	const refresh = useCallback(() => {
		setEntries(storageService.getAllEntries())
	}, [])

	const deleteEntry = useCallback((date: string) => {
		storageService.deleteEntry(date)
		setEntries(prev => prev.filter(e => e.date !== date))
	}, [])

	useEffect(() => {
		refresh()
	}, [refresh])

	return { entries, refresh, deleteEntry }
}

export default useHistoryEntries
