// ==UserScript==
// @name         Loot Link & Linkvertise Bypass Panel
// @namespace    http://tampermonkey.net/
// @version      1.1
// @author       perritoelpro32
// @icon         https://i.imgur.com/zzYx9th.png
// @description  Crea un panel con botones para Bypass en sitios aceptados
// @match        https://loot-link.com/s?*
// @match        https://loot-links.com/s?*
// @match        https://lootlink.org/s?*
// @match        https://lootlinks.co/s?*
// @match        https://lootdest.info/s?*
// @match        https://lootdest.org/s?*
// @match        https://lootdest.com/s?*
// @match        https://links-loot.com/s?*
// @match        https://linksloot.net/s?*
// @match        https://linkvertise.com/*
// @match        https://*.linkvertise.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Crear el panel
    var panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '10px';
    panel.style.right = '10px';
    panel.style.padding = '15px';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    panel.style.color = 'white';
    panel.style.zIndex = '1000';
    panel.style.borderRadius = '10px';
    panel.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';

    // Crear el primer botón - Bypass City
    var button1 = document.createElement('button');
    button1.innerHTML = 'Bypass City';
    button1.style.marginRight = '10px';
    button1.style.padding = '10px 20px';
    button1.style.fontSize = '16px';
    button1.style.cursor = 'pointer';
    button1.addEventListener('click', function() {
        var currentUrl = window.location.href;
        var apiUrl = `https://bypass.city/bypass?bypass=${encodeURIComponent(currentUrl)}`;
        window.open(apiUrl, '_blank'); // Abrir en una nueva pestaña
    });

    // Crear el segundo botón - Bypass VIP
    var button2 = document.createElement('button');
    button2.innerHTML = 'Bypass VIP';
    button2.style.padding = '10px 20px';
    button2.style.fontSize = '16px';
    button2.style.cursor = 'pointer';
    button2.addEventListener('click', function() {
        var currentUrl = window.location.href;
        var apiUrl = `https://api.bypass.vip/bypass?url=${currentUrl}`; // Usar URL sin codificar
        window.open(apiUrl, '_blank'); // Abrir en una nueva pestaña
    });

    // Añadir los botones al panel
    panel.appendChild(button1);
    panel.appendChild(button2);

    // Verificar si estamos en un sitio de Linkvertise y agregar el tercer botón si es así
    var linkvertiseRegex = /^https:\/\/(www\.)?linkvertise\.com\//;
    if (linkvertiseRegex.test(window.location.href)) {
        // Crear el tercer botón - Linkvertise Bypass
        var button3 = document.createElement('button');
        button3.innerHTML = 'StickX';
        button3.style.marginTop = '10px';
        button3.style.padding = '10px 20px';
        button3.style.fontSize = '16px';
        button3.style.cursor = 'pointer';
        button3.addEventListener('click', function() {
            var currentUrl = window.location.href;
            var apiUrl = `https://stickx.top/api-linkvertise/?link=${currentUrl}&api_key=E99l9NOctud3vmu6bPne`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.Status === "Success" && data.key && data.key.startsWith("http")) {
                        window.open(data.key, '_blank'); // Abrir en una nueva pestaña
                    } else {
                        var resultWindow = window.open();
                        resultWindow.document.write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
                    }
                })
                .catch(error => {
                    console.error('Error al consultar la API:', error);
                    alert("Error: No se pudo contactar con la API.");
                });
        });
        panel.appendChild(button3);
    }

    // Añadir el panel al cuerpo del documento
    document.body.appendChild(panel);
})();
