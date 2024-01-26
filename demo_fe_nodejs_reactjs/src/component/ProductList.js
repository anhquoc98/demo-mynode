import React, {useEffect, useState} from 'react';
import {findAll, findByName, remove} from "../service/productService";
import {Link, NavLink} from "react-router-dom";
import Swal from "sweetalert2";
import {Field, Formik} from "formik";


export function ProductList() {
    const [productList, setProductList] = useState([]);
    const [idDelete, setIdDelete] = useState(null)
    const [name, setName] = useState(null)
    useEffect(() => {
        const getAll = async () => {
            let result = await findAll();
            setProductList(result.data)
        }
        getAll()
    }, [])

    function handleDelete(id, name) {
        setName(name)
        setIdDelete(id)
    }

    async function deletePost() {
        await remove(idDelete)
        let rs = await findAll();
        Swal.fire({
            title: 'Thành công!',
            text: 'Đã xóa sản phẩm thành công',
            icon: 'success'
        })
        setProductList(rs.data)
    }


    return (
        <div>
            <h1 className='text-center'>Product</h1>
            <NavLink className='btn btn-outline-primary m-2' to='/create'>Create</NavLink>
            <NavLink className='btn btn-outline-primary m-2' to='/send'>Send Email</NavLink>
            <div>
                {/*<Formik initialValues={{*/}
                {/*    name: ''*/}
                {/*}}*/}
                {/*        onSubmit={async (values) => {*/}

                {/*        }*/}
                {/*        }>*/}
                {/*    <Field type='text' name='name' place/>*/}
                {/*    <button type='submit'>Tìm kiếm</button>*/}
                {/*</Formik>*/}
            </div>
            <table className='table table-danger'>
                <thead>
                <tr className='table-dark'>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    productList.map((value, index) => (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{value.name}</td>
                            <td>{value.title}</td>
                            <td>{value.price}</td>
                            <td>{value.nameType}</td>
                            <td>
                                <button type="button" className="btn btn-danger m-1" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => handleDelete(value.id, value.name)}>
                                    Delete
                                </button>
                                <Link to={`/edit/${value.id}`} className='btn btn-primary m-1'>Edit</Link>
                                <Link to={`/detail/${value.id}`} className='btn btn-primary m-1'>Detail</Link>

                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {/*modal*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color:"red"}}>Delete</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Delete product {name}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={deletePost}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;