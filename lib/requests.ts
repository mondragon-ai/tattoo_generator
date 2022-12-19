export const impoweredRequest = async (
    url: string,
    method: string,
    headers: {},
    data: any
) => {

    let result = null;

    if (method == "GET") {
        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });
        if (response.ok) {
            result = await response.json();
        } else {
            throw new Error(" - Fetch Error");
        }
    } else {
        const response = await fetch(url, {
            method: method != "" ? method : "GET",
            headers: headers,
            body: JSON.stringify(data)
        });
        if (response.ok) {
            result = await response.json();
        } else {
            result = {message: "Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system."}
            throw new Error(" - Fetch Error");
        }
    }

    return result;

}