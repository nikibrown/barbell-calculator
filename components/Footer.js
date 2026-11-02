import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { designTokens } from "./designTokens"
import Container from "./Container"
import { useClickAway } from "@uidotdev/usehooks"
import Link from "next/link"

const FooterWrapper = styled.footer`
    background-color: ${designTokens.colors.black};
    color: ${designTokens.colors.white};
    padding: 20px 0;
    position: relative;
    text-align: center;

    p {
        margin: 0;
    }

    .footer-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            color: ${designTokens.colors.white};
            text-decoration: none;
        }
    }

    span {
        display: inline-block;
        margin: 0 5px;
    }

    .nextjs {
        fill: #ffffff;
    }

    .info svg,
    .github svg {
        transition: opacity 0.15s ease-in-out;
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`

const InfoDialog = styled.dialog`
    //box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    color: ${designTokens.colors.black};
    padding: 40px;
    position: absolute;
    z-index: 10;
    bottom: 40px;
    width: 75vw;
    margin: auto;
    display: block;
    animation: expand 0.15s ease-in-out;
    border-radius: 8px;
    text-align: center;

    a {
        color: ${designTokens.colors.black}!important;
    }

    .close {
        position: absolute;
        top: 5px;
        right: 10px;
        transition: 0.15s ease-in-out;
        z-index: 20;
        font-size: 30px;
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`

export default function Footer() {
    const [showInfo, setShowInfo] = useState(false)

    const ref = useClickAway(() => {
        setShowInfo(false)
    })
    return (
        <FooterWrapper>
            {showInfo && (
                <InfoDialog ref={ref}>
                    <span
                        className="close"
                        onClick={() => {
                            setShowInfo(false)
                        }}
                    >
                        &times;
                    </span>

                    <p>
                        Barbell calculator is a made by{" "}
                        <a href="https://nikibrown.com" target="_blank">
                            Niki Brown
                        </a>
                        , who is bad at math and getting better at javascript.
                    </p>

                    <p>
                        <a href="https://ko-fi.com/nikibrown" target="_blank">
                            <img
                                height="36"
                                style={{
                                    border: "0px",
                                    height: "36px",
                                    marginTop: "20px",
                                }}
                                src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
                                border="0"
                                alt="Buy Me a Coffee at ko-fi.com"
                            />
                        </a>
                    </p>

                    <p>
                        <small>
                            {" "}
                            Take a peek at my code on{" "}
                            <a
                                href="https://github.com/nikibrown/next-barbell-calculator"
                                target="_blank"
                                aria-label="View the code for this app on github"
                            >
                                github
                            </a>
                            .
                        </small>
                    </p>
                </InfoDialog>
            )}
            <Container>
                <p className="footer-nav">
                    <Link href="/reverse-calculator">Reverse calculator →</Link>
                    <span className="info">
                        <svg
                            onClick={() => {
                                setShowInfo(true)
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                            />
                        </svg>
                    </span>
                </p>
            </Container>
        </FooterWrapper>
    )
}
