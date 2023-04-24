export async function CallRpcWithPayload(endpoint, port, token, requestData) {
    if (!endpoint.startsWith("http")) {
        endpoint = "http://" + endpoint;
    }

    const url = `http://cors-proxy.kingsuper.services/?targetApi=${encodeURIComponent(`${endpoint}:${port}`)}`;


    const options = {
        method: "POST", headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        }, body: JSON.stringify(requestData),
    };


    const response = await fetch(url, options);
    const data = await response.json();
    console.log("data", data);
    return data;
}
