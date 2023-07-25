import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { insertItem,
    getItems as getItemsService,
    getItem as getItemService,
    updateItem as updateItemService,
    removeItem as removeItemService
} from "../services/item";

const getItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getItemService(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR getItem");
    }
}

const getItems = async (req: Request, res: Response) => {
    try {
        const response = await getItemsService();
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR getItems");
    }
}

const postItem = async ({ body }: Request, res: Response) => {
    try {
        const response = await insertItem(body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR postItem", e);
    }
}

const updateItem = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await updateItemService(id, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR updateItem");
    }
}

const deleteItem = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await removeItemService(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR deleteItem");
    }
}

export { getItem, getItems, postItem, updateItem, deleteItem };