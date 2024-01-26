import React, {useEffect, useState} from 'react';
import {findById} from "../service/productService";
import {useParams} from "react-router";

export function ProductDetail() {
    const param = useParams()
    const [byId, setFindById] = useState(null)

    useEffect(() => {
        const getId = async () => {
            const rs = await findById(param.id)
            setFindById(rs.data)
        }
        getId()
    }, [param.id])
    if (!byId) {
        return null
    }
    return (
        <div>
            <h1>Detail Product</h1>
            <table className='table table-primary' border='5px'>
                <tbody>
                <tr>
                    <th>id</th>
                    <th>{byId.id}</th>
                </tr>
                <tr>
                    <th>name</th>
                    <th>{byId.name}</th>
                </tr><tr>
                    <th>title</th>
                    <th>{byId.title}</th>
                </tr>
                <tr>
                    <th>price</th>
                    <th>{byId.price}</th>
                </tr>
                <tr>
                    <th>Type</th>
                    <th>{(byId.type_product_id_type===1)? 'Gold':'diamon'}</th>
                </tr>
                </tbody>

            </table>

        </div>
    );
}

export default ProductDetail;