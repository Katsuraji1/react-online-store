import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from './../routes';
import { useContext } from "react";
import { Context } from './../index';

const AppRoute = () => {
    const {user} = useContext(Context)
    return ( 
        <Routes>
            {
                user._isAuth && privateRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} Component={Component} exact></Route>
                    )
            }
            {
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} Component={Component} path={path} exact></Route>
                )
            }
            <Route path="*" element = {<Navigate to='/'/>}></Route>
        </Routes>
    );
}

export default AppRoute;