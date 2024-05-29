import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

function PrivateRoute({ component: Component, ...rest }) {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;