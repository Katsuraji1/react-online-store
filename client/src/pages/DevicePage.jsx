import React, {useEffect, useState, useContext} from "react";
import { Col, Container, Image, Button } from "react-bootstrap";
import bigStar from '../assets/image/bigStar.png'
import { useParams } from "react-router-dom";
import { fetchOneDevice } from './../http/deviceApi';

const DevicePage = () => {

    const {id} = useParams()
    const [device, setDevice] = useState({info: []})


    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return ( 
        <Container className="mt-3 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-around">
                <Col className="d-flex flex-column align-items-center justify-content-around" md = {4}>
                    <Image width={300} height={300} src = {process.env.REACT_APP_BASE_URL + '/' + device.img}/>
                </Col>
                <Col md = {4}>
                    <div className="d-flex align-items-center flex-column">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 30, fontWeight: 'bold'}}
                        >
                            {device.rating}
                        </div>
                    </div>
                </Col>
                <Col style={{width:300 , height:300, border: '5px solid gray', fontSize:32 }} className="d-flex flex-column align-items-center justify-content-around" md = {4}>
                    <h3>{device.price}</h3>
                    <Button variant="outline-dark">Добавить в корзину</Button>
                </Col>
            </div>
            <h2 className="m-3">Характеристики</h2>
            <div className="d-flex flex-column m-3">
                {
                    device.info.map((description, index) =>
                        <div key={description.id} className="p-3" style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', fontSize: 20. }}>
                            {description.title}: {description.description}
                        </div>
                    )
                }
            </div>
        </Container>
    );
}

export default DevicePage;