import React from "react";
import './css/Field.css';

export function Field({ label, id, type, icon}) {
    return (<div className="level">
        <div className="level-left">
            <div className="level-item">
                <h1>
                    {label}
                </h1>
            </div>
        </div>


        <div className="level-right">
            <div className="level-item">
                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input" id={id} type={type}/>
                        <span className="icon is-small is-left">
                <i className={`fa ${icon}`}></i>
              </span>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
