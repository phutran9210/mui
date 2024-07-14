import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';

interface AppState {
    count: number;
}

interface AppContextProps {
    state: AppState;
    dispatch: Dispatch<Action>;
}

interface ProviderProps {
    children: ReactNode;
}

const initialState: AppState = {
    count: 0
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export { AppContext, initialState };

type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };
        case 'decrement':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

export const AppProvider: FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export { useAppContext };
