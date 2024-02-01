import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllPost} from "../redux/action/posts";

function PostsList() {
    const listPost = useSelector(state => state.posts);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPost())
    }, [])

    return (
        <div>
            <h2 style={{textAlign: "center"}}>List Posts</h2>
            <div className='text-right' style={{textAlignLast: 'right'}}>
                <NavLink to='/create' className='btn btn-primary'>Create</NavLink>

            </div>
            <table className='table table-sniper' border={1}>
                <thead className='table-primary'>
                <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>SLUG</th>
                    <th>CATEGORY</th>
                    <th>Thumbnail URL</th>
                </tr>
                </thead>
                <tbody>
                {listPost.map((value, index) => (
                    <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.title}</td>
                        <td>{value.slug}</td>
                        <td>{value.category}</td>
                        <td>{value.thumbnail_url}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PostsList;