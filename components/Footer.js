import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useClickAway } from "@uidotdev/usehooks"
import { CloseIcon, CoffeeIcon, HelpIcon, MoonIcon, SunIcon } from "./Icons"

const getTheme = () =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"

export default function Footer({ link }) {
    const [showInfo, setShowInfo] = useState(false)

    const ref = useClickAway(() => {
        setShowInfo(false)
    })

    // Light / dark mode. The starting theme is set in _document.js
    // (saved choice, or the device setting) before the page paints.
    const [theme, setTheme] = useState(null)
    const themeTimer = useRef(null)

    useEffect(() => {
        setTheme(getTheme())
        return () => clearTimeout(themeTimer.current)
    }, [])

    const toggleTheme = () => {
        const nextTheme = getTheme() === "dark" ? "light" : "dark"
        const root = document.documentElement

        // Fade the colors only while switching (see .theme-transition).
        root.classList.add("theme-transition")
        clearTimeout(themeTimer.current)
        themeTimer.current = setTimeout(() => {
            root.classList.remove("theme-transition")
        }, 250)

        root.dataset.theme = nextTheme
        try {
            localStorage.setItem("theme", nextTheme)
        } catch (e) {}
        setTheme(nextTheme)
    }

    return (
        <footer className="site-footer">
            {showInfo && (
                <div
                    className="info-dialog"
                    role="dialog"
                    aria-labelledby="info-dialog-title"
                    ref={ref}
                >
                    <button
                        type="button"
                        className="info-dialog__close"
                        aria-label="Close"
                        onClick={() => {
                            setShowInfo(false)
                        }}
                    >
                        <CloseIcon />
                    </button>

                    <h2 id="info-dialog-title" className="label">
                        About
                    </h2>

                    <p className="info-dialog__text">
                        Barbell calculator is made by{" "}
                        <a href="https://nikibrown.com" target="_blank">
                            Niki Brown
                        </a>
                        , who is bad at math and getting better at javascript.
                    </p>

                    <p>
                        <a
                            className="button"
                            href="https://ko-fi.com/nikibrown"
                            target="_blank"
                        >
                            <CoffeeIcon />
                            Buy me a coffee
                        </a>
                    </p>
                </div>
            )}

            <div className="site-footer__inner">
                <Link href={link.href} className="site-footer__link">
                    {link.label}
                </Link>

                <div className="site-footer__actions">
                    <button
                        type="button"
                        className="icon-button theme-toggle"
                        aria-label={
                            theme === "dark"
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        onClick={toggleTheme}
                    >
                        <span className="theme-toggle__moon">
                            <MoonIcon />
                        </span>
                        <span className="theme-toggle__sun">
                            <SunIcon />
                        </span>
                    </button>

                    <button
                        type="button"
                        className="icon-button"
                        aria-label="About Barbell Calculator"
                        aria-expanded={showInfo}
                        onClick={() => {
                            setShowInfo(true)
                        }}
                    >
                        <HelpIcon />
                    </button>
                </div>
            </div>
        </footer>
    )
}
