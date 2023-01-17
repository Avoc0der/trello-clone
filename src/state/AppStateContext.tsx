import { createContext, useContext, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { Task, List, AppState, appStateReducer } from "./AppStateReducer";
import { Action } from "./actions";
import { DragItem } from "../DragItem";

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTaskByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scafold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { draggedItem, lists } = state;

  const getTaskByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTaskByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
