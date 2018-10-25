import { configure } from '@storybook/vue';
import Vue from 'vue';
import VueRS from '@appbaseio/reactivesearch-vue';

Vue.use(VueRS);
function loadStories() {
  require('../stories');
}

configure(loadStories, module);
