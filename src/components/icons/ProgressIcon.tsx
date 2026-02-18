interface ProgressIconProps {
	width?: number;
	height?: number;
}

export default function ProgressIcon({ width, height }: ProgressIconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width || 20} height={height || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
			<polyline points="16 7 22 7 22 13"></polyline>
		</svg>
	);
}