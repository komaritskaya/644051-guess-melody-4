import React from 'react';
import ReactDOM from 'react-dom';
import questions from './mock/questions';

import App from './components/app/app';

const Settings = {
  ERRORS_COUNT: 3
};

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);


// ________________                              _______________
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
