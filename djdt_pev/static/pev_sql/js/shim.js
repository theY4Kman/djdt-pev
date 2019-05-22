function getDomText(id) {
  return document.getElementById(id).innerText;
}

window.addEventListener('message', event => {
  if (event.origin !== location.origin) {
    return;
  }

  if (event.data && event.data.method === 'getPlan') {
    event.source.postMessage(
      {
        method: 'getPlan',
        rval: {
          planContent: getDomText('djdt-pev-plan-content'),
          planName: getDomText('djdt-pev-plan-name'),
          planQuery: getDomText('djdt-pev-plan-query'),
        },
      },
      location.origin,
    );
  }
});
