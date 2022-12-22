// import { db } from "../firebase"

export const createDocumentWithID = async (
    collection: string,
    doc_uuid: string,
    data: any
) => {
    // Data for validation in parent
    let text = "SUCCESS: Document Created 👍🏻 ", status = 200;

    let response; 

    try {
        // response = await db
        // .collection(collection)
        // .doc(doc_uuid)
        // .set({
        //     ...data,
        //     id: doc_uuid
        // });
    } catch {
        text = " - Could not create document.";
        status = 400;
    }

    // return either result 
    return {
        text: text,
        status: status,
        data: {
            id: doc_uuid,
            document: response ? response : null
        }
    }
}