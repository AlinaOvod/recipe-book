import React from 'react';
import { State } from '../types/state';
import { Action } from '../types/action';
import { useSessionReducer } from '../hooks/useSessionStorage';
import { reducer } from './appReducer';

type ActionType = (action: Action) => void;

const initialState: State = {
  categories: [],
  favorites: [],
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<ActionType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useSessionReducer(reducer, initialState, 'state');

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};