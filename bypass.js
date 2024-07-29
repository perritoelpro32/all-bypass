// ==UserScript==
// @name         pandadeveloptmen bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  bypass linkvertise.net
// @author       OxyCoder
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    // URL del script en GitHub
    const scriptUrl = 'https://raw.githubusercontent.com/perritoelpro32/pandadeveolpment-bypass/main/bypass';

    // Función para cargar y ejecutar el script desde GitHub
    function loadAndExecuteScript(url) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response) {
                if (response.status === 200) {
                    // Evaluar el contenido del script
                    try {
                        let scriptContent = response.responseText;
                        eval(scriptContent);
                    } catch (e) {
                        console.error('Error al evaluar el script:', e);
                    }
                } else {
                    console.error('Error al cargar el script:', response.status);
                }
            },
            onerror: function() {
                console.error('Error en la solicitud para cargar el script');
            }
        });
    }

    // Ejecutar la función para cargar y ejecutar el script
    loadAndExecuteScript(scriptUrl);

})();
