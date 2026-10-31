import React from "react"
import Link from "next/link"
import ResetButton from "./ResetButton"
import { BackIcon } from "./Icons"

export default function Header({ resetEverything }) {
    return (
        <header className="site-header">
            <nav className="site-header__inner">
                <Link
                    href="/"
                    className="icon-button"
                    aria-label="Back to Barbell Calculator"
                >
                    <BackIcon />
                </Link>
                <h1>Reverse Calculator</h1>

                <ResetButton
                    resetEverything={() => resetEverything()}
                    aria-label="Reset Barbell"
                />
            </nav>
        </header>
    )
}
