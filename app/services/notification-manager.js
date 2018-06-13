import Service from '@ember/service';

export default Service.extend({
  shown: false,
  message: '',

  hide() {
    this.set('shown', false);
  },

  show(item) {
    this.set('message', item);
    this.set('shown', true);
  }
});
