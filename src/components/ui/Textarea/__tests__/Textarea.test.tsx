import { render, screen, fireEvent } from '@testing-library/react'
import Textarea from '../Textarea'

describe('Textarea Component', () => {
	// Тест 1: Проверяем, что компонент рендерится с placeholder
	it('should render textarea with placeholder', () => {
		render(<Textarea placeholder='Sometext' onChange={() => { }} />)
		const textarea = screen.getByPlaceholderText('Sometext')
		expect(textarea).toBeInTheDocument()
	})

	// Тест 2: Проверяем, что label отображается, если оно передано
	it('should render label when provided', () => {
		render(<Textarea label='Somelabel' onChange={() => { }} />)
		const label = screen.getByText('Somelabel')
		expect(label).toBeInTheDocument()
	})

	// Тест 3: Проверяем, что label НЕ отображается, если его нет
	it('should not render label when not provided', () => {
		render(<Textarea onChange={() => { }} />)
		const label = screen.queryByRole('heading')
		expect(label).not.toBeInTheDocument()
	})

	// Тест 4: Проверяем, что значение обновляется
	it('should update value when input changes', () => {
		render(<Textarea value='initial' onChange={() => { }} />)
		const textarea = screen.getByDisplayValue('initial') as HTMLTextAreaElement
		expect(textarea.value).toBe('initial')
	})

	// Тест 5: Проверяем, что onChange вызывается при изменении значения
	it('should call onChange when textarea value changes', () => {
		const mockOnChange = jest.fn()
		render(<Textarea placeholder='Type here' onChange={mockOnChange} />)
		const textarea = screen.getByPlaceholderText('Type here') as HTMLTextAreaElement
		fireEvent.input(textarea, { target: { value: 'new value' } })
		expect(mockOnChange).toHaveBeenCalledTimes(1)
	})
})