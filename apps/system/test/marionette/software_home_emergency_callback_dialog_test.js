'use strict';

marionette('Software Home Button - Emergency Callback Dialog', function() {

  var client = marionette.client({
    prefs: {
      'focusmanager.testmode': true,
      'dom.w3c_touch_events.enabled': 1
    },
    settings: {
      'ftu.manifestURL': null,
      'lockscreen.enabled': false,
      'software-button.enabled': true
    }
  });
  var home, system;

  setup(function() {
    home = client.loader.getAppClass('verticalhome');
    system = client.loader.getAppClass('system');
    system.waitForStartup();
    home.waitForLaunch();
    client.switchToFrame();
  });

  test('Dialog dimensions', function() {
    client.executeScript(function() {
      var dialog = document.querySelector('#emergency-callback-dialog');
      dialog.classList.add('visible');
    });

    function rect(el) {
      return el.getBoundingClientRect();
    }

    var winHeight = client.findElement('body').size().height;
    client.waitFor(function() {
      var dialog = client.findElement('#emergency-callback-dialog');
      var dialogRect = dialog.scriptWith(rect);
      var shbRect = system.softwareButtons.scriptWith(rect);
      return (dialogRect.bottom === shbRect.top) &&
             (winHeight === dialogRect.height + shbRect.height);
    });
  });
});
