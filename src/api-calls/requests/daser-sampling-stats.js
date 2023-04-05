import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    const dasSamplingStats = data.result
    if (dasSamplingStats) {
        return {
            headOfSampledChain: dasSamplingStats.head_of_sampled_chain,
            headOfCatchup: dasSamplingStats.head_of_catchup,
            networkHeadHeight: dasSamplingStats.network_head_height,
            concurrency: dasSamplingStats.concurrency,
            catchUpStatus: booleanToDoneInProgress(dasSamplingStats.catch_up_done),
            isRunning: booleanToYesNo(dasSamplingStats.is_running)
        }
    }
    return null
}

export async function getSamplingStats(endpoint, port, token) {
    const requestData = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "das.SamplingStats",
        "params": []
    }
    const data = await CallRpcWithPayload(endpoint, port, token, requestData)
    return await processData(data);
}


function booleanToDoneInProgress(value) {
    console.log("booleanToDoneInProgress", value)
    return value ? "Done" : "In progress";
}

function booleanToYesNo(value) {
    console.log("booleanToYesNo", value)
    return value ? "Yes" : "No";
}
