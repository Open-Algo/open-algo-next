import React, { createContext, useContext, useReducer, useState } from 'react';
import { User } from '../../types';

interface Action {
  type: string;
  user: User;
}

type Dispatch = (action: Action) => void;

type State = {
  user: User;
};

interface Props {
  children: React.ReactNode;
}

const initialState = {
  user: {
    id: '',
    jwt: '',
    username: '',
    email: '',
    problems: [],
    problemsByDifficulty: {},
    problemsByGroup: {},
  },
};

const UserContext = createContext<{
  state: State;
  dispatch: Dispatch | undefined;
}>(undefined);

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'update': {
      return { user: action.user };
    }
    default:
      return state;
  }
};

export function UserProvider(props: Props) {
  const [state, dispatch] = useReducer<
    (state: State, action: Action) => { user: User }
  >(userReducer, {
    user: {
      id: '',
      jwt: '',
      username: '',
      email: '',
      problems: [],
      problemsByDifficulty: {},
      problemsByGroup: {},
    },
  });

  const value = { state, dispatch };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider!');
  }
  return context;
}
