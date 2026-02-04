'use client'

import inputStyles from "./Input.module.css";

interface InputProps {
	type?: 'text' | 'number';
	value?: string | number | undefined;
	label?: string;
	placeholder?: string;
	onChange: (value: string | number) => void;
}

export default function Input(props: InputProps) {
	return (
		<div className={inputStyles.inputContainer}>
			{props.label && <label className={inputStyles.label}><h2>{props.label}</h2></label>}
			<input
				className={inputStyles.input}
				type={props.type}
				value={props.value ?? ''}
				placeholder={props.placeholder}
				onChange={(e) => props.onChange(e.target.value)}
			/>
		</div>
	)
}