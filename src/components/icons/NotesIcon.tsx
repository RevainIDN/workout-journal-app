interface NotesIconProps {
	width?: number;
	height?: number;
}

export default function NotesIcon({ width, height }: NotesIconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width || 20} height={height || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"></path>
			<path d="M15 3v4a2 2 0 0 0 2 2h4"></path>
		</svg>
	);
}