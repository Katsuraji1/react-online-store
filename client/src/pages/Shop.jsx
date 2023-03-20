import React, {useEffect, useContext} from "react";
import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap';
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from 'mobx-react-lite';
import { Context } from './../index';
import { fetchType } from "../http/deviceApi";
import { fetchBrand, fetchDevices } from './../http/deviceApi';
import Pagin from "../components/Pagin";

const Shop = observer(() => {

    const {devices} = useContext(Context)

    useEffect(() => {
        fetchType().then((data) => devices.setType(data))
        fetchBrand().then((data) => devices.setBrand(data))
    }, [])


    useEffect(() => {
        fetchDevices(devices.page, devices.limit, devices.SelectedType.id, devices.SelectedBrand.id).then((data) =>{ 
            devices.setDevice(data.rows)
            devices.setTotalCount(data.count)    
        })
    } ,[devices.page, devices.SelectedBrand, devices.SelectedType])

    const resetFilter = () => {
        devices.setSelectedType(false)
        devices.setSelectedBrand(false)
    }

    return (  
        <Container>
            <Row>
                <Col md = {3}>
                    <TypeBar/>
                    <Button className="mt-5" variant="outline-danger" onClick = {() => resetFilter()}>Сбросить фильтры</Button>
                </Col>
                <Col md = {9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pagin/>
                </Col>
            </Row>
        </Container>
    );
})

export default Shop;