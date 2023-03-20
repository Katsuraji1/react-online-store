import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { createBrand } from './../../http/deviceApi';

function ModalBrand({show, onHide}) {

    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onHide()
        })
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
                    Добавить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введите название брэнда"
                    >
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-success'} onClick={addBrand}>Добавить</Button>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalBrand;