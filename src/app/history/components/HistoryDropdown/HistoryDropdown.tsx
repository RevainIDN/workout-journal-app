'use client'

import historyDropdownStyles from './HistoryDropdown.module.css'
import { useState } from 'react'
import { formatFullDate } from '@/lib/utils/formatDate'

import DeleteIcon from '@/components/icons/DeleteIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'
import DropdownArrowIcon from '@/components/icons/DropdownArrowIcon'
import TagList from '@/components/ui/TagList/TagList'
import FullHistoryDescription from '../FullHistoryDescription/FullHistoryDescription'
import useHistoryEntries from '@/app/history/hooks/useHistoryEntries'

export default function HistoryDropdown() {
	const { entries: history, deleteEntry } = useHistoryEntries()
	const [openDate, setOpenDate] = useState<string | null>(null)

	const handleToggle = (e: React.MouseEvent, date: string) => {
		e.stopPropagation()
		setOpenDate(prev => prev === date ? null : date)
	}

	const handleDelete = (e: React.MouseEvent, date: string) => {
		e.stopPropagation()
		deleteEntry(date)
		if (openDate === date) setOpenDate(null)
	}

	return (
		<section className={historyDropdownStyles.historyDropdownList}>
			{history.map(entry => (
				<div key={entry.date} onClick={(e) => handleToggle(e, entry.date)}>
					<div
						className={historyDropdownStyles.historyEntry}
					>
						<div className={historyDropdownStyles.shortHistoryContent}>
							<div className={historyDropdownStyles.shortHistoryTitle}>
								<CalendarIcon width={16} height={16} />
								<h2>{formatFullDate(entry.date)}</h2>
							</div>
							<div className={historyDropdownStyles.shortHistoryTags}>
								<TagList entry={entry} />
							</div>
						</div>
						<div className={historyDropdownStyles.shortHistoryButtons}>
							<button className={historyDropdownStyles.deleteButton} onClick={(e) => handleDelete(e, entry.date)}>
								<DeleteIcon />
							</button>
							<button className={historyDropdownStyles.viewButton} onClick={(e) => handleToggle(e, entry.date)}>
								{openDate === entry.date ? (
									<DropdownArrowIcon width={20} height={20} direction='up' />
								) : (
									<DropdownArrowIcon width={20} height={20} direction='down' />
								)}
							</button>
						</div>
					</div>
					{openDate === entry.date && (
						<FullHistoryDescription entry={entry} />
					)}
				</div>
			))}
			{history.length === 0 && (
				<div className={historyDropdownStyles.noDataOverlay}>
					<CalendarIcon width={48} height={48} />
					<h1>No journal entries yet</h1>
					<p>Your wellness journey starts with your first entry!</p>
				</div>
			)}
		</section>
	)
}