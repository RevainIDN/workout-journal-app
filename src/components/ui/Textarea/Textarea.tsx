'use client'

import textareaStyles from './Textarea.module.css'

interface TextareaProps {
	value?: string;
	label?: string;
	placeholder?: string;
	onChange: (value: string) => void;
}

export default function Textarea(props: TextareaProps) {
	return (
		<div className={textareaStyles.textareaContainer}>
			{props.label && <label className={textareaStyles.label}><h2>{props.label}</h2></label>}
			<textarea
				className={textareaStyles.textarea}
				placeholder={props.placeholder}
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
			>
			</textarea>
		</div>
	)
}