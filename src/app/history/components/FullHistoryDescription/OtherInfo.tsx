import otherHistoryStyles from './OtherInfo.module.css'

import WaterIcon from '@/components/icons/WaterIcon';
import WeightIcon from '@/components/icons/WeightIcon';
import MoodIcon from '@/components/icons/MoodIcon';

function getIcon(info: string) {
	if (info === 'Water') return <WaterIcon />;
	if (info === 'Weight') return <WeightIcon />;
	if (info === 'Mood') return <MoodIcon />
	if (info === 'Energy') return <MoodIcon />
	return null;
}

function getBackgroundColor(info: string) {
	if (info === 'Water') return { backgroundColor: 'rgba(var(--pastel-aqua-rgb), 0.2)', color: 'rgb(var(--pastel-aqua-rgb))' };
	if (info === 'Weight') return { backgroundColor: 'rgba(var(--pastel-peach-rgb), 0.2)', color: 'rgb(var(--pastel-peach-rgb))' };
	if (info === 'Mood') return { backgroundColor: 'rgba(var(--pastel-lavender-rgb), 0.2)', color: 'rgb(var(--pastel-lavender-rgb))' };
	if (info === 'Energy') return { backgroundColor: 'rgba(var(--pastel-pink-rgb), 0.2)', color: 'rgb(var(--pastel-pink-rgb))' };
	return {};
}

interface OtherInfoProps {
	title: 'Water' | 'Weight' | 'Mood' | 'Energy';
	value: string | number;
}

export default function OtherInfo({ title, value }: OtherInfoProps) {
	return (
		<div className={otherHistoryStyles.otherDetails} style={getBackgroundColor(title)}>
			<div className={otherHistoryStyles.title}>
				{getIcon(title)} {title}
			</div>
			<h2>{value}</h2>
		</div>
	)
}
