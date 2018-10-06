import { htmlSafe } from '@ember/template';
import Helper from '@ember/component/helper';

export default Helper.extend({
  compute(params, hash) {
    var breakTag = '<br>';
    let t = hash.text;
    if (t == undefined) {
      return "";
    }
    return new htmlSafe(t.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
  }
});
