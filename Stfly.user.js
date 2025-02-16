// ==UserScript==
// @name         Bypass Stfly
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypass stfly.biz
// @author       OxyCoder
// @icon         https://logospng.org/download/c-plus-plus/c-plus-plus-1024.png
// @match        *://stfly.biz/*
// @match        *://airevue.net/*
// @match        *://atravan.net/*
// @downloadURL https://github.com/perritoelpro32/all-bypass/raw/main/Stfly.user.js
// @updateURL https://github.com/perritoelpro32/all-bypass/raw/main/Stfly.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clickButton(selector, delay = 0, callback = null) {
        setTimeout(() => {
            let button = document.querySelector(selector);
            if (button) {
                console.log(`🔘 Haciendo clic en el botón: ${selector}`);
                button.click();
                if (callback) callback(); // Ejecuta otra función si se pasa como argumento
            } else {
                console.warn(`⚠️ No se encontró el botón: ${selector}`);
            }
        }, delay);
    }

    function clickNextOrStep() {
        setTimeout(() => {
            let nextButton = [...document.querySelectorAll("button")].find(btn =>
                btn.textContent.trim().toLowerCase().includes("next") ||
                btn.textContent.trim().toLowerCase().includes("Continue") ||
                btn.textContent.trim().toLowerCase().includes("step")
            );
            if (nextButton) {
                console.log("➡️ Haciendo clic en el botón 'Next' o 'Step'.");
                nextButton.click();
            } else {
                console.warn("⚠️ No se encontró un botón 'Next' o 'Step'.");
            }
        }, 1000); // Espera 1 segundo antes de buscar el botón "Next" o "Step"
    }

    function bypassAirevueAtravan() {
        setTimeout(() => { // Esperar 1 segundo antes de ejecutar la lógica
            let startButton = document.querySelector("button[id$='_start']");
            if (startButton) {
                console.log("🚀 Haciendo clic en el botón de inicio");
                startButton.click();
                setTimeout(() => {
                    let verifyButton = document.querySelector("button[type='submit']");
                    if (verifyButton) {
                        console.log("✅ Espera finalizada. Haciendo clic en el primer botón de verificación.");
                        verifyButton.click();
                        setTimeout(() => {
                            let secondSubmit = document.querySelector("button[type='submit']");
                            if (secondSubmit) {
                                console.log("✅ Haciendo clic en el segundo botón de verificación.");
                                secondSubmit.click();
                                clickNextOrStep(); // Busca botón "Next" o "Step" después del segundo submit
                            } else {
                                console.warn("⚠️ No se encontró un segundo botón de verificación.");
                                clickNextOrStep(); // Si no encuentra el submit, busca "Next" o "Step"
                            }
                        }, 1000);
                    } else {
                        console.warn("⚠️ No se encontró el primer botón de verificación.");
                    }
                }, 8000);
            } else {
                console.warn("⚠️ No se encontró el botón de inicio.");
            }
        }, 1000); // Esperar 1 segundo antes de comenzar
    }

    function bypassStfly() {
        console.log("🚀 Haciendo clic en el botón de envío en stfly.biz");
        clickButton("button[type='submit']");
    }

    function initBypass() {
        console.log("🔍 Iniciando bypass en: " + window.location.hostname);
        if (window.location.hostname.includes("airevue.net") || window.location.hostname.includes("atravan.net")) {
            bypassAirevueAtravan();
        } else if (window.location.hostname.includes("stfly.biz")) {
            bypassStfly();
        }
    }

    // Inicia el bypass inmediatamente sin esperar a que la página cargue completamente
    initBypass();
})();
