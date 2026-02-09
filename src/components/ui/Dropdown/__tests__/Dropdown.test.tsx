import { render, screen, fireEvent, getByRole } from '@testing-library/react'
import Dropdown from '../Dropdown'

describe('Dropdown Component', () => {
	it('renders label and selected value from props', () => {
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={() => { }} />)
		const dropdownLabel = screen.getByText('Somelabel')
		const dropdownSelectedValue = screen.getByText('Value');
		expect(dropdownLabel).toBeInTheDocument()
		expect(dropdownSelectedValue).toBeInTheDocument()
	})

	it('list of values is not visible by default.', () => {
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={() => { }} />)
		const dropdownItem = screen.getByRole('list')
		expect(dropdownItem).not.toHaveClass('open')
	})

	it('clicking on the dropdown opens the list.', () => {
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={() => { }} />)
		const dropdown = screen.getByText('Value')
		fireEvent.click(dropdown)
		const dropdownList = screen.getByRole('list')
		expect(dropdownList).toHaveClass('open')
	})

	it('clicking again closes the list', () => {
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={() => { }} />)
		const dropdown = screen.getByText('Value')
		fireEvent.click(dropdown)
		const dropdownList = screen.getByRole('list')
		expect(dropdownList).toHaveClass('open')
		fireEvent.click(dropdown)
		expect(dropdownList).not.toHaveClass('open')
	})

	it('clicking on an item calls onClick with the correct value', () => {
		const mockClickFn = jest.fn();
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={mockClickFn} />)
		const dropdown = screen.getByText('Value')
		fireEvent.click(dropdown)
		const item1 = screen.getByText('1')
		fireEvent.click(item1)
		expect(mockClickFn).toHaveBeenCalled()
		expect(mockClickFn).toHaveBeenCalledWith('1')
	})

	it('clicking on an item calls onClick with the correct value', () => {
		const mockClickFn = jest.fn();
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={mockClickFn} />)
		const dropdown = screen.getByText('Value')
		fireEvent.click(dropdown)
		const dropdownList = screen.getByRole('list')
		expect(dropdownList).toHaveClass('open')
		const item1 = screen.getByText('1')
		fireEvent.click(item1)
		expect(mockClickFn).toHaveBeenCalled()
		expect(dropdownList).not.toHaveClass('open')
	})

	it('clicking outside the component closes the dropdown', () => {
		render(<Dropdown label='Somelabel' selectedValue='Value' dropdownList={['1', '2', '3']} onClick={() => { }} />)
		const dropdown = screen.getByText('Value')
		fireEvent.click(dropdown)
		const dropdownList = screen.getByRole('list')
		expect(dropdownList).toHaveClass('open')
		fireEvent.mouseDown(document.body)
		expect(dropdownList).not.toHaveClass('open')
	})
})