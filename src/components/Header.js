import React from "react";

export function Header({title}) {
    return (
        <div className="content" style={{textAlign: "center"}}>
            <h1>⭐ <u>{title}</u> ⭐</h1>
        </div>
    );
}
