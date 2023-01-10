import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
    hierarchyRootSeparator: /\|/,
    panelPosition: 'right',
    theme: create({
        base: 'light',
        brandTitle: 'ReactiveSearch-Vue',
        brandUrl: 'https://github.com/appbaseio/vue-playground',
    }),
});