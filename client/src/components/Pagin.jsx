import React, {useContext} from "react";
import { Pagination } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { Context } from './../index';

const Pagin = observer(() => {

    const {devices} = useContext(Context)
    const count = Math.ceil(devices.totalCount / devices.limit)

    const pages = []

    for(let i = 0; i< count; i++) {
        pages.push(i+1)
    }


    return (  
        <Pagination>
            {pages.map(i => 
                    <Pagination.Item 
                    active = {i === devices.page}
                    onClick={() => devices.setPage(i)}
                    key={i}>{i}</Pagination.Item>
                )}
        </Pagination>
    );
})

export default Pagin;