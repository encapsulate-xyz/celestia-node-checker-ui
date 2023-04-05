import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data.result.api_version
}

export async function getNodeInfo(endpoint, port, token) {
    const requestData = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "node.Info",
        "params": []
    }
    const data = await CallRpcWithPayload(endpoint, port, token, requestData)
    return await processData(data);
}
