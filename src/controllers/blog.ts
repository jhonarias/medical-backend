import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getBlog = (req: Request, res: Response) => {
    try {
    } catch (e) {
        handleHttp(res, "ERROR getBlog");
    }
}

const getBlogs = (req: Request, res: Response) => {
    try {
        res.send("hola");
    } catch (e) {
        handleHttp(res, "ERROR getBlogs");
    }
}


const postBlog = ({ body }: Request, res: Response) => {
    try {
        res.send(body);
    } catch (e) {
        handleHttp(res, "ERROR postBlog");
    }
}

const updateBlog = ({ body }: Request, res: Response) => {
    try {
        res.send(body);
    } catch (e) {
        handleHttp(res, "ERROR updateBlog");
    }
}

const deleteBlog = (req: Request, res: Response) => {
    try {

    } catch (e) {
        handleHttp(res, "ERROR deleteBlog");
    }
}

export { getBlog, getBlogs, postBlog, updateBlog, deleteBlog };