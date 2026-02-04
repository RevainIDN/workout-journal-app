'use client'

import weightStyles from './WeightSection.module.css'
import { useBodyStore } from '@/store/journal/useBodyStore'

import Input from '@/components/ui/Input/Input'

export default function WeightSection() {
	const weight = useBodyStore(state => state.weight);
	const { saveWeight } = useBodyStore();

	return (
		<section className={weightStyles.weightSection}>
			<div className={weightStyles.titleBar}>
				<div className={weightStyles.titleSvg}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>
				</div>
				<h1>Weight</h1>
			</div>
			<div className={weightStyles.weightContent}>
				<Input
					type='number'
					label='Weight (lbs or kg)'
					placeholder='150.5'
					value={weight}
					onChange={saveWeight}
				/>
			</div>
		</section>
	)
}