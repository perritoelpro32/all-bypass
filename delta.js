// ==UserScript==
// @name         Delta Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Delta Bypass
// @author       OxyCoder
// @match        https://gateway.platoboost.com/a/8?*
// @match        https://loot-link.com/s?*
// @match        https://loot-links.com/s?*
// @match        https://lootlink.org/s?*
// @match        https://lootlinks.co/s?*
// @match        https://lootdest.info/s?*
// @match        https://lootdest.org/s?*
// @match        https://lootdest.com/s?*
// @match        https://links-loot.com/s?*
// @match        https://linksloot.net/s?*
// @icon         https://www.google.com/s2/favicons?domain=example.com
// @grant        none
// ==/UserScript==

/*
    License: This script is licensed under a no-modification license. 
    You may not alter, modify, or build upon this script in any way.
    Redistribution of modified versions of this script is not permitted.
*/

(function() {
    'use strict';

    const targetUrls = [
        'https://loot-link.com/s?',
        'https://loot-links.com/s?',
        'https://lootlink.org/s?',
        'https://lootlinks.co/s?',
        'https://lootdest.info/s?',
        'https://lootdest.org/s?',
        'https://lootdest.com/s?',
        'https://links-loot.com/s?',
        'https://linksloot.net/s?'
    ];

    const baseOriginalUrl = 'https://gateway.platoboost.com/a/8?';

    function redirectToModifiedUrl() {
        const originalUrl = window.name;
        if (originalUrl && originalUrl.startsWith(baseOriginalUrl)) {
            const modifiedUrl = originalUrl + '&tk=die6';
            window.name = ''; // Limpiar la variable para evitar redirecciones repetidas
            window.location.href = modifiedUrl;

            // Desactivar el userscript
            document.body.innerHTML += `<script type="text/javascript">
                (function() {
                    let script = document.querySelector('script[src*="Delta Bypass"]');
                    if (script) {
                        script.parentNode.removeChild(script);
                    }
                })();
            </script>`;
        }
    }

    function checkRedirection() {
        const currentUrl = window.location.href;
        if (targetUrls.some(url => currentUrl.startsWith(url))) {
            // Redirige a la URL original modificada
            redirectToModifiedUrl();
        } else {
            // Si no se ha redirigido a una URL de destino, vuelve a comprobar después de un corto intervalo
            setTimeout(checkRedirection, 1000); // Verifica cada segundo
        }
    }

    // Espera a que la página esté completamente cargada
    window.addEventListener('load', function() {
        const currentUrl = window.location.href;
        // Solo guarda la URL si comienza exactamente con baseOriginalUrl
        if (currentUrl.startsWith(baseOriginalUrl)) {
            window.name = currentUrl;
        }
        // Inicia la verificación de redirección después de 1 segundo
        setTimeout(checkRedirection, 1000);
    });
})();
