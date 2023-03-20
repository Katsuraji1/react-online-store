import React, {useState, useContext} from "react";
import { Button, Card, Container, Form} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/RoutesConst";
import { useLocation } from 'react-router-dom'
import { LOGIN_ROUTE } from './../utils/RoutesConst';
import { observer } from 'mobx-react-lite';
import { login, registration } from './../http/userApi';
import { Context } from './../index';
import { useNavigate } from 'react-router-dom';


const Auth = observer(() => {
    const history = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const click = async () => {
        let data; 
        try {
            if(isLogin) {
                data  = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setIsAuth(true)
            user.setUser(user)
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return ( 
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-3">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3" placeholder="Введите email"></Form.Control>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-3" placeholder="Введите пароль"></Form.Control>
                    <div className="mt-3 p-1 d-flex justify-content-between">
                        {
                            isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button onClick = {click} className="align-self-end" variant="outline-success">{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;