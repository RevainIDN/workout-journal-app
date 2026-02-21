import pageStyles from './page.module.css'

import StatsSection from './components/StatsSection/StatsSection'

export default function StatsPage() {
	return (
		<div className={pageStyles.statsPage}>
			<div className={pageStyles.pageContent}>
				<div className={pageStyles.header}>
					<h1 className={pageStyles.title}>Your Progress</h1>
					<p className={pageStyles.subtitle}>Track your wellness journey with beautiful insights</p>
				</div>
				<StatsSection />
			</div>
		</div>
	)
}