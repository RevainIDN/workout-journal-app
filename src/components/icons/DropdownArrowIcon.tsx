interface DropdownArrowIconProps {
	width?: number;
	height?: number;
	direction?: 'up' | 'down';
}

export default function DropdownArrowIcon({ width = 20, height = 20, direction = 'down' }: DropdownArrowIconProps) {
	return (
		direction === 'up' ? (
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 15 6-6 6 6"></path></svg>
		) : (
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
		)
	)
}