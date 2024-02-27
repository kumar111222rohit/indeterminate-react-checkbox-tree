import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';
import styles from './checkbox.module.scss';

describe('Checkbox', () => {
  test('renders without crashing', () => {
    render(<Checkbox />);
    const checkboxElement = screen.getByTestId('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  test('has the correct class when isChecked is true', () => {
    render(<Checkbox isChecked={true} />);
    const checkboxElement = screen.getByTestId('checkbox');
    expect(checkboxElement).toHaveClass(styles.isChecked);
  });

  test('has the correct class when isIndeterminate is true', () => {
    render(<Checkbox isIndeterminate={true} />);
    const checkboxElement = screen.getByTestId('checkbox');
    expect(checkboxElement).toHaveClass(styles.isIndeterminate);
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Checkbox onClick={handleClick} />);
    const checkboxElement = screen.getByTestId('checkbox');
    fireEvent.click(checkboxElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
