'use client'

import moodStyles from './MoodSection.module.css'
import { useWorkoutStore } from '@/store/journal/useWorkoutStore';

import Dropdown from '@/components/ui/Dropdown/Dropdown'

const moodList = ['😄 Excelent', '😊 Good', '😐 Okay', '😔 Low', '😰 Stressed'];
const energyLevelList = ['High', 'Moderate', 'Low', 'Exhausted'];

export default function MoodSection() {
	const mood = useWorkoutStore(state => state.moodAfter) || moodList[1];
	const energy = useWorkoutStore(state => state.energyAfter) || energyLevelList[1];
	const { saveMood, saveEnergy } = useWorkoutStore();

	return (
		<section className={moodStyles.moodSection}>
			<div className={moodStyles.titleBar}>
				<div className={moodStyles.titleSvg}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
				</div>
				<h1>Mood & Energy</h1>
			</div>
			<div className={moodStyles.moodContent}>
				<Dropdown
					label='Mood'
					dropdownList={moodList}
					selectedValue={mood}
					onClick={saveMood}
				/>
				<Dropdown
					label='Energy Level'
					dropdownList={energyLevelList}
					selectedValue={energy}
					onClick={saveEnergy}
				/>
			</div>
		</section>
	)
}