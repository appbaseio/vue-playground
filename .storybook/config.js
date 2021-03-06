import Vue from 'vue';
import VueRS from '@appbaseio/reactivesearch-vue';
import { configure, addParameters, addDecorator } from '@storybook/vue';
import { addReadme } from 'storybook-readme/vue';
import { create } from '@storybook/theming';
import addons from './mixin.js';

addParameters({
  options: {
		hierarchyRootSeparator: /\|/,
    panelPosition: 'right',
    theme: create({
      base: 'light',
      brandTitle: 'ReactiveSearch-Vue',
      brandUrl: 'https://github.com/appbaseio/vue-playground',
    }),
  },
});

addDecorator(addReadme);

Vue.use(VueRS);
Vue.mixin(addons)

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
