import React, {useContext, useState, useEffect} from "react";
import { Button, Dropdown, Modal, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Context } from './../../index';
import { fetchBrand, fetchType, createDevice } from './../../http/deviceApi';
import { observer } from 'mobx-react-lite';


const ModalDevice = observer(({show, onHide}) => {

    const {devices} = useContext(Context)

    useEffect(() => {
        fetchBrand().then(data => devices.setBrand(data))
        fetchType().then(data => devices.setType(data))
    }, [])


    const [info, setInfo] = useState([])
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null) 
    const [name, setName] = useState('')

    const addInfo = () => {
        setInfo([...info, {title: '',description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const addFile = e => {
        setFile(e.target.files[0])
    }

    const changingInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('TypeId', devices.SelectedType.id)
        formData.append('BrandId', devices.SelectedBrand.id)
        formData.append('info', JSON.stringify(info))


        createDevice(formData).then(data => onHide())
    }

    return (  
        <Modal
            size="lg"
            show = {show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>{devices.SelectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                devices._types.map(type =>
                                    <Dropdown.Item onClick={() => devices.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>{devices.SelectedBrand.name || 'Выберите брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                devices._brands.map(brand =>
                                    <Dropdown.Item onClick={() => devices.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value = {name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название"
                    />
                    <Form.Control
                        value = {price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        type='number' 
                        placeholder="Введите цену"
                    />
                    <Form.Control
                        onChange={addFile}
                        className="mt-3"
                        type="file"
                    />
                    <hr/>
                    <Button 
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить свойство
                    </Button>
                    {
                        info.map(i => 
                                <div className="d-flex m-3" key={i.number}>
                                    <Col md = {4}>
                                        <Form.Control value={i.title} onChange={(e) => changingInfo('title', e.target.value, i.number)} placeholder="Введите название"></Form.Control>
                                    </Col>
                                    <Col md = {4}>
                                        <Form.Control value={i.description} onChange={(e) => changingInfo('description', e.target.value, i.number)} placeholder="Введите свойство"></Form.Control>
                                    </Col>
                                    <Col className="d-flex justify-content-center" md = {4}>
                                        <Button onClick={() => removeInfo(i.number)}>Удалить</Button>
                                    </Col>
                                </div>
                            )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default ModalDevice;