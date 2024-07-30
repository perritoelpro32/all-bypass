// ==UserScript==
// @name         PandaDevelopment Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bypass for pandadevelopment
// @author       OxyCoder
// @match        *://*.pandadevelopment.net/*
// @match        *://*.linkvertise.com/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @icon         https://i.imgur.com/zzYx9th.png
// ==/UserScript==

(function() {
    'use strict';

    const apiUrl = 'https://stickx.top/api-linkvertise/?link={link}&api_key=E99l9NOctud3vmu6bPne';

    function showInitialMessage() {
        let messageDiv = document.createElement('div');
        messageDiv.id = 'initial-message';
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '10px'; // Ajusta el margen superior
        messageDiv.style.left = '50%'; // Centrar horizontalmente
        messageDiv.style.transform = 'translateX(-50%)'; // Ajusta para alineación central
        messageDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.maxWidth = '300px';
        messageDiv.style.fontSize = '14px';
        messageDiv.style.fontFamily = 'Arial, sans-serif';
        messageDiv.innerHTML = `
            <strong>Bypass in Progress</strong><br>
            Please wait for your key bypass. Do not interact with the page.<br>
            Created by: OxyCoder<br>
            Discord: <a href="https://discord.com/invite/Z8nvVmsG9B" target="_blank" style="color: #1E90FF;">https://discord.com/invite/Z8nvVmsG9B</a>
        `;
        document.body.appendChild(messageDiv);
    }

    function getOriginalLink() {
        return window.location.href;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function clickButtonWithDelay(button, delayMin = 1000, delayMax = 3000) {
        let delayTime = Math.floor(Math.random() * (delayMax - delayMin + 1)) + delayMin;
        await delay(delayTime);
        button.click();
    }

    function simulateMouseMovement(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        let event = new MouseEvent('mousemove', {
            clientX: x,
            clientY: y
        });
        document.dispatchEvent(event);
    }

    function scrollPage() {
        window.scrollBy(0, Math.random() * 100);
    }

    function handleRedirect(url) {
        let originalLink = getOriginalLink();
        let apiRequestUrl = apiUrl.replace('{link}', encodeURIComponent(originalLink));

        GM_xmlhttpRequest({
            method: 'GET',
            url: apiRequestUrl,
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        let data = JSON.parse(response.responseText);
                        if (data && data.Status === 'Success' && data.key) {
                            setTimeout(() => {
                                window.location.href = data.key;
                            }, 8000);
                        }
                    } catch (e) {}
                }
            },
            onerror: function() {}
        });
    }

    function clickButtonByText(text) {
        let button = Array.from(document.querySelectorAll('button'))
            .find(btn => btn.textContent.trim() === text);

        if (button) {
            simulateMouseMovement(button);
            scrollPage();
            clickButtonWithDelay(button);
            return true;
        }
        return false;
    }

    function clickButtonByHref(urlFragment) {
        let button = Array.from(document.querySelectorAll('a'))
            .find(link => link.href.includes(urlFragment));

        if (button) {
            simulateMouseMovement(button);
            scrollPage();
            clickButtonWithDelay(button);
            return true;
        }
        return false;
    }

    function clickButtonByClassAndText(className, buttonText) {
        let button = Array.from(document.querySelectorAll(`button.${className}`))
            .find(btn => btn.textContent.trim() === buttonText);

        if (button) {
            simulateMouseMovement(button);
            scrollPage();
            clickButtonWithDelay(button);
            return true;
        }
        return false;
    }

    function clickHighestCheckpointsButton() {
        let buttons = Array.from(document.querySelectorAll('a[href*="checkpoints="]'));
        let highestValue = -1;
        let bestButton = null;

        buttons.forEach(button => {
            let url = new URL(button.href);
            let checkpointsValue = parseInt(url.searchParams.get('checkpoints'), 10);

            if (!isNaN(checkpointsValue) && checkpointsValue > highestValue) {
                highestValue = checkpointsValue;
                bestButton = button;
            }
        });

        if (bestButton) {
            simulateMouseMovement(bestButton);
            scrollPage();
            clickButtonWithDelay(bestButton);
            return true;
        }
        return false;
    }

    function clickLinkvertiseButton() {
        let button = Array.from(document.querySelectorAll('a.relative'))
            .find(a => a.querySelector('span')?.textContent.trim() === 'Linkvertise');

        if (button) {
            simulateMouseMovement(button);
            scrollPage();
            clickButtonWithDelay(button);
            return true;
        }
        return false;
    }

    function detectAntiBotSystems() {
        return document.querySelector('.g-recaptcha') ||
               document.querySelector('.h-captcha') ||
               document.querySelector('#cf-turnstile') ||
               document.querySelector('#captcha') ||
               document.body.textContent.includes("Token mismatch, session invalidated!");
    }

    function checkReCaptchaCompletion() {
        let captchaResponse = document.querySelector('#g-recaptcha-response');
        return captchaResponse && captchaResponse.value;
    }

    function checkTurnstileCompletion() {
        let turnstileResponse = document.querySelector('#cf-chl-widget-905to_response');
        return turnstileResponse && turnstileResponse.value;
    }

    async function waitForCaptchaCompletion() {
        const maxAttempts = 3;
        let attempt = 0;

        if (detectAntiBotSystems()) {
            while (attempt < maxAttempts) {
                if (checkReCaptchaCompletion() || checkTurnstileCompletion()) {
                    return true;
                }
                attempt++;
                await delay(3000);
            }
        }
        return false;
    }

    async function startScript() {
        showInitialMessage();

        let currentUrl = getOriginalLink();
        if (currentUrl.startsWith('https://pandadevelopment.net/getkey?')) {
            if (await waitForCaptchaCompletion()) {
                if (clickButtonByClassAndText('relative', 'Continue')) return;
                if (clickHighestCheckpointsButton()) return;
                if (clickButtonByText('Continue')) return;
                if (clickButtonByHref('continue')) return;
                if (clickLinkvertiseButton()) return;
            } else {
                if (clickButtonByClassAndText('relative', 'Continue')) return;
                if (clickHighestCheckpointsButton()) return;
                if (clickButtonByText('Continue')) return;
                if (clickButtonByHref('continue')) return;
                if (clickLinkvertiseButton()) return;
            }
        } else if (currentUrl.startsWith('https://linkvertise.com/')) {
            handleRedirect(currentUrl);
        }
    }

    startScript();
})();
