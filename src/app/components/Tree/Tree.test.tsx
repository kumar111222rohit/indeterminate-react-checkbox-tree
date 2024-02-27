import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tree  from './Tree'; 
import { TreeDataContext } from '../../services/ContextProvider/TreeDataProvider'; 
import {  TransformedItems } from '@/app/types/baseTypes';
import { Item } from '../CheckboxList/CheckboxList';

// Mock the CheckboxList component to simplify testing
jest.mock('../CheckboxList/CheckboxList', () => {
    type MockCheckboxListProps = {
      items: Item[];
      onClick: (id: number) => void;
    };
  
    const MockCheckboxList: React.FC<MockCheckboxListProps> = ({ items, onClick }) => (
      <div>
        {items.map((item) => (
          <button key={item.id} data-testid={`checkbox-${item.id}`} onClick={() => onClick(item.id)}>
            Item {item.id}
          </button>
        ))}
      </div>
    );
    MockCheckboxList.displayName = 'MockCheckboxList';
    return MockCheckboxList;
  });
  

describe('Tree Component', () => {
  const mockResponseData: TransformedItems[] = [
    { id: 1, item_id: 5, title: 'Item 1', parentId: null },
    { id: 2, item_id: 6, title: 'Item 2', parentId: 1 },
  ];

  beforeEach(() => {
    jest.spyOn(React, 'useContext').mockImplementation(() => mockResponseData);
  });

  test('renders items and allows selection and clearing', async () => {
    render(
      <TreeDataContext.Provider value={mockResponseData}>
        <Tree />
      </TreeDataContext.Provider>
    );
  
    fireEvent.click(screen.getByTestId('checkbox-1'));
  
    let selectedItemsText = screen.getByText((content, element) => {
      return content.includes('Selected Items:') && element?.textContent?.includes('1');
    });
    expect(selectedItemsText).toBeInTheDocument();
  
    fireEvent.click(screen.getByText('Clear selection'));
  
    selectedItemsText = screen.getByText((content, element) => {
      return content.includes('Selected Items:') && element?.textContent?.trim() === 'Selected Items:';
    });
    expect(selectedItemsText).toBeInTheDocument();
  });
  
});
