Cypress.Commands.add("clearSession", () => {
    cy.window().then((win) => {
        win.sessionStorage.clear()
    })
})

Cypress.Commands.add("visitSubscriptionSettingsPage", () => {
    let credentials = Cypress.env('credentialDemo')
    cy.url().then((loc) => {
        let newUrl = loc + "/edit"
        let cutURL = newUrl.substring(8, newUrl.length)
        let urlWithCredentials = 'https://' + credentials + cutURL
        cy.visit(urlWithCredentials)
    })
})

Cypress.Commands.add("iframe", {prevSubject: "element"}, $iframe => {
    Cypress.log({
        name: "iframe",
        consoleProps() {
            return {
                iframe: $iframe,
            }
        },
    })

    return new Cypress.Promise(resolve => {
        onIframeReady(
            $iframe,
            () => {
                resolve($iframe.contents().find("body"))
            },
            () => {
                $iframe.on("load", () => {
                    resolve($iframe.contents().find("body"))
                })
            }
        )
    })
})


function onIframeReady($iframe, successFn, errorFn) {
    try {
        const iframeContent = $iframe.first()[0].contentWindow,
            aboutBlank = "about:blank",
            complete = "complete"
        const callCallback = () => {
            try {
                const iframe_contents = $iframe.contents()

                if (iframe_contents.length === 0) {
                    // https://git.io/vV8yU
                    throw new Error("iframe inaccessible")
                }
                successFn(iframe_contents)
            } catch (e) {
                // accessing contents failed
                errorFn()
            }
        }
        const observeOnload = () => {
            $iframe.on("load.jqueryMark", () => {
                try {
                    const src = $iframe.attr("src").trim(),
                        href = iframeContent.location.href

                    if (href !== aboutBlank || src === aboutBlank || src === "") {
                        $iframe.off("load.jqueryMark")
                        callCallback()
                    }
                } catch (e) {
                    errorFn()
                }
            })
        }

        if (iframeContent.document.readyState === complete) {
            const src = $iframe.attr("src").trim(),
                href = iframeContent.location.href

            if (href === aboutBlank && src !== aboutBlank && src !== "") {
                observeOnload()
            } else {
                callCallback()
            }
        } else {
            observeOnload()
        }
    } catch (e) {
        // accessing contentWindow failed
        errorFn()
    }
}