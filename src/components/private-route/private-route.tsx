import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../reducers/user/user';
import NameSpace from '../../reducers/name-space';
import {UserState} from '../../types';

interface PrivateRouteProps {
  exact: boolean;
  path: string;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const {render, path, exact} = props;
  const authorizationStatus = useSelector((state: UserState) => state[NameSpace.USER].authorizationStatus);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

export default PrivateRoute;
