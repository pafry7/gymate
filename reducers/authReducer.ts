import wretch from "wretch";

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
  LOAD = "LOAD",
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

export type UserResponse = {
  id: string;
  username: string;
  accountType: number;
  email: string;
  jwt: string;
};

export type User = {
  id: string;
  username: string;
  accountType: number;
  email: string;
};

type AuthPayload = {
  [Types.LOGIN]: {
    username: string;
    id: string;
    email: string;
    accountType: number;
  };
  [Types.LOGOUT]: {};
  [Types.LOAD]: { state: FETCH_STATE };
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case Types.LOGIN:
      const user: User = action.payload;
      return {
        ...state,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          accountType: user.accountType,
        },
        authenticated: "AUTHENTICATED",
      };
    case Types.LOGOUT:
      return { ...state, user: null, authenticated: "UNAUTHENTICATED" };
    case Types.LOAD:
      return { ...state, fetchState: action.payload.state };
    default:
      return state;
  }
};
