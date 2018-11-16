import { run } from '@ember/runloop';
import $ from 'jquery';
import { isEmpty } from '@ember/utils';
import { Promise, resolve } from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default Base.extend({
  tokenEndpoint: config.APP.API + '/v1/sessions',

  restore: function (data) {
    return new Promise(function (resolve, reject) {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function (options) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.tokenEndpoint,
        type: 'POST',
        data: JSON.stringify({
          username: options.identification,
          password: options.password,
          token: options.token
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then(function (response) {
        run(function () {
          resolve({
            token: response.id_token,
            user_id: response.user_id
          });
        });
      }, function (xhr) /*, status, error*/ {
        var response = xhr.responseText;
        run(function () {
          reject(response);
        });
      });
    });
  },

  invalidate: function () {
    // console.log('invalidating login...');
    return resolve();
  }
});
