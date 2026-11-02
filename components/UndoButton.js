import { UndoIcon } from "./Icons"

export default function ResetButton({ undoLastPlate }) {
    return (
        <button
            type="button"
            className="icon-button"
            onClick={undoLastPlate}
            aria-label="Undo"
        >
            <UndoIcon />
        </button>
    )
}
