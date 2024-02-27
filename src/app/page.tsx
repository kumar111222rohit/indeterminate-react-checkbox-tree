import Tree from "../app/components/Tree/Tree";
import TreeDataProvider from "./services/ContextProvider/TreeDataProvider";

export default function Home() {
  return <TreeDataProvider><Tree  /></TreeDataProvider>;
}
