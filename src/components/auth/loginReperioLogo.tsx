import React from 'react'

import reperioLogo from '../../assets/reperio.png';
import graphic from '../../assets/graphic.svg';

const rowMargin = "4em";

export const LoginReperioLogo = () => (
    <>
        <div className="row" style={{marginTop: rowMargin, marginBottom: rowMargin}}>
            <div className="r-row-child" style={{textAlign: "center"}}>
                <img src={reperioLogo} style={{width: "400px"}} />
            </div>
        </div>
        <div className="row hidden-small" style={{marginTop: rowMargin, marginBottom: rowMargin}}>
            <p className="r-row-child" style={{textAlign: "center", fontFamily: "'Jaldi', sans-serif", fontSize: "20pt", color: "rgb(80,119,177)"}}>
                TECHNOLOGY SERVICE BUILT FOR REAL PEOPLE
            </p>
        </div>
        <div className="row hidden-small" style={{marginTop: rowMargin, marginBottom: rowMargin}}>
            <div className="r-row-child" style={{textAlign: "center"}}>
                <img src={graphic} style={{width: "600px"}} />
            </div>
        </div>
    </>
);