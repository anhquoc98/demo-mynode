import request from "../http-common";
const findAll = () => {
    return request.get(`/posts`);
}
const save = (post) => {
    return request.post(`/posts`, post);
}
export const postService = {
    findAll,
    save
}