(function() {
    'use strict';

    const apiUrl = 'https://stickx.top/api-linkvertise/?link={link}&api_key=E99l9NOctud3vmu6bPne';

    function showDebugMessage(message) {
        let debugDiv = document.getElementById('debug-messages');
        if (!debugDiv) {
            debugDiv = document.createElement('div');
            debugDiv.id = 'debug-messages';
            debugDiv.style.position = 'fixed';
            debugDiv.style.bottom = '0';
            debugDiv.style.right = '0';
            debugDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
            debugDiv.style.color = 'white';
            debugDiv.style.padding = '10px';
            debugDiv.style.zIndex = '10000';
            debugDiv.style.maxWidth = '300px';
            document.body.appendChild(debugDiv);
        }
        let messageElem = document.createElement('div');
        messageElem.textContent = message;
        debugDiv.appendChild(messageElem);
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
        let apiRequestUrl = apiUrl.replace('{link}', originalLink);
        showDebugMessage('Requesting API with URL: ' + apiRequestUrl);

        GM_xmlhttpRequest({
            method: 'GET',
            url: apiRequestUrl,
            onload: function(response) {
                showDebugMessage('API response status: ' + response.status);
                if (response.status === 200) {
                    try {
                        let data = JSON.parse(response.responseText);
                        showDebugMessage('API response: ' + JSON.stringify(data));
                        if (data && data.Status === 'Success' && data.key) {
                            window.location.href = data.key;
                        } else {
                            showDebugMessage('Invalid API response: ' + JSON.stringify(data));
                        }
                    } catch (e) {
                        showDebugMessage('Error processing API response: ' + e.message);
                    }
                } else {
                    showDebugMessage('Error in API request: ' + response.status);
                }
            },
            onerror: function() {
                showDebugMessage('Error in API request');
            }
        });
    }

    function clickButton(buttonText) {
        let button = Array.from(document.querySelectorAll('button'))
            .find(btn => btn.textContent.trim() === buttonText);

        if (button) {
            simulateMouseMovement(button);
            scrollPage();
            clickButtonWithDelay(button);
            showDebugMessage('Clicked button with text: ' + buttonText);
            return true;
        } else {
            showDebugMessage('Button with text "' + buttonText + '" not found');
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
            showDebugMessage('Clicked button with href containing: ' + urlFragment);
            return true;
        } else {
            showDebugMessage('Button with href containing "' + urlFragment + '" not found');
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
            showDebugMessage('Clicked button with highest checkpoints value: ' + highestValue);
            return true;
        } else {
            showDebugMessage('No button with checkpoints found');
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
            showDebugMessage('Clicked button with class: ' + className + ' and text: ' + buttonText);
            return true;
        } else {
            showDebugMessage('Button with class "' + className + '" and text "' + buttonText + '" not found');
        }
        return false;
    }

    function clickStyledContinueButton() {
        let button = Array.from(document.querySelectorAll('button'))
            .find(btn => btn.id === 'submitButton' && btn.querySelector('span')?.textContent.trim() === 'Continue');

        if (button) {
            simulateMouseMovement(button);
            scrollPage();
            clickButtonWithDelay(button);
            showDebugMessage('Clicked styled Continue button');
            return true;
        } else {
            showDebugMessage('Styled Continue button not found');
        }
        return false;
    }

    function detectAntiBotSystems() {
        return document.querySelector('.g-recaptcha') ||
               document.querySelector('.h-captcha') ||
               document.querySelector('#cf-turnstile') ||
               document.querySelector('#captcha');
    }

    function checkReCaptchaCompletion() {
        let captchaResponse = document.querySelector('#g-recaptcha-response');
        if (captchaResponse && captchaResponse.value) {
            showDebugMessage('ReCAPTCHA completed');
            return true;
        }
        return false;
    }

    function checkTurnstileCompletion() {
        let turnstileResponse = document.querySelector('#cf-chl-widget-j17ky_response');
        if (turnstileResponse && turnstileResponse.value) {
            showDebugMessage('Cloudflare Turnstile completed');
            return true;
        }
        return false;
    }

    async function waitForCaptchaCompletion() {
        while (true) {
            let captcha = detectAntiBotSystems();
            if (!captcha) {
                showDebugMessage('No captcha detected');
                return true;
            }

            if (checkReCaptchaCompletion() || checkTurnstileCompletion()) {
                return true;
            }

            showDebugMessage('Captcha or anti-bot system detected, waiting for 5 seconds...');
            await delay(5000);
        }
    }

    async function main() {
        while (true) {
            showDebugMessage('Checking page...');
            if (await waitForCaptchaCompletion()) {
                if (clickStyledContinueButton() ||
                    clickButtonByClassAndText('relative', 'Continue') ||
                    clickHighestCheckpointsButton() ||
                    clickButton('Continue') ||
                    clickButtonByHref('linkvertise')) {
                    let currentUrl = getOriginalLink();
                    if (currentUrl.includes('linkvertise')) {
                        handleRedirect(currentUrl);
                        return;
                    }
                }
            } else {
                showDebugMessage('Failed to complete captcha, retrying...');
            }
            await delay(5000);
        }
    }

    // Ejecutar la función principal
    main();

})();
