import { configure } from '@storybook/vue';
import Vue from 'vue';
import VueRS from '@appbaseio/reactivesearch-vue';
import addons from './mixin.js';

Vue.use(VueRS);
Vue.mixin(addons)

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
