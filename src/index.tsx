import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import {Operation as DataOperation} from './reducers/data/data';
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from './reducers/user/user';
import {createAPI} from './api';
import App from './components/app/app';

const onUnauthorized = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);


//        ________________                              _______________
//       /                \                            / /           \ \
//      / /          \ \   \                          |    -    -       \
//      |                  |                          | /        -   \  |
//     /                  /                           \                 \
//    |      ___\ \| | / /                             \____________  \  \
//    |      /           |                             |            \    |
//    |      |     __    |                             |             \   \
//   /       |       \   |                             |              \  |
//   |       |        \  |                             | ====          | |
//   |       |       __  |                             | (o-)      _   | |
//   |      __\     (_o) |                             /            \  | |
//   |     |             |     Heh Heh Heh            /            ) ) | |
//    \    ||             \      /      Huh Huh Huh  /             ) / | |
//     |   |__             \    /                \  |___            - |  |
//     |   |           (*___\  /                  \    *'             |  |
//     |   |       _     |    /                    \  |____           |  |
//     |   |    //_______|                             ####\          |  |
//     |  /       |_|_|_|___/\                        ------          |_/
//      \|       \ -         |                        |                |
//       |       _----_______/                        \_____           |
//       |      /                                          \           |
//       |_____/                                            \__________|
