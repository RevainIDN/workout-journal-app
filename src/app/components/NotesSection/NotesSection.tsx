'use client'

import notesStyles from './NotesSection.module.css'
import { useNotesStore } from '@/store/journal/useNotesStore'

import NotesIcon from '@/components/icons/NotesIcon'
import Textarea from '@/components/ui/Textarea/Textarea'

export default function NotesSection() {
	const notes = useNotesStore(state => state.notes);
	const { saveNotes } = useNotesStore();

	return (
		<section className={notesStyles.notesSection}>
			<div className={notesStyles.titleBar}>
				<div className={notesStyles.titleSvg}>
					<NotesIcon />
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