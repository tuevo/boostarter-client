import React from 'react';
import { Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => (
        <div key={routeProps.match.url}><Component {...routeProps} /></div>
      )}
    />
  )
}
