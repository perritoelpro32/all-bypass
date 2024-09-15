// ==UserScript==
// @name         PandaDevelopment Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bypass for pandadevelopment
// @author       perritoelpro32
// @match        *://*.pandadevelopment.net/*
// @match        *://*.linkvertise.com/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @icon         https://i.imgur.com/zzYx9th.png
// ==/UserScript==

(function() {
    'use strict';

    const apiUrl = 'https://stickx.top/api-linkvertise/?link={link}&api_key=E99l9NOctud3vmu6bPne';

    function getOriginalLink() {
        return window.location.href;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
                            }, 8000); // Espera 8 segundos antes de redirigir
                        }
                    } catch (e) {
                        console.error('Error al analizar la respuesta de la API:', e);
                    }
                }
            },
            onerror: function() {
                console.error('Error en la solicitud a la API.');
            }
        });
    }

    async function startScript() {

        let currentUrl = getOriginalLink();
        if (currentUrl.startsWith('https://pandadevelopment.net/getkey?')) {
            // Espera hasta que detecte una redirecciÃ³n a linkvertise
            let interval = setInterval(() => {
                if (window.location.href.startsWith('https://linkvertise.com/')) {
                    clearInterval(interval);
                    handleRedirect(window.location.href);
                }
            }, 1000); // Verifica cada 1 segundo
        } else if (currentUrl.startsWith('https://linkvertise.com/')) {
            handleRedirect(currentUrl);
        }
    }

    startScript();
})();
