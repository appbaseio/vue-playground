import { app } from '@storybook/vue3';
import Vuex from 'vuex';
import VueRS from '@appbaseio/reactivesearch-vue';
import { ReactiveGoogleMap } from '@appbaseio/reactivesearch-vue';
import { addReadme } from '@appbaseio/storybook-readme/vue';

import addons from './mixin.js';

app.use(Vuex);

app.use(VueRS);

app.use(ReactiveGoogleMap, {
	key: NODE_ENV === 'production' ? 'AIzaSyAKz3UhgSuP872fb-Aw27oPRI7M0eXkA9U' : '',
});

app.mixin(addons);

export const decorators = [addReadme];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
