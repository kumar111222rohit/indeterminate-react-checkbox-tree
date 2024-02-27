export interface Folder {
    id: number;
    title: string;
    parent_id: number | null;
  }
  
  interface Item {
    id: number;
    title: string;
    folder_id: number | null;
  }
  
  interface Folders {
    columns: [keyof Folder, keyof Folder, keyof Folder];
    data: [Folder['id'], Folder['title'], Folder['parent_id']][];
  }
  
  interface Items {
    columns: [keyof Item, keyof Item, keyof Item];
    data: [Item['id'], Item['title'], Item['folder_id']][];
  }
  
  export interface DataStructure {
    folders: Folders;
    items: Items;
  }
  
  export interface TransformedItems {
    id: number;
    item_id: number;
    title: string;
    parentId: number | null;
  }

  