import React, {
  useContext,
  createContext,
  Dispatch,
  useReducer,
  useEffect,
} from "react";
import { AuthState, authReducer, AuthActions } from "reducers/authReducer";
import { User, Types } from "reducers/authReducer";
import jwtDecode from "jwt-decode";

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
  console.log("provider", state);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      console.log("token");
      const user: User = jwtDecode(token);
      console.log(token);
      dispatch({ type: Types.LOGIN, payload: user });
    }
  }, []);

  console.log(state);

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
