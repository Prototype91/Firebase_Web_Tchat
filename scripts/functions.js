export function dispatchRoute(controller) {
    if (controller !== Object(controller) || !controller.hasOwnProperty('view') || typeof controller.init !== 'function') {
        return console.warn('Contrôleur invalide :', controller);
    }

    if (controller.view === null) {
        return controller.init();
    }

    return fetch(`views/${controller.view}`)
        .then(res => res.text())
        .then(htmlText => {
            document.getElementsByTagName('main')[0].innerHTML = htmlText;
            controller.init();
        });
}

export function setLogguedMode(user) {
    const menuLoggued = document.getElementById('menu-loggued');
    document.getElementById('navbarContent').innerHTML = menuLoggued.innerHTML;
}

export function setUnLogguedMode() {
    const menuUnLoggued = document.getElementById('menu-unloggued');
    document.getElementById('navbarContent').innerHTML = menuUnLoggued.innerHTML;
}

