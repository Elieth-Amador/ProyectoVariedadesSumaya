document.addEventListener('DOMContentLoaded', () => {
    const MAX_MOBILE_LINKS = 10;

    const desktopList = document.querySelector('.nav-list');
    const overlay = document.querySelector('.nav-overlay');
    const overlayPanel = document.querySelector('.nav-panel');
    let overlayList = document.querySelector('.nav-list-overlay');

  
    function closeOverlay() {
        const cb = document.getElementById('nav-toggle');
        if (cb) cb.checked = false;
    }

    function buildOverlayFromDesktop() {
        if (!desktopList || !overlayPanel) return;
        
  
        if (!overlayList) {
            overlayList = document.createElement('ul');
            overlayList.className = 'nav-list-overlay';
            overlayPanel.appendChild(overlayList);
        }

        const desktopItems = Array.from(desktopList.querySelectorAll('li'));
        overlayList.innerHTML = ''; 

        desktopItems.forEach((li, index) => {
            if (index < MAX_MOBILE_LINKS) {
                const clone = li.cloneNode(true);
                overlayList.appendChild(clone);
            }
        });

   
        attachOverlayLinkHandlers();
    }

    function attachOverlayLinkHandlers() {
        // Buscamos los enlaces dentro de la lista móvil recién creada
        const links = document.querySelectorAll('.nav-list-overlay a');
        links.forEach(a => {
            a.addEventListener('click', closeOverlay);
        });
    }


    if (desktopList) {
        buildOverlayFromDesktop();
    }


    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeOverlay();
        });
    }


    document.querySelectorAll('.close-panel').forEach(btn => {
        btn.addEventListener('click', closeOverlay);
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-panel')) {
            closeOverlay();
        }
    });
});