import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from '../assets/image/Vector.png'
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/RoutesConst";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()

    return (  
        <Col md = {3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className="mt-3 mb-3" style= {{width: 150, cursor: 'pointer'}}>
                <Image width={150} height={250} src={process.env.REACT_APP_BASE_URL + "/" + device.img}/>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="text-black-50">Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
}

export default DeviceItem;