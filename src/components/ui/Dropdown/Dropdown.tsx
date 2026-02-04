'use client'

import dropdownStyles from './Dropdown.module.css'
import { useState, useEffect, useRef } from 'react';

interface DropdownProps {
	label: string;
	dropdownList: string[];
	selectedValue: string;
	onClick: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const selectValue = (e: React.MouseEvent<HTMLLIElement>) => {
		props.onClick(e.currentTarget.textContent)
		setIsOpen(false);
	}

	return (
		<div ref={dropdownRef} className={dropdownStyles.dropdownContent}>
			{props.label && <label className={dropdownStyles.label}><h2>{props.label}</h2></label>}
			<div className={dropdownStyles.dropdown} onClick={() => setIsOpen((prev) => !prev)}>
				<h2>{props.selectedValue}</h2>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
			</div>
			<ul className={`${dropdownStyles.dropdownList} ${isOpen ? dropdownStyles.open : ""}`}>
				{props.dropdownList?.map((item, id) => (
					<li
						key={id}
						className={dropdownStyles.dropdownItem}
						onClick={(e) => selectValue(e)}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}