import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


const baseURL = "https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet";
const priceURL = "https://api.coingecko.com/api/v3/simple/price?ids=the-graph&vs_currencies=usd";


async function getNetworkStats() {
    const query = `
{
  graphNetworks(first: 1) {
    totalTokensAllocated
    delegationRatio
  }
}
  `;
    const res = await axios.post(baseURL, {query});
    return parseFloat(((res.data.data.graphNetworks[0].totalTokensAllocated) / Math.pow(10, 18)).toFixed(2));
}

async function loadNetworkData(setTotalTokensAllocated) {
    const networkStats = await getNetworkStats();
    setTotalTokensAllocated(networkStats)
    console.log("Done now")

}


async function getIndexerStats(address) {
    const query = `
{
  indexer(id: "${address}") {
    indexingRewardCut
    queryFeeCut
    stakedTokens
    delegatedTokens
    queryFeesCollected
    rewardsEarned
  }
}
  `;
    const res = await axios.post(baseURL, {query});
    return res.data;
}

async function getPriceStats() {
    const res = await axios.get(priceURL);
    return res.data;
}

async function loadIndexerData(address) {
    const indexerStats = await getIndexerStats(address);
    return indexerStats.data.indexer;
}


async function getPriceInUsd() {
    const priceStats = await getPriceStats();
    return priceStats["the-graph"].usd;
}


function App() {

    const button = document.getElementById('button');

    const load = async () => {

            // button.addEventListener('click', () => {
                console.log('Calculating...');
                // show loader
        if (button)
                button.classList.add('loading');

                // set timeout
                setTimeout(computeResults, 5000);

            // });
    }

    const [totalTokensAllocated, setTotalTokensAllocated] = useState([]);


    useEffect(() => {
        // Runs ONCE after initial rendering
        loadNetworkData(setTotalTokensAllocated);

    }, []);

    const computeResults = async () => {


        console.log("loading");
        const amount = parseFloat(document.getElementById("amount").value);
        const addressVar = document.getElementById("address").value;
        console.log(addressVar)

        console.log("amount");
        console.log();
        if ((!amount) || (!addressVar)) {
            alert("Please enter Proper Values");
            if (button)
                button.classList.remove('loading');

            document.getElementById("monthlyPayment").innerHTML = "GRT";

            document.getElementById("totalInterest").innerHTML = "%";
            document.getElementById("totalPayment").innerHTML = "$ ";
            //return
            return (
                <body>
                <section className="section">
                    <div className="container">
                        <br/>
                        <br/>
                        <br/>
                        <div className="content">
                            <h1> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ⭐ <u> GRT Delegation Rewards Calculator </u> ⭐  </h1>



                        </div>
                        <br/>

                        <div className="columns">
                            <div className="column is-three-quarters">
                                <div className="card">
                                    <div className="card-content">
                                        <form id="loan-form">
                                            <div className="level">
                                                {/*// <!-- Left side -->*/}
                                                <div className="level-left is-marginless">
                                                    <div className="level-item">
                                                        <p className="number">1</p>
                                                        <h1> <b>Amount of GRT</b>   </h1>
                                                    </div>
                                                </div>

                                                {/*// <!-- Right side -->*/}
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control has-icons-left ">
                                                                <input className="input" id="amount" type="number"/>
                                                                <span className="icon is-small is-left">
                              <i className="fa fa-dollar-sign"></i>
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="level">
                                                {/*// <!-- Left side -->*/}
                                                <div className="level-left is-marginless">
                                                    <div className="level-item">
                                                        <p className="number">2</p>
                                                        <h1><b> Address of Indexer</b></h1>
                                                    </div>
                                                </div>

                                                {/*// <!-- Right side -->*/}
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control has-icons-left">
                                                                <input className="input" id="address" type="text"/>
                                                                {/*<input className="input" id="address" type="text" onChange={e => loadIndexerData(e.target.value,setIndexerData)} />*/}
                                                                <span className="icon is-small is-left">
                              <i className="fa fa-home"></i>
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="my-button" className="control">
                                                <button
                                                    className="button is-large is-fullwidth is-primary is-outlined"
                                                    type={"button"}
                                                >
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*// <!-- RESULTS -->*/}
                <section className="section">
                    <h1 className="title ">Calculated Rewards</h1>
                    <div className="columns is-multiline">

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-primary has-text">
                                <p id="monthlyPayment" className="title is-1">GRT</p>
                                <p className="subtitle is-4">Monthly Rewards in GRT</p>
                            </div>
                        </div>

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-info has-text">
                                <p id="totalInterest" className="title is-1">%</p>
                                <p className="subtitle is-4">Estimated APY</p>
                            </div>
                        </div>

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-link has-text">
                                <p id="totalPayment" className="title is-1">$</p>
                                <p className="subtitle is-4">Monthly Amount in USD</p>
                            </div>
                        </div>

                    </div>
                </section>


                </body>
            );
        }


        const indexerStats = await (loadIndexerData(addressVar));

        // check if indexer stats is null
        if (!indexerStats) {
            alert("Please enter the correct Indexer Address");
            if (button)
                button.classList.remove('loading');

            document.getElementById("monthlyPayment").innerHTML = "GRT";

            document.getElementById("totalInterest").innerHTML = "%";
            document.getElementById("totalPayment").innerHTML = "$ ";
            //return
            return (
                <body>
                <section className="section">
                    <div className="container">
                        <br/>
                        <br/>
                        <br/>
                        <div className="content">
                            <h1> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ⭐ <u> GRT Delegation Rewards Calculator </u> ⭐  </h1>



                        </div>
                        <br/>

                        <div className="columns">
                            <div className="column is-three-quarters">
                                <div className="card">
                                    <div className="card-content">
                                        <form id="loan-form">
                                            <div className="level">
                                                {/*// <!-- Left side -->*/}
                                                <div className="level-left is-marginless">
                                                    <div className="level-item">
                                                        <p className="number">1</p>
                                                        <h1> <b>Amount of GRT</b>   </h1>
                                                    </div>
                                                </div>

                                                {/*// <!-- Right side -->*/}
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control has-icons-left ">
                                                                <input className="input" id="amount" type="number"/>
                                                                <span className="icon is-small is-left">
                              <i className="fa fa-dollar-sign"></i>
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="level">
                                                {/*// <!-- Left side -->*/}
                                                <div className="level-left is-marginless">
                                                    <div className="level-item">
                                                        <p className="number">2</p>
                                                        <h1><b> Address of Indexer</b></h1>
                                                    </div>
                                                </div>

                                                {/*// <!-- Right side -->*/}
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control has-icons-left">
                                                                <input className="input" id="address" type="text"/>
                                                                {/*<input className="input" id="address" type="text" onChange={e => loadIndexerData(e.target.value,setIndexerData)} />*/}
                                                                <span className="icon is-small is-left">
                              <i className="fa fa-home"></i>
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="my-button" className="control">
                                                <button
                                                    className="button is-large is-fullwidth is-primary is-outlined"
                                                    type={"button"}
                                                >
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*// <!-- RESULTS -->*/}
                <section className="section">
                    <h1 className="title ">Calculated Rewards</h1>
                    <div className="columns is-multiline">

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-primary has-text">
                                <p id="monthlyPayment" className="title is-1">GRT</p>
                                <p className="subtitle is-4">Monthly Rewards in GRT</p>
                            </div>
                        </div>

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-info has-text">
                                <p id="totalInterest" className="title is-1">%</p>
                                <p className="subtitle is-4">Estimated APY</p>
                            </div>
                        </div>

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-link has-text">
                                <p id="totalPayment" className="title is-1">$</p>
                                <p className="subtitle is-4">Monthly Amount in USD</p>
                            </div>
                        </div>

                    </div>
                </section>


                </body>
            );


        }
        const price = await (getPriceInUsd());
        const priceInUsd = parseFloat(price);
        console.log(priceInUsd);

        console.log(indexerStats);

        const indexingRewardCut = parseFloat(indexerStats.indexingRewardCut) / Math.pow(10, 4).toFixed(2);

        const queryFeeCut = parseFloat(indexerStats.queryFeeCut) / Math.pow(10, 4).toFixed(2);
        const indexerStakedTokens = parseFloat(((indexerStats.stakedTokens) / Math.pow(10, 18)).toFixed(2));
        const delegatedTokens = parseFloat(((indexerStats.delegatedTokens) / Math.pow(10, 18)).toFixed(2));
        console.log(delegatedTokens);
        console.log(indexerStakedTokens);

        const totalIndexerAllocation = indexerStakedTokens + delegatedTokens;
        console.log(totalIndexerAllocation);


        const monthlyProtocolRewards = parseFloat("25000000");
        console.log(monthlyProtocolRewards);


        const totalRewards = ((totalIndexerAllocation / totalTokensAllocated) * monthlyProtocolRewards).toFixed(2);
        console.log(totalRewards);

        //check overdelegation
        const delegationRatio = delegatedTokens / indexerStakedTokens;
        if (delegationRatio > 16) {
            alert("This Indexer is overdelegated, Don't Delegate to this Indexer !!")
            if (button)
                button.classList.remove('loading');

            document.getElementById("monthlyPayment").innerHTML = "GRT";
            document.getElementById("totalInterest").innerHTML = "%";
            document.getElementById("totalPayment").innerHTML = "$ ";


            return (
                <body>
                <section className="section">
                    <div className="container">
                        <br/>
                        <br/>
                        <br/>
                        <div className="content">
                            <h1> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ⭐ <u> GRT Delegation Rewards Calculator </u> ⭐  </h1>


                        </div>
                        <br/>

                        <div className="columns">
                            <div className="column is-three-quarters">
                                <div className="card">
                                    <div className="card-content">
                                        <form id="loan-form">
                                            <div className="level">
                                                {/*// <!-- Left side -->*/}
                                                <div className="level-left is-marginless">
                                                    <div className="level-item">
                                                        <p className="number">1</p>
                                                        <h1> <b>Amount of GRT</b>   </h1>
                                                    </div>
                                                </div>

                                                {/*// <!-- Right side -->*/}
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control has-icons-left ">
                                                                <input className="input" id="amount" type="number"/>
                                                                <span className="icon is-small is-left">
                              <i className="fa fa-dollar-sign"></i>
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="level">
                                                {/*// <!-- Left side -->*/}
                                                <div className="level-left is-marginless">
                                                    <div className="level-item">
                                                        <p className="number">2</p>
                                                      <h1><b> Address of Indexer</b></h1>
                                                    </div>
                                                </div>

                                                {/*// <!-- Right side -->*/}
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className="field">
                                                            <div className="control has-icons-left">
                                                                <input className="input" id="address" type="text"/>
                                                                {/*<input className="input" id="address" type="text" onChange={e => loadIndexerData(e.target.value,setIndexerData)} />*/}
                                                                <span className="icon is-small is-left">
                              <i className="fa fa-home"></i>
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="my-button" className="control">
                                                <button
                                                    className="button is-large is-fullwidth is-primary is-outlined"
                                                    type={"button"}
                                                >
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*// <!-- RESULTS -->*/}
                <section className="section">
                    <h1 className="title ">Calculated Rewards</h1>
                    <div className="columns is-multiline">

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-primary has-text">
                                <p id="monthlyPayment" className="title is-1">GRT</p>
                                <p className="subtitle is-4">Monthly Rewards in GRT</p>
                            </div>
                        </div>

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-info has-text">
                                <p id="totalInterest" className="title is-1">%</p>
                                <p className="subtitle is-4">Estimated APY</p>
                            </div>
                        </div>

                        <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                            <div className="notification is-link has-text">
                                <p id="totalPayment" className="title is-1">$</p>
                                <p className="subtitle is-4">Monthly Amount in USD</p>
                            </div>
                        </div>

                    </div>
                </section>


                </body>
            );
            // pop up
        }
        console.log("hgfhgffghfh")

        const yourDelegationShare = (((amount / delegatedTokens) * (100 - indexingRewardCut) * totalRewards) / 100).toFixed(2);
        console.log(yourDelegationShare);

        const yearlyDelegationProfit = yourDelegationShare * 12
        const apy = ((yearlyDelegationProfit / amount) * 100).toFixed(2);
        const monthlyAmountInUsd = (yourDelegationShare * priceInUsd).toFixed(2);


        document.getElementById("monthlyPayment").innerHTML = yourDelegationShare + " GRT";

        document.getElementById("totalInterest").innerHTML = apy + " %";
        document.getElementById("totalPayment").innerHTML = "$ " + monthlyAmountInUsd;
        if (button)
        button.classList.remove('loading');

    }


    return (
        <body>
        <section className="section">
            <div className="container">
                <br/>
                <br/>
                <br/>
                <div className="content">
                    <h1> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ⭐ <u> GRT Delegation Rewards Calculator </u> ⭐  </h1>

                </div>
            <br/>

                <div className="columns">
                    <div className="column is-three-quarters">
                        <div className="card">
                            <div className="card-content">
                                <form id="loan-form">
                                    <div className="level">
                                        {/*// <!-- Left side -->*/}
                                        <div className="level-left is-marginless">
                                            <div className="level-item">
                                                <p className="number">1</p>
                                                <h1> <b>Amount of GRT</b>   </h1>
                                            </div>
                                        </div>

                                        {/*// <!-- Right side -->*/}
                                        <div className="level-right">
                                            <div className="level-item">
                                                <div className="field">
                                                    <div className="control has-icons-left ">
                                                        <input className="input" id="amount" type="number"/>
                                                        <span className="icon is-small is-left">
                              <i className="fa fa-dollar-sign"></i>
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="level">
                                        {/*// <!-- Left side -->*/}
                                        <div className="level-left is-marginless">
                                            <div className="level-item">
                                                <p className="number">2</p>
                                                <h1><b> Address of Indexer</b></h1>
                                            </div>
                                        </div>

                                        {/*// <!-- Right side -->*/}
                                        <div className="level-right">
                                            <div className="level-item">
                                                <div className="field">
                                                    <div className="control has-icons-left">
                                                        <input className="input" id="address" type="text"/>
                                                        {/*<input className="input" id="address" type="text" onChange={e => loadIndexerData(e.target.value,setIndexerData)} />*/}
                                                        <span className="icon is-small is-left">
                              <i className="fa fa-home"></i>
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="my-button" className="control">
                                        <button id="button"
                                                className="button is-large is-fullwidth is-primary is-outlined"
                                                type={"button"} onClick={load}
                                        >
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*// <!-- RESULTS -->*/}
        <section className="section">
            <h1 className="title ">Calculated Rewards</h1>
            <div className="columns is-multiline">

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-primary has-text">
                        <p id="monthlyPayment" className="title is-1">GRT</p>
                        <p className="subtitle is-4">Monthly Rewards in GRT</p>
                    </div>
                </div>

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-info has-text">
                        <p id="totalInterest" className="title is-1">%</p>
                        <p className="subtitle is-4">Estimated APY</p>
                    </div>
                </div>

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-link has-text">
                        <p id="totalPayment" className="title is-1">$</p>
                        <p className="subtitle is-4">Monthly Amount in USD</p>
                    </div>
                </div>

            </div>
        </section>



        </body>
    );
}

export default App;
