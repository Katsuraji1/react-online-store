import React, {useContext} from "react";
import { Context } from './../index';
import { Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const BrandBar = observer(() => {
    const { devices } = useContext(Context)
    return (  
        <div className="d-flex mt-3 flex-wrap">
            {
                devices._brands.map(brand =>
                    <Card
                        border={brand.id === devices.SelectedBrand.id ? 'danger' : 'light'}
                        style={{cursor: 'pointer'}} 
                        key = {brand.id} 
                        className="p-2"
                        onClick={() => devices.setSelectedBrand(brand)}
                    >
                        {brand.name}
                    </Card>    
                )
            }
        </div>
    );
})

export default BrandBar;