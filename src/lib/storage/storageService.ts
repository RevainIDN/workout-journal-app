import { formatDate } from '@/lib/utils/formatDate';

export interface JournalEntry {
	date: string;
	workout: {
		workoutType: string;
		workoutDescription: string;
		workoutDuration: string | number | undefined;
		moodAfter: string;
		energyAfter: string;
	};
	nutrition: Array<{
		id: number;
		description: string;
		calories: number | undefined;
		protein: number | undefined;
		carbs: number | undefined;
		fats: number | undefined;
	}>;
	water: number | undefined;
	weight: string | number | undefined;
	notes: string;
}

interface StorageData {
	entries: JournalEntry[];
}

const STORAGE_KEY = 'journal-entries';

export const storageService = {
	// Получить всю историю
	getAllEntries: (): JournalEntry[] => {
		if (typeof window === 'undefined') return [];
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			return data ? JSON.parse(data).entries : [];
		} catch (error) {
			console.error('Error loading entries:', error);
			return [];
		}
	},

	// Получить запись за конкретную дату
	getEntryByDate: (date: string): JournalEntry | null => {
		const entries = storageService.getAllEntries();
		return entries.find(entry => entry.date === date) || null;
	},

	// Сохранить новую запись (добавить или обновить)
	saveEntry: (entry: JournalEntry): void => {
		if (typeof window === 'undefined') return;
		try {
			const entries = storageService.getAllEntries();
			const existingIndex = entries.findIndex(e => e.date === entry.date);

			if (existingIndex >= 0) {
				// Обновить существующую запись
				entries[existingIndex] = entry;
			} else {
				// Добавить новую запись в начало (последняя сохраненная первой)
				entries.unshift(entry);
			}

			localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries }));
		} catch (error) {
			console.error('Error saving entry:', error);
		}
	},

	// Удалить запись по дате
	deleteEntry: (date: string): void => {
		if (typeof window === 'undefined') return;
		try {
			const entries = storageService.getAllEntries();
			const filtered = entries.filter(entry => entry.date !== date);
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ filtered }));
		} catch (error) {
			console.error('Error deleting entry:', error);
		}
	},

	// Очистить всю историю
	clearAll: (): void => {
		if (typeof window === 'undefined') return;
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch (error) {
			console.error('Error clearing storage:', error);
		}
	}
};
