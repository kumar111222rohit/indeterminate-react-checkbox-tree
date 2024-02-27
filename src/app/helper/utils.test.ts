import { adjustParentIds, normalizeResponseData, sortItemsAlphabetically } from "./utils"; 
import { DataStructure } from '../types/baseTypes';
import { Item } from "../components/CheckboxList/CheckboxList";

describe('Data normalization and parent ID adjustment', () => {

  const mockResponse: DataStructure = {
    "folders": {
      "columns": ["id", "title", "parent_id"],
      "data": [
        [1, "Audio", null],
        [4, "Speakers", 1],
        [8, "Rigging", null],
        [10, "Active speakers", 4],
        [2, "Passive speakers", 4],
        [6, "Truss", 8]
      ]
    },
    "items": {
      "columns": ["id", "title", "folder_id"],
      "data": [
        [3, "Passive Speakers Item 1", 2],
        [8, "Truss item 2", 6],
        [7, "Speaker item 1", 4],
        [5, "Audio item 1", 1],
        [1, "Active Speakers Item 1", 10],
        [4, "Speaker item 2", 4],
        [6, "Truss item 1", 6]
      ]
    }
  };

  describe('normalizeResponseData', () => {
    it('correctly transforms and assigns unique IDs, maintaining folder-item relationships', () => {
      const normalizedData = normalizeResponseData(mockResponse);
  
      // Check if the length matches the total number of folders and items
      expect(normalizedData.length).toBe(mockResponse.folders.data.length + mockResponse.items.data.length);
  
      // Verify that 'Active Speakers Item 1' (which has a folder_id pointing to 'Active speakers') gets the correct parentId
      const activeSpeakerItem = normalizedData.find(item => item.item_id === 1);
      const activeSpeakersFolder = normalizedData.find(folder => folder.item_id === 10);
      
      expect(activeSpeakerItem?.parentId).toBe(activeSpeakersFolder?.id);
    });
  });

});

describe('sortItemsAlphabetically', () => {
    it('should sort items alphabetically by title', () => {
      const items: Item[] = [
        { id: 3, item_id: 7, title: 'Cherry', parentId: 8 },
        { id: 2, item_id: 5, title: 'Banana', parentId: 6 },
        { id: 1, item_id: 3, title: 'Apple', parentId: 4 }
      ];
  
      const expected: Item[] = [
        { id: 1, item_id: 3, title: 'Apple', parentId: 4 },
        { id: 2, item_id: 5, title: 'Banana', parentId: 6 },
        { id: 3, item_id: 7, title: 'Cherry', parentId: 8 }
      ];
  
      const sortedItems = sortItemsAlphabetically(items);
      expect(sortedItems).toEqual(expected);
    });
  
    it('should handle case sensitivity by ignoring case', () => {
      const items: Item[] = [
        { id: 1, item_id: 3, title: 'apple', parentId: 4 },
        { id: 3, item_id: 7, title: 'cherry', parentId: 8 },
        { id: 2, item_id: 5, title: 'Banana', parentId: 6 }
      ];
  
      const expected: Item[] = [
        { id: 1, item_id: 3, title: 'apple', parentId: 4 },
        { id: 2, item_id: 5, title: 'Banana', parentId: 6 },
        { id: 3, item_id: 7, title: 'cherry', parentId: 8 }
      ];
  
      const sortedItems = sortItemsAlphabetically(items);
      expect(sortedItems).toEqual(expected);
    });
  
    it('should maintain the order of items with the same title', () => {
      const items: Item[] = [
        { id: 2, item_id: 5, title: 'Apple', parentId: 6 },
        { id: 1, item_id: 3, title: 'Apple', parentId: 4 }
      ];
  
      // Since the title is the same, the original order in the array should be maintained.
      const expected: Item[] = [
        { id: 2, item_id: 5, title: 'Apple', parentId: 6 },
        { id: 1, item_id: 3, title: 'Apple', parentId: 4 }
      ];
  
      const sortedItems = sortItemsAlphabetically(items);
      expect(sortedItems).toEqual(expected);
    });
  });
  
