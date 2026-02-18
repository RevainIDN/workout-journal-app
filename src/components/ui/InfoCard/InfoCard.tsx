import infoCardStyles from './InfoCard.module.css'

import WaterIcon from '@/components/icons/WaterIcon';
import WeightIcon from '@/components/icons/WeightIcon';
import MoodIcon from '@/components/icons/MoodIcon';
import HealthIcon from '@/components/icons/HealthIcon';
import MealIcon from '@/components/icons/MealIcon';

function getIcon(type: string) {
	if (type === 'Water') return <WaterIcon />;
	if (type === 'Workout') return <HealthIcon />;
	if (type === 'Weight' || type === 'Entries') return <WeightIcon />;
	if (type === 'Mood') return <MoodIcon />
	if (type === 'Energy') return <MoodIcon />
	if (type === 'Nutrition') return <MealIcon />
	return null;
}

function getBackgroundColor(type: string) {
	if (type === 'Water' || type === 'Workout') return { backgroundColor: 'rgba(var(--pastel-aqua-rgb), 0.2)', color: 'rgb(var(--pastel-aqua-rgb))' };
	if (type === 'Weight' || type === 'Nutrition') return { backgroundColor: 'rgba(var(--pastel-peach-rgb), 0.2)', color: 'rgb(var(--pastel-peach-rgb))' };
	if (type === 'Mood') return { backgroundColor: 'rgba(var(--pastel-lavender-rgb), 0.2)', color: 'rgb(var(--pastel-lavender-rgb))' };
	if (type === 'Energy') return { backgroundColor: 'rgba(var(--pastel-pink-rgb), 0.2)', color: 'rgb(var(--pastel-pink-rgb))' };
	if (type === 'Entries') return { backgroundColor: 'rgba(var(--pastel-green-rgb), 0.2)', color: 'rgb(var(--pastel-green-rgb))' };
	return {};
}

interface InfoCardProps {
	type: 'Water' | 'Weight' | 'Mood' | 'Energy' | 'Workout' | 'Nutrition' | 'Entries';
	title: string;
	value: string | number;
	subValue?: string | number;
	titleFontSize?: string;
	fontSize?: string;
	height?: number;
	svgCover?: boolean;
}

export default function InfoCard({ type, title, value, subValue, fontSize, height, svgCover, titleFontSize }: InfoCardProps) {
	return (
		<div className={infoCardStyles.infoCard} style={{ ...getBackgroundColor(type), height: height ? `${height}px` : undefined }}>
			<div className={infoCardStyles.title} style={{ fontSize: titleFontSize ? titleFontSize : '1rem' }}>
				{svgCover && <div className={infoCardStyles.svgCover} style={getBackgroundColor(type)}>{getIcon(type)}</div>}
				{!svgCover && getIcon(type)} {title}
			</div>
			<h2 style={{ fontSize: fontSize }}>{value}{subValue && <span className={infoCardStyles.subValue}> {subValue}</span>}</h2>
		</div>
	)
}
