'use client'

import waterStyles from './WaterSection.module.css'
import { useBodyStore } from '@/store/journal/useBodyStore'

import WaterIcon from '@/components/icons/WaterIcon';

export default function WaterSection() {
	const liters = useBodyStore(state => state.litersOfWater);
	const { increaseWater, decreaseWater } = useBodyStore();

	return (
		<section className={waterStyles.waterSection}>
			<div className={waterStyles.titleBar}>
				<div className={waterStyles.titleSvg}>
					<WaterIcon />
				</div>
				<h1>Water Intake</h1>
			</div>
			<div className={waterStyles.waterContent}>
				<button className={waterStyles.removeButton} onClick={decreaseWater}>-</button>
				<div className={waterStyles.generalCount}>
					<h1 className={waterStyles.count}>{liters}</h1>
					<p className={waterStyles.description}>liters (1lt)</p>
				</div>
				<button className={waterStyles.addButton} onClick={increaseWater}>+</button>
			</div>
		</section>
	)
}