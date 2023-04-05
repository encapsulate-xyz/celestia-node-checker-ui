import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data.result
}

export async function getAccountAddress(endpoint, port, token) {
    const requestData = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "state.AccountAddress",
        "params": []
    }
    const data = await CallRpcWithPayload(endpoint, port, token, requestData)
    return await processData(data);
}
