import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { STORY_CHANGED } from '@storybook/core-events';
import { RESET } from '@storybook/addon-knobs';

// FIXME: A monkeypatch to work around the broken @storybook/knobs addon.
// We emit the reset event to the addon if a story is loaded initially.
// We tinker with the browser url that gets polluted by the addon and clean the storybook api from the polluted data.
// This should be removed once we migrated to the storybooks controls.
addons.register('suck-it-storybook', (api) => {
	// There is no other way to access the storybook api except by registering an addon 💩
	api.on(STORY_CHANGED, () => {
		const iframeElement = document.querySelector('iframe');

		// Get the current story URL from the Storybook API's getUrlState function
		const { storyId } = api.getUrlState();

		const currentStoryUrl = `${window.location.origin}/iframe.html?viewMode=story&id=${storyId}`;
		// Update the iframe's src attribute to the current story URL
		if (iframeElement.src !== currentStoryUrl) {
			iframeElement.src = currentStoryUrl;

			api.emit(RESET);
		}
	});
});

addons.setConfig({
	hierarchyRootSeparator: /\|/,
	panelPosition: 'right',
	theme: create({
		base: 'light',
		brandTitle: 'ReactiveSearch-Vue',
		brandUrl: 'https://github.com/appbaseio/vue-playground',
	}),
});
