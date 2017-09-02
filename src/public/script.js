(function (href, alert) {

  [
    {
      className: 'success',
      text: 'Bot added!',
      active: !!~href.indexOf('success')
    },
    {
      className: 'error',
      text: 'Fail. Try again.',
      active: !!~href.indexOf('error')
    }

  ]
    .filter(function (message) {
      return message.active;
    })
    .forEach(function (message) {
      alert.className = `alert ${message.className}`;
      alert.innerHTML = message.text;
    });

})(window.location.href, document.getElementsByClassName('alert')[0]);