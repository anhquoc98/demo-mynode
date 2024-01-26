import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {findById, update} from "../service/productService";
import {useNavigate, useParams} from "react-router";
import * as Yup from "yup";

export function ProductEdit() {
    let navigate = useNavigate()
    let param = useParams()
    const [seachById, setSeachById] = useState(null)
    
    useEffect(() => {
        const getId = async () => {
            const rs = await findById(param.id)
            setSeachById(rs.data)
        }
        getId()
    }, [param.id])
    if (!seachById) {
        return null
    }


    return (
        <div>
            <h1>Update</h1>
            <Formik initialValues={{
                id: seachById.id,
                title: seachById.title,
                name: seachById.name,
                price: seachById.price,
                type_product_id_type:1

            }}
                    validationSchema={Yup.object({
                        title: Yup.string().required("không được để trống"),
                        name: Yup.string().required("không được để trống"),
                        price: Yup.number().required("không được để trống   "),

                    })}
                    onSubmit={(values) => {
                        const updatea = async () => {
                            await update(values)
                            console.log(values)
                            alert('thành công')
                            navigate('/')

                        }
                        updatea()
                    }
                    }>
                <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd' }}>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">Name</label>
                        <Field className="form-control border-2" type='text' name='name'/>
                        <ErrorMessage name='name' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </div>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">Title</label>
                        <Field className="form-control" type='text' name='title'/>
                        <ErrorMessage name='title' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />


                    </div>
                    <div className='mb-3'>
                        <label className="form-label" htmlFor="">price</label>
                        <Field className="form-control" type='text' name='price'/>
                        <ErrorMessage name='price' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />

                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>

                </Form>
            </Formik>
        </div>
    );
}

export default ProductEdit;