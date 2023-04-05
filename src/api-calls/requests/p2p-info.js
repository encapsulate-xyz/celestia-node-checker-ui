import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data.result.ID
}

export async function getP2pInfo(endpoint, port, token) {
    const requestData = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "p2p.Info",
        "params": []
    }
    const data = await CallRpcWithPayload(endpoint, port, token, requestData)
    return await processData(data);
}
