'use client'

import moodStyles from './MoodSection.module.css'
import { useWorkoutStore } from '@/store/journal/useWorkoutStore';

import Dropdown from '@/components/ui/Dropdown/Dropdown'

const moodList = ['😄 Excelent', '😊 Good', '😐 Okay', '😔 Low', '😰 Stressed'];
const energyLevelList = ['High', 'Moderate', 'Low', 'Exhausted'];

import MoodIcon from '@/components/icons/MoodIcon';

export default function MoodSection() {
	const mood = useWorkoutStore(state => state.moodAfter) || moodList[1];
	const energy = useWorkoutStore(state => state.energyAfter) || energyLevelList[1];
	const { saveMood, saveEnergy } = useWorkoutStore();

	return (
		<section className={moodStyles.moodSection}>
			<div className={moodStyles.titleBar}>
				<div className={moodStyles.titleSvg}>
					<MoodIcon />
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