import { Item } from "../components/CheckboxList/CheckboxList";
import { CheckboxState, ItemState } from "../components/Tree/Tree";

export const updateItemsCurrentStates = (prevState: ItemState[], items: Item[], clickedId: number) => {
  const newState = prevState.map((i) => ({ ...i }));
  // getter method
  const getItemCurrentState = (id: number) => {
    return newState.find((i) => i.id === id)?.state;
  };
  // setter method
  const updateParentItem = (id: number) => {
    const item = items.find((i) => i.id === id);
    const parent = items.find((i) => i.id === item?.parentId);
    if (!parent) return;
    const childrenIds = items.filter((i) => i.parentId === parent.id).map((i) => i.id);
    const childrenStates = childrenIds.map((childId) => getItemCurrentState(childId));
    if (childrenStates.length === childrenStates.filter((s) => s === CheckboxState.CHECKED).length) {
        const item = newState.find((i) => i.id === parent.id);
            if (item) {
                item.state = CheckboxState.CHECKED;
            }
    } else if (childrenStates.length === childrenStates.filter((s) => s === CheckboxState.UNCHECKED).length) {
        const item = newState.find((i) => i.id === parent.id);
            if (item) {
                item.state = CheckboxState.UNCHECKED;
             }

    } else {
        const item = newState.find((i) => i.id === parent.id);
        if (item) {
                item.state = CheckboxState.INDETERMINATE;
             }
    }
    updateParentItem(parent.id);
  };
   const setCheckboxUnchecked = (id: number) => {
    const item = newState.find((i) => i.id === id);
            if (item) {
                item.state = CheckboxState.UNCHECKED;
            }

    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setCheckboxUnchecked(childId));
    updateParentItem(id);
  };
  const setCheckboxChecked = (id: number) => {
    const item = newState.find((i) => i.id === id);
            if (item) {
                item.state = CheckboxState.CHECKED;
            }
    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setCheckboxChecked(childId));
    updateParentItem(id);
  };

  // set/unset checkbox 
  const itemState = getItemCurrentState(clickedId);
  if (itemState === CheckboxState.CHECKED) {
    setCheckboxUnchecked(clickedId);
  } else {
    setCheckboxChecked(clickedId);
  }
  return newState;
};
