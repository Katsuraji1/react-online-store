import { observer } from "mobx-react-lite";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { Context } from './../index';
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/RoutesConst";
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { ADMMIN_ROUTE, LOGIN_ROUTE } from './../utils/RoutesConst';


const NavigationBar = observer(() => {
    const history = useNavigate()
    const {user} = useContext(Context)

    const logout = () => {
        user.setIsAuth(false)
        user.setUser({})
        localStorage.setItem('token', '')
    }

    return (  
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{color: 'white', textDecoration: 'none'}}>Купи</NavLink>
                {
                    user._isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button onClick={() => history(ADMMIN_ROUTE)} variant="outline-light">Адиин панель</Button>
                        <Button onClick={() => logout()} variant="outline-light">Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button onClick={() => history(LOGIN_ROUTE)} variant="outline-light">Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavigationBar;