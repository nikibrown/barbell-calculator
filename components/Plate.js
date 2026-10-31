import React, { useState, useEffect } from "react"

export default function LargePlate({
    onPress,
    plateColor,
    reset,
    setReset,
    undo,
    setUndo,
    lastPlateAdded,
    weightNum,
    plateSize,
    unit,
}) {
    const [plateCount, setPlateCount] = useState(0)

    const handleUpdatePlatecount = () => {
        setPlateCount(plateCount + 2)
    }

    let noZeroWeightNum = weightNum.toString()
    noZeroWeightNum = noZeroWeightNum.replace("0.", ".")

    useEffect(() => {
        if (reset) {
            setPlateCount(0)
            setReset(false)
        } else if (undo) {
            // -2 plate count for the last plate added
            if (lastPlateAdded.weightNum === weightNum) {
                setPlateCount(plateCount - 2)
            }
            setUndo(false)
        }
    }, [reset, undo])

    return (
        <span className="plate-wrapper" onClick={handleUpdatePlatecount}>
            <button
                type="button"
                className={`plate-button plate-button--${plateSize} plate--${plateColor}`}
                onClick={onPress}
                aria-label={`${noZeroWeightNum} ${unit}${
                    plateCount > 0 ? `, ${plateCount} on barbell` : ""
                }`}
            >
                <span className="plate-button__num" aria-hidden="true">
                    {noZeroWeightNum}
                    <span className="plate-button__unit">{unit}</span>
                </span>

                {plateCount > 0 ? (
                    <span className="plate-count-badge" aria-hidden="true">
                        {plateCount}
                    </span>
                ) : null}
            </button>
        </span>
    )
}
