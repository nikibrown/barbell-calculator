import React from "react"

export default function PlateOnBarbell({ weightNum, plateColor, plateSize }) {
    let noZeroWeightNum = weightNum.toString()
    noZeroWeightNum = noZeroWeightNum.replace("0.", ".")

    return (
        <span
            className={`bar-plate bar-plate--${plateSize} plate--${plateColor}`}
        >
            <span className="bar-plate__num">{noZeroWeightNum}</span>
        </span>
    )
}
