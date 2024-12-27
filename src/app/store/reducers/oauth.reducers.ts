export interface OAuthState {
    id: string;
  }
  
  export const initialState: OAuthState = {
    id: "123"
  };
  
  export function reducer(state = initialState) {
    return state;
  }
  