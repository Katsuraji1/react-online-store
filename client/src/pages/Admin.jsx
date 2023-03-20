import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import ModalBrand from './../components/modals/ModalBrand';
import ModalDevice from "../components/modals/ModalDevice";
import ModalType from "../components/modals/ModalType";

const Admin = () => {

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return ( 
        <Container className="d-flex flex-column">
            <Button onClick={() => setTypeVisible(true)} className="mt-2 mb-2" variant="outline-dark">Добавить тип</Button>
            <Button onClick={() => setBrandVisible(true)} className="mt-2 mb-2" variant="outline-dark">Добавить брэнд</Button>
            <Button onClick={() => setDeviceVisible(true)} className="mt-2 mb-2" variant="outline-dark">Добавить устройство</Button>
            <ModalBrand show = {brandVisible} onHide={() => setBrandVisible(false)}/>
            <ModalDevice show = {deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <ModalType show = {typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
}

export default Admin;