// ==UserScript==
// @name         Keys Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypass roblox cheats key!
// @author       khoanontop & OxyCoder

// @match        https://*/*
// @icon         https://logospng.org/download/c-plus-plus/c-plus-plus-1024.png

// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        window.close

// @downloadURL https://github.com/perritoelpro32/all-bypass/raw/main/FullBypass.user.js
// @updateURL https://github.com/perritoelpro32/all-bypass/raw/main/FullBypass.user.js
// ==/UserScript==

(function () {
    'use strict';

    function BackgroundMain() {
        const BackMainDiv = document.createElement("div");
        BackMainDiv.style.position = "fixed";
        BackMainDiv.style.top = "10px";
        BackMainDiv.style.right = "10px";
        BackMainDiv.style.maxWidth = "300px";
        BackMainDiv.style.maxHeight = "300px";
        BackMainDiv.style.overflowY = "auto";
        BackMainDiv.style.backgroundColor = "#333";
        BackMainDiv.style.color = "white";
        BackMainDiv.style.padding = "10px";
        BackMainDiv.style.fontFamily = "monospace";
        BackMainDiv.style.fontSize = "12px";
        BackMainDiv.style.borderRadius = "5px";
        BackMainDiv.style.zIndex = 1000;
        if (document.body) {
            document.body.appendChild(BackMainDiv);
        }
        return BackMainDiv;
    }
    function debugWindow(_0x8c0c17) {
        const _0x3d39da = BackgroundMain();
        const _0x56cb25 = document.createElement("div");
        _0x56cb25.textContent = _0x8c0c17;
        _0x3d39da.appendChild(_0x56cb25);
    }
    function _0x44bf3f(_0x55ce10) {
        alert("Copied value: " + _0x55ce10);
    }

    window.addEventListener("load", function () {
        const url = window.location.href;
        let _0x52af0e = false;
        setTimeout(function () {
            if (!_0x52af0e) {
                const _0x14715e = document.querySelector("#tablebodyuserarea > tr > td:nth-child(4) > button");
                if (_0x14715e) {
                    debugWindow("Auto Click button");
                    _0x14715e.click();
                    _0x52af0e = true;
                } else {
                    console.log("Button not found!");
                }
            }
        }, 5000);
        // trigonevo
        if (url.includes("trigonevo.fun/whitelist/?HWID=")) {
            const trigonBtn = document.querySelector("div.glass-light.bg-blue-600.bg-opacity-20.hover-glow.cursor-pointer.rounded-lg.p-4.border-l-4.border-blue-400.shadow-md.relative.overflow-hidden");
            if (trigonBtn) {
                trigonBtn.click();
                debugWindow("Click button");
            } else {
                debugWindow("whitelist");
            }
        }
        // fluxus
        if (url.startsWith("https://linkvertise.com/580726/fluxus1")) {
            window.location.href = "https://flux.li/android/external/check1.php?hash={hash}";
        } else if (url.startsWith("https://flux.li/android/external/check1.php?hash={hash}")) {
            window.location.href = "https://linkvertise.com/580726/fluxus";
        } else if (url.startsWith("https://linkvertise.com/580726/fluxus")) {
            const _0x19f858 = document.createElement("div");
            _0x19f858.style.position = "fixed";
            _0x19f858.style.top = "0";
            _0x19f858.style.left = "0";
            _0x19f858.style.width = "100%";
            _0x19f858.style.height = "100%";
            _0x19f858.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            _0x19f858.style.zIndex = "9999";
            _0x19f858.style.display = "flex";
            _0x19f858.style.flexDirection = "column";
            _0x19f858.style.alignItems = "center";
            _0x19f858.style.justifyContent = "center";
            const _0xf785d9 = document.createElement("div");
            _0xf785d9.style.fontSize = "30px";
            _0xf785d9.style.marginBottom = "20px";
            _0xf785d9.style.fontWeight = "bold";
            _0xf785d9.textContent = "Time : 3s";
            const _0x2ef34b = document.createElement("button");
            _0x2ef34b.textContent = "Bypass";
            _0x2ef34b.style.padding = "20px 40px";
            _0x2ef34b.style.fontSize = "18px";
            _0x2ef34b.style.border = "none";
            _0x2ef34b.style.backgroundColor = "#4CAF50";
            _0x2ef34b.style.color = "white";
            _0x2ef34b.style.cursor = "pointer";
            _0x2ef34b.style.borderRadius = "10px";
            _0x2ef34b.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            _0x2ef34b.style.transition = "background-color 0.3s";
            _0x2ef34b.style.display = "none";
            _0x2ef34b.addEventListener("click", function () {
                window.location.href = "https://flux.li/android/external/main.php?hash={hash}";
            });
            _0x19f858.appendChild(_0xf785d9);
            _0x19f858.appendChild(_0x2ef34b);
            document.body.appendChild(_0x19f858);
            let _0x196ef9 = 3;
            const _0x144343 = setInterval(function () {
                _0x196ef9--;
                _0xf785d9.textContent = "Time : " + _0x196ef9 + "s";
                if (_0x196ef9 <= 0) {
                    clearInterval(_0x144343);
                    _0xf785d9.textContent = "Click Bypass";
                    _0x2ef34b.style.display = "block";
                }
            }, 1000);
        }
        // zorara
        if (url === "https://getzorara.online:2053/") {
            setTimeout(function () {
                const zoraraBtn = document.getElementById("generate-btn");
                if (zoraraBtn) {
                    zoraraBtn.click();
                    debugWindow("Clicked Generate Button");
                }
            });
        }
        // fluxus PC
        if (url.includes("key.fluxteam.org")) {
            fluxusGen();
        }
        // lootlinks
        if (url.includes("loot-link.com") || url.includes("lootdest.org") || url.includes("linkvertise.com")) {
            bypassLogic();
        }
        // pandadevelopment
        if (url.includes("pandadevelopment.net/getkey?service=beeconhub")) {
            _0x561c75();
        }
        if (window.location.href.includes("https://pandadevelopment.net/getkey?service=cryptic")) {
            debugWindow("wait 5 second");
            setTimeout(() => {
                const _0x4e5f29 = document.querySelector(".button-simple.w-inline-block");
                if (_0x4e5f29) {
                    _0x4e5f29.click();
                }
            }, 5000);
        }
        // keyguardian
        if (url.includes("https://keyguardian.org/a/1096?id=") || url.includes("https://keyguardian.org/a/1167?id=")) {
            _0x4af2f3();
        }
        // codex
        if (url.startsWith("https://loot-links.com/s?mK6Z")) {
            debugWindow("wait 5 second");
            setTimeout(function () {
                window.location.href = "https://mobile.codex.lol/?page=tasks";
            }, 5000);
        }
        if (url.startsWith("https://linkvertise.com/654032/codex-gateway-2")) {
            debugWindow("wait 5 second");
            setTimeout(function () {
                window.location.href = "https://mobile.codex.lol/?page=tasks";
            }, 5000);
        }
        if (url.startsWith("https://loot-link.com/s?oiQO")) {
            debugWindow("wait 5 second");
            setTimeout(function () {
                window.location.href = "https://mobile.codex.lol/?page=tasks";
            }, 5000);
        }
        // arceus X
        if (url.includes("https://spdmteam.com/key-system-3?hwid=")) {
            window.location.href = "https://loot-link.com/s?qlbU";
        } else if (url.includes("https://spdmteam.com/key-system-2?hwid=")) {
            window.location.href = "https://loot-link.com/s?mYit";
        } else if (url.includes("https://spdmteam.com/key-system-1?hwid=")) {
            debugWindow("Please verify captcha");
        } else if (url.includes("https://linkvertise.com/376138/arceus-x-neo-key-system-1?o=sharing")) {
            window.location.href = "https://spdmteam.com/api/keysystem?step=1&advertiser=linkvertise&OS=ios";
        } else if (url.includes("https://loot-link.com/s?mYit")) {
            window.location.href = "https://spdmteam.com/api/keysystem?step=2&advertiser=linkvertise&OS=ios";
        } else if (url.includes("https://loot-link.com/s?qlbU")) {
            window.location.href = "https://spdmteam.com/api/keysystem?step=3&advertiser=linkvertise&OS=ios";
        }
        // swift
        if (url.startsWith("https://getswift.xyz/real/0/") || url.startsWith("https://getswift.xyz/real/1/") || url.startsWith("https://getswift.xyz/real/2/")) {
            setInterval(function () {
                const _0x324f14 = document.querySelector("body > div > form > div.flex.flex-col.w-full.mb-\\[2rem\\].items-center > button");
                if (_0x324f14) {
                    _0x324f14.click();
                    debugWindow("Bypass Click button");
                }
            }, 1000);
        }
        if (url.startsWith("https://getswift.xyz/real/3/")) {
            debugWindow("Please press 'Get Key'");
        }
        // codex 2
        if (window.location.href.includes("https://mobile.codex.lol/")) {
            setTimeout(() => {
                const _0x5064e7 = document.querySelector(".absolute.-inset-0\\.5.bg-red-500\\/30.opacity-20.rounded-lg.blur.group-hover\\:opacity-60.transition.duration-1000.group-hover\\:duration-200");
                if (_0x5064e7) {
                    _0x5064e7.click();
                    console.log("The element has been clicked!");
                } else {
                    console.log("The element to click was not found.");
                }
            }, 1000);
        }
        // keyRBLX
        if (window.location.href.includes("https://keyrblx.com/")) {
            const _0x5706e9 = document.querySelector("button.mantine-Button-root span.mantine-Button-label");
            if (_0x5706e9) {
                setTimeout(() => {
                _0x5706e9.closest("button").click();
            }, 7000);
            }
            const _0x16f417 = document.querySelector("button.mantine-Button-root span.mantine-Button-label");
            if (_0x16f417 && _0x16f417.textContent.trim() === "Copy") {
                _0x16f417.closest("button").click();
                const _0x3838b4 = document.querySelector("input.mantine-Input-input");
                if (_0x3838b4) {
                    const rblxKey = _0x3838b4.value;
                    _0x44bf3f(rblxKey);
                    debugWindow("key : " + rblxKey);
                }
            } else {
                debugWindow("Click button");
            }
        }
        // wp2hostt
        if (url.includes("wp2hostt.com")) {
            console.log("[Bypass] Estamos en WP2Hostt, verificando botón...");

            let startButton = document.querySelector("#startButton");

            if (!startButton) {
                console.log("[Bypass] Botón no encontrado, no se ejecutará el script.");
                return;
            }

            console.log("[Bypass] Botón detectado, buscando formulario...");

            let form = document.querySelector("#getmylink");
            if (!form) {
                console.error("[Bypass] Formulario no encontrado.");
                return;
            }

            // Obtener la URL de acción del formulario original
            let originalUrl = form.getAttribute("action") || window.location.href;

            // Crear un nuevo formulario para enviar los datos por POST
            let newForm = document.createElement("form");
            newForm.method = "POST";
            newForm.action = originalUrl;
            newForm.style.display = "none";

            // Extraer los valores del formulario original y agregarlos al nuevo
            let formData = new FormData(form);
            for (let pair of formData.entries()) {
                let input = document.createElement("input");
                input.type = "hidden";
                input.name = pair[0];
                input.value = pair[1];
                newForm.appendChild(input);
            }

            console.log("[Bypass] Formulario creado, enviando POST...");

            // Agregar el formulario al documento y enviarlo automáticamente
            document.body.appendChild(newForm);
            newForm.submit();
        }
        // rekonise
        if (window.location.href.includes("rekonise.com/")) {
            let pathName = window.location.pathname;
            let rekoniseApi = "https://api.rekonise.com/social-unlocks" + pathName + "/unlock";
            GM_xmlhttpRequest({
                method: "GET",
                url: rekoniseApi,
                onload: function (tryRekonise) {
                    try {
                        let jsonRekonise = JSON.parse(tryRekonise.responseText);
                        if (jsonRekonise.url) {
                            window.location.href = jsonRekonise.url;
                        } else {
                            console.error("No URL found in the API response");
                        }
                    } catch (_0x485095) {
                        console.error("Failed to parse API response", _0x485095);
                    }
                },
                onerror: function () {
                    console.error("Failed to fetch the API URL");
                }
            });
        }
    });
    // Logic for Linkvertise and Lootlabs
    function bypassLogic(i) {
        debugWindow(i, "Please wait to bypass");
        setTimeout(function () {
            const _0x2d1f8e = window.location.href;
            if (_0x2d1f8e.includes("https://linkvertise.com/580726/fluxus1") || _0x2d1f8e.includes("https://linkvertise.com/580726/fluxus") || _0x2d1f8e.includes("https://linkvertise.com/376138/arceus-x-neo-key-system-1?o=sharing") || _0x2d1f8e.includes("https://loot-link.com/s?mYit") || _0x2d1f8e.includes("https://loot-link.com/s?qlbU") || _0x2d1f8e.includes("https://loot-links.com/s?mK6Z") || _0x2d1f8e.includes("https://linkvertise.com/654032/codex-gateway-2") || _0x2d1f8e.includes("https://loot-link.com/s?oiQO")) {
            } else if (_0x2d1f8e.includes("https://linkvertise.com/") && _0x2d1f8e.includes("/dynamic?") && _0x2d1f8e.includes("r=aH")){
                const rParamMatch = _0x2d1f8e.match(/r=([^&]+)&o/);

                if (rParamMatch) {
                    const encodedValue = rParamMatch[1];

                    try {
                        const urlDecoded = decodeURIComponent(encodedValue);
                        const base64Decoded = atob(urlDecoded);

                        console.log("Redirecting to:", base64Decoded);
                        debugWindow("Redirecting to:", base64Decoded);

                        setTimeout(() => {
                            window.location.href = base64Decoded;
                        }, 9000);

                    } catch (error) {
                        console.error("Error decoding URL:", error);
                    }
                }
            } else {
                console.log("The URL does not need to be processed.");
            }
        debugWindow(i, "URL is a link that does not need to be bypassed");
        return;
    });
}
    // fluxus 2
 function fluxusGen() {
    const _0x359395 = document.querySelector("button.generate-button");
    if (_0x359395) {
        debugWindow("Clicking generate button...");
        _0x359395.click();
        setTimeout(() => {
            const _0x48e168 = document.querySelector(".key-display");
            if (_0x48e168) {
                const _0x458036 = _0x48e168.textContent.trim();
                if (_0x458036) {
                    debugWindow("Redirecting to: " + _0x458036);
                    window.location.href = _0x458036;
                } else {
                    debugWindow("No URL found after clicking generate.");
                }
            } else {
                debugWindow("Key display not found.");
            }
        }, 5000);
    } else {
        debugWindow("Use key");
    }
}
function _0x561c75() {
    const _0x286b54 = document.querySelector("a.button-simple[href*=\"getkey?service=beeconhub\"][href*=\"checkpoints=48\"]");
    if (_0x286b54) {
        _0x286b54.click();
        debugWindow("Bypass Button clicked");
        return;
    }
    if (window.location.href.includes("checkpoints=48")) {
        const _0x56ea91 = document.querySelector("button.button-simple.w-inline-block");
        if (_0x56ea91) {
            _0x56ea91.click();
            debugWindow("Click button continue");
        }
    }
}
function _0x4af2f3(_0x16a461) {
    const _0x195c29 = document.querySelector("div.flex.items-center.p-6.pt-0.relative a.w-full.group");
    if (_0x195c29) {
        _0x195c29.click();
        debugWindow(_0x16a461, "Bypass Button clicked");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        return;
    }
    if (window.location.href.includes("&providerId=")) {
        const _0x5d042b = document.querySelector("body > main > div > div > div.items-center.p-6.pt-0.flex.justify-between > button");
        if (_0x5d042b) {
            _0x5d042b.click();
            debugWindow(_0x16a461, "Click button continue");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
}
setTimeout(() => {
    const _0x6e6062 = document.createElement("div");
    document.body.appendChild(_0x6e6062);
    _0x561c75(_0x6e6062);
}, 1000);
})();
