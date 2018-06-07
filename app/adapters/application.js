import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    authenticator: 'authenticator:custom',
    authorizer: 'authorizer:custom',
    host: config.APP.API,
    namespace: 'v1'
});
