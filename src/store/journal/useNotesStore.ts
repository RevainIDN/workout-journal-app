import { create } from 'zustand';

interface NotesStore {
	notes: string;
	saveNotes: (notes: string) => void;
	resetNotes: () => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
	notes: '',
	saveNotes: (notes: string) => set({ notes: notes }),
	resetNotes: () => set({ notes: '' })
}))