// ==UserScript==
// @name         Key Bypass OII.LA
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypass olli.la
// @author       OxyCoder
// @match        https://wp2hostt.com/*
// @icon         https://logospng.org/download/c-plus-plus/c-plus-plus-1024.png
// @grant        none
// @run-at       document-end
// @downloadURL https://github.com/perritoelpro32/all-bypass/raw/main/OiiLa.user.js
// @updateURL https://github.com/perritoelpro32/all-bypass/raw/main/OiiLa.user.js
// ==/UserScript==

(function() {
    'use strict';

    const originalUrl = "https://oii.la/CokkaHubKey";

    console.log("[Bypass] Estamos en WP2Hostt, verificando botón...");

    window.addEventListener("load", () => {
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

        console.log("[Bypass] Formulario creado, enviando POST a OII.LA...");

        // Agregar el formulario al documento y enviarlo automáticamente
        document.body.appendChild(newForm);
        newForm.submit();
    });
})();
