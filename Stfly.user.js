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
// @downloadURL  https://github.com/perritoelpro32/all-bypass/raw/main/Stfly.user.js
// @updateURL    https://github.com/perritoelpro32/all-bypass/raw/main/Stfly.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clickButton(selector, delay = 0, callback = null) {
        setTimeout(() => {
            let button = document.querySelector(selector);
            if (button) {
                console.log(`🔘 Clicking button: ${selector}`);
                button.click();
                if (callback) callback(); // Executes another function if passed as an argument
            } else {
                console.warn(`⚠️ Button not found: ${selector}`);
            }
        }, delay);
    }

    function clickNextOrStep() {
        setTimeout(() => {
            let nextButton = [...document.querySelectorAll("button")].find(btn =>
                btn.textContent.trim().toLowerCase().includes("next") ||
                btn.textContent.trim().toLowerCase().includes("continue") ||
                btn.textContent.trim().toLowerCase().includes("step")
            );
            if (nextButton) {
                console.log("➡️ Clicking 'Next' or 'Step' button.");
                nextButton.click();
            } else {
                console.warn("⚠️ 'Next' or 'Step' button not found.");
            }
        }, 1000); // Waits 1 second before searching for "Next" or "Step" button
    }

    function bypassAirevueAtravan() {
        setTimeout(() => { // Wait 1 second before executing the logic
            let startButton = document.querySelector("button[id$='_start']");
            if (startButton) {
                console.log("🚀 Clicking start button");
                startButton.click();
                setTimeout(() => {
                    let verifyButton = document.querySelector("button[type='submit']");
                    if (verifyButton) {
                        console.log("✅ Wait completed. Clicking the first verification button.");
                        verifyButton.click();
                        setTimeout(() => {
                            let secondSubmit = document.querySelector("button[type='submit']");
                            if (secondSubmit) {
                                console.log("✅ Clicking the second verification button.");
                                secondSubmit.click();
                                clickNextOrStep(); // Looks for "Next" or "Step" button after the second submit
                            } else {
                                console.warn("⚠️ Second verification button not found.");
                                clickNextOrStep(); // If no submit button is found, look for "Next" or "Step"
                            }
                        }, 1000);
                    } else {
                        console.warn("⚠️ First verification button not found.");
                    }
                }, 8000);
            } else {
                console.warn("⚠️ Start button not found.");
            }
        }, 1000); // Wait 1 second before starting
    }

    function bypassStfly() {
        console.log("🚀 Clicking submit button on stfly.biz");
        clickButton("button[type='submit']");
    }

    function initBypass() {
        console.log("🔍 Starting bypass on: " + window.location.hostname);
        if (window.location.hostname.includes("airevue.net") || window.location.hostname.includes("atravan.net")) {
            bypassAirevueAtravan();
        } else if (window.location.hostname.includes("stfly.biz")) {
            bypassStfly();
        }
    }

    // Starts the bypass immediately without waiting for the page to fully load
    initBypass();
})();
