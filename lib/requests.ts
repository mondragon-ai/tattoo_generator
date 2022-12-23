export const impoweredRequest = async (
    url: string,
    method: string,
    headers: {},
    data: any
) => {
    console.log(" => [URL]")
    console.log(url)
    console.log(" => [METHOD]")
    console.log(method)
    console.log(" => [HEADERS]")
    console.log(headers)
    console.log(" => [DATA]")
    console.log(data)

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
            // result = {message: "Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system."}
            alert("ERROR: " + response.status)
            console.log(await response.text())
            throw new Error(" - Fetch Error");
        }
    }

    return result;

}