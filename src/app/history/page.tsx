import pageStyles from './page.module.css'

import HistoryDropdown from './components/HistoryDropdown/HistoryDropdown'

export default function History() {
	return (
		<main className={pageStyles.historyPage}>
			<div className={pageStyles.pageContent}>
				<div className={pageStyles.header}>
					<h1 className={pageStyles.title}>Journal History</h1>
					<p className={pageStyles.subtitle}>Review your past entries and celebrate your progress</p>
				</div>
				<HistoryDropdown />
			</div>
		</main>
	)
}