import { configure } from '@storybook/vue';
import Vue from 'vue';
import VueRS from '@appbaseio/vue-reactivesearch';

Vue.use(VueRS);
function loadStories() {
  require('../stories');
}

configure(loadStories, module);
