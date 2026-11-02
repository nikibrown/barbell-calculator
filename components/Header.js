import React from "react"
import styled from "styled-components"
import { designTokens } from "./designTokens"
import Container from "./Container"
import ResetButton from "./ResetButton"
import UndoButton from "./UndoButton"
import Link from "next/link"

const BannerWrapper = styled.section`
    background-color: ${designTokens.colors.green};
    color: ${designTokens.colors.white};
    padding: 5px 0px;

    a {
        color: ${designTokens.colors.white};
        text-decoration: none;
    }

    span {
        background-color: ${designTokens.colors.black};
        padding: 5px;
        display: inline-block;
        margin-right: 5px;
        border-radius: 4px;
        font-weight: bold;
    }

    @keyframes slideDown {
        from {
            transform: translateY(-100px);
        }
        to {
            transform: translateY(0);
        }
    }

    p {
        color: ${designTokens.colors.white};
        font-size: 0.75rem;
        margin: 0;
        transform: translateY(-100px);
        animation-name: slideDown;
        animation-duration: 0.3s;
        animation-delay: 0.5s;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }
`

const HeaderWrapper = styled.header`
    background-color: ${designTokens.colors.black};
    color: ${designTokens.colors.white};
    padding: 15px 0px;

    h1 {
        font-size: 1.2rem;
        margin: 0;
        text-align: center;

        @media screen and (min-width: 900px) {
            font-size: 2rem;
        }
    }
`
const NavbarWrapper = styled.nav`
    color: ${designTokens.colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default function Header({ undoLastPlate, resetEverything }) {
    return (
        <>
            <BannerWrapper>
                <p>
                    <Link
                        href="https://nikibrown.link/bc-new"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>New</span> Preview Barbell Calculator 2.0 &rarr;
                    </Link>
                </p>
            </BannerWrapper>
            <HeaderWrapper>
                <Container>
                    <NavbarWrapper>
                        <UndoButton
                            undoLastPlate={() => undoLastPlate()}
                            aria-label="Undo Last Plate"
                        />
                        <h1>Barbell Calculator</h1>

                        <ResetButton
                            resetEverything={() => resetEverything()}
                            aria-label="Reset Barbell"
                        />
                    </NavbarWrapper>
                </Container>
            </HeaderWrapper>
        </>
    )
}
