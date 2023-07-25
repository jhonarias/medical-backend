import { Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { UserRequest } from "../interfaces/user-response.interface";

const getOrders = (req: UserRequest, res: Response) => {
  try {
    res.send({ data: [], user: req.user });
  } catch (e) {
    handleHttp(res, "ERROR getOrders");
  }
};

export { getOrders };
