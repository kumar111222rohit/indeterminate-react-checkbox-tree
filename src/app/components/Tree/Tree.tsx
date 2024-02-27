/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useContext, useState } from "react";
import CheckboxList, { Item } from "../CheckboxList/CheckboxList";
import { updateItemsCurrentStates } from "../../helper/updateItemsCurrentStates";
import { TreeDataContext } from "../../services/ContextProvider/TreeDataProvider";

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}
export type ItemState = {
  id: number;
  state: CheckboxState;
};

const Tree: React.FC = () => {
  const responseData = useContext(TreeDataContext);  

  if (responseData.length) {
    const defaultItemStates: ItemState[] = responseData?.map((i) => ({
      id: i.id,
      state: CheckboxState.UNCHECKED,
    }));

    const [itemStates, setItemStates] = useState<ItemState[]>(defaultItemStates);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const getStateForId = useCallback(
      (id: number) => {
        return itemStates?.find((i) => i.id === id)?.state;
      },
      [itemStates]
    );

    const clickHandler = useCallback(
      (id:number) => {

      const newSelectedItems = selectedIds.includes(id)
      ? selectedIds.filter((existingId) => existingId !== id) // Remove if unselected
      : [...selectedIds, id]; // Add if selected

    // Update both checkboxes and selected IDs
      setItemStates(updateItemsCurrentStates(itemStates, responseData as Item[], id))
      setSelectedIds(newSelectedItems);
      },
        
      [itemStates,responseData, selectedIds]
    );
   
    const clearSelection = () => {
      const uncheckedStates = itemStates.map((item) => ({
        ...item,
        state: CheckboxState.UNCHECKED, 
      }));
      setItemStates(uncheckedStates);
      setSelectedIds([]);
    };

    return (
      <>
      <CheckboxList items={responseData as Item[]} onClick={clickHandler} getStateForId={getStateForId} />
      <div className="text" >Selected Items: {selectedIds.join(", ") }</div>
      <div style={{margin:'8px'}}>
      <button className="buttons" onClick={clearSelection} >Clear selection</button>
      </div>
      </>
      
    );
  } else {
    // Render something else while data is loading or unavailable
    return <p>Still Loading data...</p>;
  }
};

export default Tree;
