import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/reducer';
import App from './components/app/app';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

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
