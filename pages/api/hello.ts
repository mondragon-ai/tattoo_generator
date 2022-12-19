// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}


// import * as express from "express";
// import * as cors from "cors";

// // import Routes 


// export const rest = (db: FirebaseFirestore.Firestore) => {
//     const bearer = require("express-bearer-token");
//     const bodyParser = require("body-parser");
//     const app = express();

//     app.use( bearer());
//     app.use( bodyParser.urlencoded({ extended: false}));
//     app.use( express.json());
//     app.use(cors({ origin: true}));
    

//     return app
// }