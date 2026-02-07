'use client'

import weightStyles from './WeightSection.module.css'
import { useBodyStore } from '@/store/journal/useBodyStore'

import WeightIcon from '@/components/icons/WeightIcon'
import Input from '@/components/ui/Input/Input'

export default function WeightSection() {
	const weight = useBodyStore(state => state.weight);
	const { saveWeight } = useBodyStore();

	return (
		<section className={weightStyles.weightSection}>
			<div className={weightStyles.titleBar}>
				<div className={weightStyles.titleSvg}>
					<WeightIcon />
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