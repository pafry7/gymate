import React, { useContext, createContext, Dispatch, useReducer } from "react";
import {
  FETCH_STATE,
  AUTHENTICATED_STATE,
  AuthState,
  authReducer,
  AuthActions,
} from "reducers/authReducer";

const initialState: AuthState = {
  authenticated: "UNAUTHENTICATED",
  fetchState: "READY",
  user: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
      {...props}
    />
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { useAuth, AuthProvider };
