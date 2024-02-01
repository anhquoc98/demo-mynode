import {postService} from "../../service/postsService";
import {CREATE_POST, GET_ALL_POST} from "./types";

export const getAllPost =()=> async (dispatch)=>{
    try{
        const res =await postService.findAll()
        dispatch({
            type :GET_ALL_POST,
            payload :res.data
        })
    }catch (e){
        console.log(e)
    }
}

export const createPosts =(posts)=> async (dispatch)=>{
    try{
        const res =await postService.save(posts)
        dispatch({
            type :CREATE_POST,
            payload :res.data
        })
    }catch (e){
        console.log(e)
    }
}