// ==UserScript==
// @name         Work.ink Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypasses Work.ink and handles social tasks properly with a debug panel
// @author       OxyCoder
// @match        *://work.ink/*
// @match        *://workink.net/*
// @grant        none
// @downloadURL https://raw.githubusercontent.com/perritoelpro32/all-bypass/main/workink.user.js
// @updateURL https://raw.githubusercontent.com/perritoelpro32/all-bypass/main/workink.user.js
// ==/UserScript==

(function() {
    'use strict';

    let actionsExecuted = new Set();
    let socialTabs = [];
    let debugPanel;
    let lastOpenedTab = null;

    function createDebugPanel() {
        debugPanel = document.createElement("div");
        debugPanel.id = "debugPanel";
        debugPanel.innerHTML = `
            <div id="debugHeader">Work.ink Bypass Debug</div>
            <div id="debugContent"></div>
        `;
        document.body.appendChild(debugPanel);

        let style = document.createElement("style");
        style.textContent = `
            #debugPanel {
                position: fixed;
                bottom: 10px;
                right: 10px;
                width: 300px;
                height: 200px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                font-family: Arial, sans-serif;
                font-size: 12px;
                border-radius: 8px;
                overflow-y: auto;
                padding: 10px;
                z-index: 9999;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
            #debugHeader {
                background: #ff5722;
                padding: 5px;
                font-weight: bold;
                text-align: center;
                cursor: move;
            }
            #debugContent {
                max-height: 150px;
                overflow-y: auto;
            }
        `;
        document.head.appendChild(style);
    }

    function logMessage(message) {
        console.log(`[Work.ink Bypass] ${message}`);
        let content = document.getElementById("debugContent");
        if (content) {
            content.innerHTML += `<div>▶ ${message}</div>`;
            content.scrollTop = content.scrollHeight;
        }
    }

    // Bloquear doble apertura de pestañas
    const originalOpen = window.open;
    window.open = function(url, target) {
        if (lastOpenedTab && !lastOpenedTab.closed) {
            logMessage(`Bloqueo: intento de abrir una pestaña duplicada (${url})`);
            return null;
        }
        lastOpenedTab = originalOpen(url, target);
        logMessage(`Nueva pestaña abierta: ${url}`);
        return lastOpenedTab;
    };

    function randomDelay(min = 1000, max = 2000) {
        return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
    }

    function waitForButtonAndClick(selector, buttonText, nextStep, actionName) {
        if (actionsExecuted.has(actionName)) return;
        actionsExecuted.add(actionName);

        const checkButton = setInterval(async () => {
            const button = document.querySelector(selector);
            if (button && button.textContent.includes(buttonText)) {
                logMessage(`Clicking '${buttonText}'`);
                await randomDelay();
                button.click();
                clearInterval(checkButton);
                if (nextStep) randomDelay().then(nextStep);
            }
        }, 1000);
    }

    function waitForContinueWithAds() {
        logMessage("Waiting 8 seconds for 'Continue With Ads'...");
        setTimeout(() => {
            waitForButtonAndClick(
                'button.w-full.bg-gray-100.hover\\:bg-gray-200.active\\:bg-gray-300.text-gray-700.py-4.rounded-full.font-medium.transition-colors',
                "Continue With Ads",
                checkSocialTasks,
                "click-continue-with-ads"
            );
        }, 8000);
    }

    function checkSocialTasks() {
        logMessage("Checking for social tasks...");
        const socialTasks = document.querySelectorAll('.stepcont.svelte-ck84f7 .viewicon');
        if (socialTasks.length === 0) {
            logMessage("No social tasks found. Proceeding to 'Go To Destination'...");
            waitForGoToDestination();
            return;
        }

        socialTasks.forEach(task => {
            const taskLink = task.closest('.stepcont').querySelector('.viewicon');
            if (taskLink && (!lastOpenedTab || lastOpenedTab.closed)) {
                lastOpenedTab = window.open(taskLink.href, "_blank");
                socialTabs.push(lastOpenedTab);
                logMessage(`Opened social task: ${taskLink.href}`);
            } else {
                logMessage("Social task blocked due to duplicate tab prevention.");
            }
        });

        if (socialTabs.length > 0) {
            setTimeout(() => {
                let randomTab = socialTabs[Math.floor(Math.random() * socialTabs.length)];
                if (randomTab) window.location.href = randomTab.location.href;
            }, 2000);
            closeSocialTabs();
        }
    }

    function closeSocialTabs() {
        let closeDelay = 10000 + Math.random() * 10000;
        setTimeout(() => {
            logMessage("Closing social task tabs...");
            socialTabs.forEach(tab => {
                if (tab && !tab.closed) tab.close();
            });
            socialTabs = [];
            waitForGoToDestination();
        }, closeDelay);
    }

    function waitForGoToDestination() {
        logMessage("Waiting 1 second for 'Go To Destination'...");
        setTimeout(() => {
            waitForButtonAndClick('.button.large.accessBtn.pos-relative.svelte-iyommg', "Go To Destination", handleAdTab, "click-go-to-destination-2");
        }, 1000);
    }

    function handleAdTab() {
        logMessage("Looking for an ad to open...");
        const checkAdTab = setInterval(() => {
            const offerLinks = document.querySelectorAll('a.offer-card.highlight-offer, a.offer-card.with-footer');
            if (offerLinks.length > 0) {
                logMessage("Ad detected, opening in a new tab...");
                if (!lastOpenedTab || lastOpenedTab.closed) {
                    lastOpenedTab = window.open(offerLinks[0].href, "_blank");
                } else {
                    logMessage("Ad tab blocked due to duplicate prevention.");
                }
                clearInterval(checkAdTab);
                setTimeout(() => {
                    logMessage("30 seconds passed. Closing ad tab.");
                    if (lastOpenedTab && !lastOpenedTab.closed) {
                        lastOpenedTab.close();
                    }
                    waitForAccessLink();
                }, 30000);
            }
        }, 1000);
    }

    function waitForAccessLink() {
        logMessage("Waiting 28 seconds for 'Access Link'...");
        setTimeout(() => {
            const clickInterval = setInterval(() => {
                const accessBtn = document.querySelector('.button.big.accessBtn.svelte-1m9rjdy');
                if (accessBtn) {
                    logMessage("Clicking 'Access Link'...");
                    accessBtn.click();
                    clearInterval(clickInterval);
                }
            }, 1000);
        }, 28000);
    }

    // Inicializar debug y proceso
    createDebugPanel();
    waitForButtonAndClick('.button.large.accessBtn.pos-relative.svelte-iyommg', "Go To Destination", waitForContinueWithAds, "click-go-to-destination-1");

})();
