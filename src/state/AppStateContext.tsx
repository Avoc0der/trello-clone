import { createContext, useContext, Dispatch, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Task, List, AppState, appStateReducer } from "./AppStateReducer";
import { Action } from "./actions";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTaskByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
    const { draggedItem, lists } = state;

    const getTaskByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    useEffect(() => {
      save(state);
    }, [state]);

    return (
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTaskByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
