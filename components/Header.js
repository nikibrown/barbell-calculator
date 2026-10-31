import React from "react"
import ResetButton from "./ResetButton"
import UndoButton from "./UndoButton"

export default function Header({ undoLastPlate, resetEverything }) {
    return (
        <header className="site-header">
            <nav className="site-header__inner">
                <UndoButton
                    undoLastPlate={() => undoLastPlate()}
                    aria-label="Undo Last Plate"
                />
                <h1>Barbell Calculator</h1>

                <ResetButton
                    resetEverything={() => resetEverything()}
                    aria-label="Reset Barbell"
                />
            </nav>
        </header>
    )
}
