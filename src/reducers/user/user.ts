import {UserState, UserAction} from '../../types';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionCreator = {
  requireAuthorization: (status): UserAction => {
    return {
      type: `REQUIRED_AUTHORIZATION`,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case `REQUIRED_AUTHORIZATION`:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
};

export {
  ActionCreator,
  AuthorizationStatus,
  Operation,
  reducer,
};
