import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return parseInt(data.result.length)
}

export async function getPeers(endpoint, port, token) {
    const requestData = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "p2p.Peers",
        "params": []
    }
    const data = await CallRpcWithPayload(endpoint, port, token, requestData)
    return await processData(data);
}
