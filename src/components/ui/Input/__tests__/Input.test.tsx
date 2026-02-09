import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../Input'

describe('Input Component', () => {
	// Тест 1: Проверяем, что компонент рендерится с placeholder
	it('should render input with placeholder', () => {
		render(<Input placeholder="Enter text" onChange={() => { }} />)
		const input = screen.getByPlaceholderText('Enter text')
		expect(input).toBeInTheDocument()
	})

	// Тест 2: Проверяем, что label отображается, если оно передано
	it('should render label when provided', () => {
		render(<Input label="Name" onChange={() => { }} />)
		const label = screen.getByText('Name')
		expect(label).toBeInTheDocument()
	})

	// Тест 3: Проверяем, что label НЕ отображается, если его нет
	it('should not render label when not provided', () => {
		render(<Input placeholder="No label" onChange={() => { }} />)
		const label = screen.queryByRole('heading')
		expect(label).not.toBeInTheDocument()
	})

	// Тест 4: Проверяем, что значение обновляется
	it('should update value when user types', () => {
		render(<Input value="initial" onChange={() => { }} />)
		const input = screen.getByDisplayValue('initial') as HTMLInputElement
		expect(input.value).toBe('initial')
	})

	// Тест 5: Проверяем, что onChange вызывается при изменении значения
	it('should call onChange when input value changes', () => {
		const mockOnChange = jest.fn()
		render(<Input placeholder="Type here" onChange={mockOnChange} />)
		const input = screen.getByPlaceholderText('Type here') as HTMLInputElement

		fireEvent.change(input, { target: { value: 'hello' } })

		expect(mockOnChange).toHaveBeenCalledWith('hello')
		expect(mockOnChange).toHaveBeenCalledTimes(1)
	})

	// Тест 6: Проверяем тип input
	it('should render input with correct type', () => {
		render(<Input type="number" onChange={() => { }} />)
		const input = screen.getByRole('spinbutton') // type="number"
		expect(input).toHaveAttribute('type', 'number')
	})
})
