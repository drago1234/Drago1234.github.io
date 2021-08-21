document.addEventListener('click', function(ev) {
    if (!window.config || !config.activityEnabled || !ev.target || !ev.target.outerHTML || !window.antiForgeryToken) return;

    var match = false;

    try {
        match = $(ev.target).is(config.activitySelector || 'a, button, .btn, .fa, td, li');
    } catch(ex) {
        // Ignore
    }

    if (!match) return;

    var params = {
        LogType: 'CLICK',
        LogMessage: 'Location=' + location.pathname + '; Target=' + ev.target.outerHTML.substring(0, 150)
    };

    var payload = antiForgeryToken(params);
    if (!payload.__RequestVerificationToken) return;
    $.post('/Mvc/Activity', payload);
}, true);