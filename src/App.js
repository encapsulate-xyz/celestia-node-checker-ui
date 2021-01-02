import logo from './logo.svg';
import './App.css';

function App() {





  return (
      <body>
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>Simple Loan Calculator</h1>
            <p>
              The Simple Loan Calculator will determine your estimated payments
              for loan amounts, interest rates and terms.
            </p>
          </div>

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
                          Loan Amount
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
                          Interest Rate
                        </div>
                      </div>

                      {/*// <!-- Right side -->*/}
                      <div className="level-right">
                        <div className="level-item">
                          <div className="field">
                            <div className="control has-icons-right">
                              <input className="input" id="interest" type="number"/>
                              <span className="icon is-small is-right">
                              <i className="fa fa-percentage"></i>

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
                          <p className="number">3</p>
                          Number Of Years
                        </div>
                      </div>

                      {/*// <!-- Right side -->*/}
                      <div className="level-right">
                        <div className="level-item">
                          <div className="field">
                            <div className="control has-icons-left">
                              <input className="input" id="years" type="number"/>
                              <span className="icon is-small is-left">
                              <i className="fa fa-calendar"></i>
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="control">
                      <button
                          className="button is-large is-fullwidth is-primary is-outlined"
                      >
                        Calculate
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
        <h1 className="title ">Calculated Results</h1>
        <div className="columns is-multiline">

          <div className="column is-12-tablet is-6-desktop is-3-widescreen">
            <div className="notification is-primary has-text">
              <p id="monthlyPayment" className="title is-1">$</p>
              <p className="subtitle is-4">Monthly Payments</p>
            </div>
          </div>

          <div className="column is-12-tablet is-6-desktop is-3-widescreen">
            <div className="notification is-info has-text">
              <p id="totalInterest" className="title is-1">%</p>
              <p className="subtitle is-4">Total Interest</p>
            </div>
          </div>

          <div className="column is-12-tablet is-6-desktop is-3-widescreen">
            <div className="notification is-link has-text">
              <p id="totalPayment" className="title is-1">$</p>
              <p className="subtitle is-4">Total Amount</p>
            </div>
          </div>

        </div>
      </section>


      </body>
);
}

export default App;
