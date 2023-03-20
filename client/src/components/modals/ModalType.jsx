import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { createType } from "../../http/deviceApi";

function ModalType({show, onHide}) {

    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => {
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введите название типа"
                    >
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-success'} onClick={addType}>Добавить</Button>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalType;