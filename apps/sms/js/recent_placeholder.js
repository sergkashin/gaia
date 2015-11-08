/* global SettingsListener*/

'use strict';

var Placeholder = {

    init: function() {
      this.body_element = document.getElementById('full_body');
      this.messages_element = document.getElementById('main_body_placeholder');
      setTimeout(this.updateBackgroundImage.bind(this), 2000);
      console.log('init is finished');
    },

    updateBackgroundImage: function() {
      console.log('updating background image');
      SettingsListener.observe('wallpaper.image', null,
                               this.wallpaperImageHandler.bind(this));
    },

    wallpaperImageHandler: function(image) {
      console.log('setting background image to ' + image);
      this.wallpaperUrl = 'url(' +
           (typeof image === 'string' ? image : URL.createObjectURL(image)) + ')';
      if (this.body_element) {
        this.body_element.style.backgroundImage = this.wallpaperUrl;
        this.body_element.style.backgroundSize = '100% 100%';
      }
      if (this.messages_element) {
        this.messages_element.classList.add('loaded');
      }
    }
};

Placeholder.init();
