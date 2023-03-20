import React, {useContext} from "react";
import { ListGroup } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { Context } from './../index';


const TypeBar = observer(() => {
    const { devices } = useContext(Context)
    return ( 
        <ListGroup className="mt-3">
            {
                devices._types.map(type =>
                        <ListGroup.Item
                            active = {type.id === devices.SelectedType.id}
                            style={{cursor: 'pointer'}} 
                            onClick={() => devices.setSelectedType(type)} 
                            key={type.id}>
                                {type.name}
                        </ListGroup.Item>
                    )
            }
        </ListGroup>
    );
})

export default TypeBar;