import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

// Sets the saved theme (or the device's light/dark setting) before the
// page paints, so the wrong theme never flashes on load.
const themeScript = `
(function () {
    try {
        var theme = localStorage.getItem("theme");
        if (theme !== "light" && theme !== "dark") {
            theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        document.documentElement.dataset.theme = theme;
    } catch (e) {}
})();
`

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                </Head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
