import { ResetIcon } from "./Icons"

export default function ResetButton({ resetEverything }) {
    return (
        <button
            type="button"
            className="icon-button"
            onClick={resetEverything}
            aria-label="Reset Barbell"
        >
            <ResetIcon />
        </button>
    )
}
