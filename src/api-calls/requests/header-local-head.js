import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return parseInt(data.result.header.height)
}

export async function getLocalHead(endpoint, port, token) {
    const requestData = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "header.LocalHead",
        "params": []
    }
    const data = await CallRpcWithPayload(endpoint, port, token, requestData)
    return await processData(data);
}
