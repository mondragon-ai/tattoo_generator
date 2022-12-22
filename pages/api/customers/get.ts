import { NextApiRequest, NextApiResponse } from "next";
import * as functions from "firebase-functions";
// import { getDocument } from "../../../lib/databse/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    functions.logger.debug(" ====>  Ready to fetch customer 👽 ");
    let status = 200,
        text = "SUCCESS: Customer fetched 👽",
        ok = true;

    const user_uuid = req.body.user_uuid;

    let response: any = null;

    try {

        // response = await getDocument("users", user_uuid);

        if (!response) throw new Error("Couldnt fetch document");
        
    } catch (error) {
        status = 400;
        text = "ERROR: Likely due to creating customer document in primary database 🤷🏻‍♂️";
        ok = false;
    }

        
    res.status(status).json({
        ok: ok,
        text: text,
        result: response
    })
}