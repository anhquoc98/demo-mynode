import axios from "axios";

export const findAll = async () => {
    try {
        return await axios.get(`http://localhost:8080/join`)

    } catch (e) {
        console.log(e)
    }
}

export const save = async (product) => {
    try {
        await axios.post(`http://localhost:8080/create`, {...product})
    } catch (e) {
        console.log(e)
    }
}

export const remove = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/delete/${id}`)
    } catch (e) {
        console.log(e)
    }
}


export const findById = async (id) => {
    try {
        return await axios.get(`http://localhost:8080/product/${id}`);
    } catch (e) {
        console.log(e)
    }
}

export const findByName = async (name) => {
    try {
        return await axios.get(`http://localhost:8080/name/${name}`);
    } catch (e) {
        console.log(e)
    }
}

export const update = async (product) => {
    try {
        await axios.post(`http://localhost:8080/update/${product.id}`, {...product})
    } catch (e) {
        console.log(e)
    }
}

export const sendGmail =async (email)=>{
    try {
        await axios.post(`http://localhost:8080/users`,{...email})
    }catch (e){
        console.log(e)
    }
}