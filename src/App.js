import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';



// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// Variables to change when coding this app for something else
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

const textField = "Node IP"
const numField = "RPC Port"


const textFieldNumber = "1"
const numFieldNumber = "2"


const Box1Text = "Node Version"
const Box2Text = "Sync Percentage"
const Box3Text = "Node TPS"



const Box1Suffix = " ℹ️"
const Box2Suffix = " 📩"
const Box3Suffix = " ⚡"


const appTitle = "Sui Node Health Checker"
const resultRowTitle = "Sui Node Health Checker"

const backendUrl = "https://web-backend.scale3production.com"
const backendApiFailureMessage = "Unable to reach the node"


// ---------------------------------------------------------------------------------------------------------------------------------------------------------

async function loadNetworkData(setTotalTokensAllocated) {
    setTotalTokensAllocated("networkStats")
    console.log("Done now")

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
                setTimeout(computeResults, 7000);

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

            document.getElementById("monthlyPayment").innerHTML = Box1Suffix;

            document.getElementById("totalInterest").innerHTML = Box2Suffix
            document.getElementById("totalPayment").innerHTML = Box3Suffix;
            //return
            return returnApp()
        }

        // const response = await axios.get(`${IP}/peggo?lcd=https://umee-api.polkachu.com&orchAddress=${addressVar}`);
        const response = await axios.get(`${backendUrl}/v1/sui_node_check?network_type=devnet&url=${addressVar}:${amount}`);
        let result = response.data
        console.log(result)



        // check if indexer stats is null
        if (!result || !result.node_total_transactions) {
            alert(`${backendApiFailureMessage}`);
            if (button)
                button.classList.remove('loading');

            document.getElementById("monthlyPayment").innerHTML = Box1Suffix;

            document.getElementById("totalInterest").innerHTML = Box2Suffix
            document.getElementById("totalPayment").innerHTML = Box3Suffix;
            //return
            return returnApp()
        }

        const syncPercentage = ((parseFloat(result.node_total_transactions) * 100) / parseFloat(result.network_total_transactions)).toFixed(0);


        document.getElementById("monthlyPayment").innerHTML = result.node_version + " " + Box1Suffix;

        document.getElementById("totalInterest").innerHTML = syncPercentage + " % " + Box2Suffix;
        document.getElementById("totalPayment").innerHTML = result.node_tps + " " + Box3Suffix;
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
                    <h1> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ⭐ <u> {appTitle} </u> ⭐  </h1>

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
                                                <p className="number">{textFieldNumber}</p>
                                                <h1><b>{textField}</b></h1>
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
                                    <div className="level">
                                        {/*// <!-- Left side -->*/}
                                        <div className="level-left is-marginless">
                                            <div className="level-item">
                                                <p className="number">{numFieldNumber}</p>
                                                <h1> <b>{numField}</b>   </h1>
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
            <h1 className="title ">{resultRowTitle}</h1>
            <div className="columns is-multiline">

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-primary has-text">
                        <p id="monthlyPayment" className="title is-1">{Box1Suffix}</p>
                        <p className="subtitle is-4">{Box1Text}</p>
                    </div>
                </div>

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-info has-text">
                        <p id="totalInterest" className="title is-1">{Box2Suffix}</p>
                        <p className="subtitle is-4">{Box2Text}</p>
                    </div>
                </div>

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-link has-text">
                        <p id="totalPayment" className="title is-1">{Box3Suffix}</p>
                        <p className="subtitle is-4">{Box3Text}</p>
                    </div>
                </div>

            </div>
        </section>



        </body>
    );
}



function returnApp() {
    return (
        <body>
        <section className="section">
            <div className="container">
                <br/>
                <br/>
                <br/>
                <div className="content">
                    <h1> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ⭐ <u> {appTitle} </u> ⭐  </h1>

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
                                                <p className="number">2</p>
                                                <h1><b>{textField}</b></h1>
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
                                    <div className="level">
                                        {/*// <!-- Left side -->*/}
                                        <div className="level-left is-marginless">
                                            <div className="level-item">
                                                <p className="number">1</p>
                                                <h1> <b>{numField}</b>   </h1>
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
                                    <div id="my-button" className="control">
                                        <button id="button"
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
            <h1 className="title ">{resultRowTitle}</h1>
            <div className="columns is-multiline">

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-primary has-text">
                        <p id="monthlyPayment" className="title is-1">{Box1Suffix}</p>
                        <p className="subtitle is-4">{Box1Text}</p>
                    </div>
                </div>

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-info has-text">
                        <p id="totalInterest" className="title is-1">{Box2Suffix}</p>
                        <p className="subtitle is-4">{Box2Text}</p>
                    </div>
                </div>

                <div className="column is-12-tablet is-6-desktop is-3-widescreen">
                    <div className="notification is-link has-text">
                        <p id="totalPayment" className="title is-1">{Box3Suffix}</p>
                        <p className="subtitle is-4">{Box3Text}</p>
                    </div>
                </div>

            </div>
        </section>



        </body>
    );
}

export default App;
