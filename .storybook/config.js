import Vue from 'vue';
import VueRS from '@appbaseio/reactivesearch-vue';
import { configure, addParameters, addDecorator } from '@storybook/vue';
import addons from './mixin.js';


addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
  },
});


Vue.use(VueRS);
Vue.mixin(addons)

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
