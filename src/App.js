import './App.css';
import './components/css/Button.css';
import React, {useState} from 'react';
import {getPeers} from './api-calls/requests/p2p-peers';
import {ReturnApp} from "./components/AppUI";
import config from './config';
import {getInfo, getP2pInfo} from "./api-calls/requests/p2p-info";
import {getLocalHead} from "./api-calls/requests/header-local-head";
import {getSamplingStats} from "./api-calls/requests/daser-sampling-stats";
import {getBalance} from "./api-calls/requests/state-balance";
import {getAccountAddress} from "./api-calls/requests/state-account-address";
import {getResourceState} from "./api-calls/requests/p2p-resource-state";
import {getProbabilityOfAvailability} from "./api-calls/requests/share-probability-of-availability";
import {getNodeInfo} from "./api-calls/requests/node-info";

function App() {
    const [loadOnClick, setLoadOnClick] = useState(false);
    const load = async () => {
        console.log('Calculating...');
        addLoadingClass();
        try {
            await new Promise(resolve => {
                setTimeout(computeResults, 2000); // Add a delay of 2 seconds
            });
        } catch (error) {
            console.error(error);
            handleError(config.backend.apiFailureMessage)
        } finally {
            removeLoadingClass();
        }
    };

    const addLoadingClass = () => {
        const button = document.getElementById('button');
        if (button) {
            button.classList.add('loading');
            const progress = document.createElement('div');
            progress.className = 'progress';
            button.appendChild(progress);
        }
    };

    const removeLoadingClass = () => {
        const button = document.getElementById('button');
        if (button) {
            button.classList.remove('loading');
            const progress = button.lastChild;
            if (progress instanceof Node) {
                button.removeChild(progress);
            }
        }
    };

    const computeResults = async () => {
        console.log('loading');
        let {ipAddress, port, authToken} = readInput();

        // todo: remove this: testing purpose
        // ipAddress = "165.232.182.75"
        // port = "26658"
        // authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.6Vt55wvPNw1uk5z0NB4ufPj-IOnR77pG7i0LjwtRkOU"


        console.log(ipAddress, port, authToken)

        if (!ipAddress || !port || !authToken) {
            handleError(config.missingValuesMessage);
            return;
        }

        try {
            const [
                peerCount,
                info,
                localHead,
                samplingStats,
                // balance,
                accountAddress,
                // resourceState,
                probabilityOfAvailability,
                apiVersion
            ] = await Promise.all([
                getPeers(ipAddress, port, authToken),
                getP2pInfo(ipAddress, port, authToken),
                getLocalHead(ipAddress, port, authToken),
                getSamplingStats(ipAddress, port, authToken),

                // getBalance(ipAddress, port, authToken),
                getAccountAddress(ipAddress, port, authToken),
                // getResourceState(ipAddress, port, authToken),
                getProbabilityOfAvailability(ipAddress, port, authToken),
                getNodeInfo(ipAddress, port, authToken)
            ]);


            console.log(`peerCount: ${peerCount}`)

            if ([peerCount, info, localHead, accountAddress, probabilityOfAvailability, samplingStats, apiVersion].some((value) => value === null || value === undefined || Number.isNaN(value))) {
                handleError(config.backend.apiFailureMessage);
                return;
            }

            updateUI(peerCount, info, localHead, accountAddress, probabilityOfAvailability, samplingStats, apiVersion);
            removeLoadingClass();
            setLoadOnClick(true);
        } catch (e) {
            console.log(config.backend.apiFailureMessage)
            handleError(config.backend.apiFailureMessage);
        }

    };

    const readInput = () => {
        const ipAddress = document.getElementById('field-0').value;
        const port = document.getElementById('field-1').value;
        const authToken = document.getElementById('field-2').value;

        return {ipAddress, port, authToken};
    };

    const handleError = (message) => {
        alert(message);
        removeLoadingClass();
    };

    const updateUI = (peerCount, info, localHead, accountAddress, probabilityOfAvailability, samplingStats, apiVersion) => {
        document.getElementById('resultBox-0').innerHTML = info
        document.getElementById('resultBox-1').innerHTML = accountAddress
        document.getElementById('resultBox-2').innerHTML = localHead
        document.getElementById('resultBox-3').innerHTML = peerCount
        document.getElementById('resultBox-4').innerHTML = probabilityOfAvailability
        document.getElementById('resultBox-5').innerHTML = samplingStats.isRunning
        document.getElementById('resultBox-6').innerHTML = samplingStats.catchUpStatus
        document.getElementById('resultBox-7').innerHTML = samplingStats.headOfCatchup
        document.getElementById('resultBox-8').innerHTML = samplingStats.networkHeadHeight
        document.getElementById('resultBox-9').innerHTML = apiVersion
    };

    return (<ReturnApp load={load} config={config}/>);
}

export default App;
