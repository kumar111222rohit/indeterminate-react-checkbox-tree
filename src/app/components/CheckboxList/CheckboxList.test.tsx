import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckboxList from './CheckboxList';
import { CheckboxState } from '../Tree/Tree';

describe('CheckboxList Component', () => {
  const mockItems = [
    { id: 1,item_id:4, title: 'Item 1', parentId: 0 },
    { id: 2,item_id:5, title: 'Item 2', parentId: 1 },
    { id: 3,item_id:6, title: 'Item 3', parentId: 1 },
  ];

  const getStateForId = jest.fn((id) => {
    if (id === 1) return CheckboxState.CHECKED;
    return CheckboxState.UNCHECKED;
  });

  const onClick = jest.fn();

  test('renders list items correctly with correct checkbox state', () => {
    render(
      <CheckboxList
        items={mockItems}
        idsToRender={[1, 2, 3]}
        getStateForId={getStateForId}
        onClick={onClick}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    
    const items2 = screen.getAllByText('Item 2');
    expect(items2.length).toBeGreaterThan(0); 


    const items3 = screen.getAllByText('Item 3');
    expect(items3.length).toBeGreaterThan(0); 

    // Check if getStateForId is called correctly
    expect(getStateForId).toHaveBeenCalledWith(1);
    expect(getStateForId).toHaveBeenCalledWith(2);
    expect(getStateForId).toHaveBeenCalledWith(3);

    // Simulate a click on the first checkbox and verify onClick is called
    const checkbox= screen.getAllByTestId('checkbox')
    fireEvent.click(checkbox[0]);
    expect(onClick).toHaveBeenCalledWith(1);
  });

});
