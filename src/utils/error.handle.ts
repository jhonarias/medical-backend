import { Response } from "express";

const handleHttp = (res: Response, error: any, errorRaw?: any, errorCode = 500) => {
    console.log(errorRaw);
    res.status(errorCode);
    res.send(error);
}

export { handleHttp };