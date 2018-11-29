import React, {CSSProperties} from "react";

const topDivStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "table",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 10000
};

const secondDivStyle: CSSProperties = {
    display: "table-cell",
    verticalAlign: "middle"
};

const thirdDivStyle: CSSProperties = {
    width: "100px",
    height: "100px",
    margin: "auto"
};

const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%"
};

const loadingSpinner = (props: any) => (
    <div style={topDivStyle}>
        <div style={secondDivStyle}>
            <div style={thirdDivStyle}>
                <div style={imgStyle} className="loading" />
            </div>
        </div>
    </div>
);

export default loadingSpinner;