import { useState, useEffect } from "react"

export default function Barbell({
    weightNum,
    onPress,
    disableBarbell,
    reset,
    setReset,
    unit,
}) {
    const [barbellSelected, setBarbellSelection] = useState(false)

    const updateBarbell = () => {
        if (!disableBarbell) {
            setBarbellSelection(true)
        }
    }

    useEffect(() => {
        if (reset) {
            setBarbellSelection(false)
            setReset(false)
        }
    }, [reset])

    return (
        <span className="barbell-button-wrapper" onClick={updateBarbell}>
            <button
                type="button"
                className={`barbell-button ${barbellSelected ? "selected" : ""}`}
                onClick={onPress}
                disabled={disableBarbell}
                aria-pressed={barbellSelected}
            >
                <span>
                    {weightNum}
                    <span className="unit-small">{unit}</span>
                </span>
            </button>
        </span>
    )
}
