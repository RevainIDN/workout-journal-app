'use client'

import notesStyles from './NotesSection.module.css'
import { useNotesStore } from '@/store/journal/useNotesStore'

import Textarea from '@/components/ui/Textarea/Textarea'

export default function NotesSection() {
	const notes = useNotesStore(state => state.notes);
	const { saveNotes } = useNotesStore();

	return (
		<section className={notesStyles.notesSection}>
			<div className={notesStyles.titleBar}>
				<div className={notesStyles.titleSvg}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"></path><path d="M15 3v4a2 2 0 0 0 2 2h4"></path></svg>
				</div>
				<h1>Daily Notes & Reflections</h1>
			</div>
			<div className={notesStyles.notesContent}>
				<Textarea
					placeholder='How are you feeling today? Any insights, challenges, or wins to note?'
					value={notes}
					onChange={saveNotes}
				/>
			</div>
		</section>
	)
}