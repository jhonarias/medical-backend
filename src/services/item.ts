import { Car } from "../interfaces/card.interface";
import ItemModel from "../models/item";

const insertItem = async (item: Car) => {
    const response = await ItemModel.create(item);
    return response;
};

const getItems = async () => {
    const response = await ItemModel.find({});
    return response;
}

const getItem = async (_id: string) => {
    const response = await ItemModel.findOne({_id});
    return response;
}

const updateItem = async (_id: string, data: Car) => {
    const response = await ItemModel.findOneAndUpdate(
        {_id},
        data,
        { new: true }
    );
    return response;
}

const removeItem = async (_id: string) => {
    const response = await ItemModel.findOneAndRemove({_id});
    return response;
}

export { insertItem, getItems, getItem, updateItem, removeItem };