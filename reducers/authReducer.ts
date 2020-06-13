type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
}

export type AUTHENTICATED = "AUTHENTICATED";
export type UNAUTHENTICATED = "UNAUTHENTICATED";

export type READY = "READY";
export type FETCHING = "FETCHING";
export type ERROR = "ERROR";

export type FETCH_STATE = READY | FETCHING | ERROR;
export type AUTHENTICATED_STATE = AUTHENTICATED | UNAUTHENTICATED;

export type AuthState = {
  authenticated: AUTHENTICATED_STATE;
  fetchState: FETCH_STATE;
  user: User | null; // for a while
};

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthPayload = {
  [Types.LOGIN]: {
    username: string;
    password: string;
  };
  [Types.SIGNUP]: {
    email: string;
    username: string;
    password: string;
  };
  [Types.LOGOUT]: {};
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case Types.LOGIN:
      const { username, password } = action.payload;
      if (username === "admin" && password === "admin") {
        return {
          ...state,
          user: { id: "1", email: "test@test.pl", username: "admin" },
          authenticated: "AUTHENTICATED",
        };
      }
    case Types.LOGOUT:
      return { ...state, user: null, authenticated: "UNAUTHENTICATED" };
    case Types.SIGNUP:
      return { ...state, user: { id: "2" }, authenticated: "AUTHENTICATED" };
    default:
      return state;
  }
};
