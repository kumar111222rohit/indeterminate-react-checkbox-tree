import { UNIQUE_ID } from "./constants";
import { DataStructure, TransformedItems } from '../types/baseTypes'
import { Item } from "../components/CheckboxList/CheckboxList";

export function normalizeResponseData(response: DataStructure) {
    let uniqueId = UNIQUE_ID; 
    const transformedItems: TransformedItems[] = [];
  
    // Process folders and items one by one and create a normalized array of objects

    // Process folders
    const folderData = response.folders.data;
    transformedItems.push(...folderData.map(([itemId, title, parentId]) => ({
      id: uniqueId++, // Assign an incremental unique ID 
      item_id: itemId,
      title,
      parentId,
    })));
  
    // Process items, linking them to their parent folders
    const itemData = response.items.data;
    transformedItems.push(...itemData.map(([itemId, title, folderID]) => ({
      id: uniqueId++, 
      item_id: itemId,
      title,
      parentId: folderData.find((folder) => folder[0] === folderID)?.[0]?? null ,
    })));

    // with the transformedItems, we now adjust the parent-child relationship with ids mapping
  const updatedResult= adjustParentIds(transformedItems)
    return updatedResult;
  }

   export  function adjustParentIds(data: TransformedItems[]) {
        const adjustedItems: TransformedItems[] = data.map(item => {
            const parentItem = data.find(otherItem => item.parentId === otherItem.item_id);
            if (parentItem) {
                return {...item, parentId: parentItem.id};
            }
            return item;
        });

         const sortedResult= sortItemsAlphabetically(adjustedItems);
         return sortedResult
    }

    export function sortItemsAlphabetically(items: TransformedItems[]){
          items.sort((a:Item, b:Item) => {
            const titleA = a.title.toUpperCase(); 
            const titleB = b.title.toUpperCase(); 
            if (titleA < titleB) {
              return -1; 
            }
            if (titleA > titleB) {
              return 1; 
            }
            // names must be equal
            return 0;
          });
          return items;
              
    }
  
   
    