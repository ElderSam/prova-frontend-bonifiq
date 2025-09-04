(function () {
    const WIDGET_URL = 'http://localhost:3000/'; // build
    // const WIDGET_URL = 'http://localhost:5173/'; // dev
    const WIDGET_ORIGIN = new URL(WIDGET_URL).origin; // usado no postMessage

    const WIDGET_WIDTH = 320;
    const WIDGET_HEIGHT = 600;

    // Evita múltiplas execuções
    if (window.__widgetLoaded) return;
    window.__widgetLoaded = true;

    // Injeta CSS global do widget
    const style = document.createElement('style');
    style.innerHTML = `
        .widget-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            padding: 14px 22px;
            border-radius: 50px;
            background: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.18);
            font-size: 16px;
            font-weight: bold;
            transition: background 0.2s;
        }
        .widget-btn:hover {
            background: #0056b3;
        }
        .widget-container {
            position: fixed;
            bottom: 80px;
            right: 24px;
            z-index: 9999;
            width: 100%;
            max-width: ${WIDGET_WIDTH}px;
            height: 85vh;
            max-height: ${WIDGET_HEIGHT}px;
            display: none;
            box-shadow: 0 4px 24px rgba(0,0,0,0.22);
            border-radius: 16px;
            overflow: hidden;
            background: #fff;
            touch-action: none;
        }
        .widget-container iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
        }
        @media (max-width: 400px) {
            .widget-container {
                width: 98vw !important;
                height: 98vh !important;
                bottom: 1vh !important;
                right: 1vw !important;
            }
            .widget-btn {
                right: 1vw !important;
                bottom: 1vh !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Cria botão flutuante
    const btn = document.createElement('button');
    btn.innerText = 'Abrir Widget';
    btn.setAttribute('aria-label', 'Abrir Widget');
    btn.className = 'widget-btn';
    document.body.appendChild(btn);

    // Cria container do iFrame
    const container = document.createElement('div');
    container.className = 'widget-container';
    document.body.appendChild(container);

    let iframe;

    function sendUserId() {
        if (!iframe || !iframe.contentWindow) return;
        if (typeof window.loggedUserId === 'undefined' || window.loggedUserId === null) return;
        iframe.contentWindow.postMessage(
            { type: 'widget:user', loggedUserId: window.loggedUserId },
            WIDGET_ORIGIN
        );
    }

    // Toggle
    btn.onclick = function () {
        const closed = container.style.display === 'none' || container.style.display === '';
        if (closed) {
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.title = 'Widget';
                iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
                iframe.src = WIDGET_URL;
                container.appendChild(iframe);

                // Quando o iframe terminar de carregar, já tenta enviar o ID:
                iframe.addEventListener('load', sendUserId);
            }
            container.style.display = 'block';
            btn.innerText = 'Fechar Widget';
        } else {
            container.style.display = 'none';
            btn.innerText = 'Abrir Widget';
        }
    };

    // Fecha pelo ESC
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && container.style.display === 'block') {
            container.style.display = 'none';
            btn.innerText = 'Abrir Widget';
        }
    });

    // OUVE o "ready" do filho e responde com o ID
    window.addEventListener('message', function (event) {
        if (!event.origin || event.origin !== WIDGET_ORIGIN) return;

        if (event.data && event.data.widgetReady === true) {
            // filho avisou que registrou o listener
            sendUserId();
            return;
        }

        if (event.data && event.data.widgetClose) {
            container.style.display = 'none';
            btn.innerText = 'Abrir Widget';
        }
    });

})();
