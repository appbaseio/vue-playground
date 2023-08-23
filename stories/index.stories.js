// eslint-disable-next-line
import { storiesOf } from '@storybook/vue3';
import { withKnobs, text, boolean, object, number, select, array } from '@storybook/addon-knobs';

// List Components
import SingleListReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/list/SingleList.md';
import MultiListReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/list/MultiList.md';
import SingleListDropdownReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/list/SingleDropdownList.md';
import MultiListDropdownReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/list/MultiDropdownList.md';
import ToggleButtonReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/list/ToggleButton.md';

// Range Components
import SingleRangeReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/range/SingleRange.md';
import MultiRangeReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/range/MultiRange.md';
import RangeSliderReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/range/RangeSlider.md';
import DynamicRangeSliderReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/range/DynamicRangeSlider.md';
import RangeInputReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/range/RangeInput.md';
// Search Components
import SearchBoxReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/search/SearchBox.md';

// Result Components
import ResultCardReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/result/ResultCard.md';
import ResultListReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/result/ResultList.md';
import ReactiveListReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/result/ReactiveList.md';

// base components
// import SelectedFiltersReadme from
// "@appbaseio/reactive-manual-v3/content/docs/base-components/SelectedFilters.md";
// Advanced components
import ReactiveComponentReadme from '@appbaseio/docs/content/docs/reactivesearch/vue/advanced/ReactiveComponent.md';

import './styles.css';

import BaseReactiveList from './BaseReactiveList.vue';
import BaseSearchBox from './BaseSearchBox.vue';
import BaseAIAnswer from './BaseAIAnswer.vue';
import BaseMultiList from './BaseMultiList.vue';
import BaseTreeList from './BaseTreeList.vue';
import TreeListCustomRenders from './TreeListCustomRenders.vue';
import TreeListRenderItem from './TreeListRenderItem.vue';
import TreeListRenderSlot from './TreeListRenderSlot/index.vue';
import BaseSingleList from './BaseSingleList.vue';
import BaseSingleRange from './BaseSingleRange.vue';
import BaseReactiveComponent from './BaseReactiveComponent.vue';
import BaseSingleDropdownList from './BaseSingleDropdownList.vue';
import BaseMultiDropdownList from './BaseMultiDropdownList.vue';
import BaseMultiRange from './BaseMultiRange.vue';
import BaseRangeSlider from './BaseRangeSlider.vue';
import BaseDynamicRangeSlider from './BaseDynamicRangeSlider.vue';
import BaseResultList from './BaseResultList.vue';
import BaseResultCard from './BaseResultCard.vue';
import BaseToggleButton from './BaseToggleButton.vue';
import SearchBoxWithRenderSlot from './SearchBoxWithRenderSlot.vue';
import SearchBoxWithCustomAIScreen from './SearchBoxWithCustomAIScreen.vue';
import SearchBoxWithRenderItemSlot from './SearchBoxWithRenderItemSlot.vue';
import SingleListWithRenderSlot from './SingleListWithRenderSlot.vue';
import SingleListWithRenderItemSlot from './SingleListWithRenderItemSlot.vue';
import MultiListWithRenderSlot from './MultiListWithRenderSlot.vue';
import MultiListWithRenderItemSlot from './MultiListWithRenderItemSlot.vue';
import SingleDropdownListWithRenderSlot from './SingleDropdownListWithRenderSlot.vue';
import SingleDropdownListWithRenderItemSlot from './SingleDropdownListWithRenderItemSlot.vue';
import MultiDropdownListWithRenderSlot from './MultiDropdownListWithRenderSlot.vue';
import MultiDropdownListWithRenderItemSlot from './MultiDropdownListWithRenderItemSlot.vue';
import SingleListWithRenderNoResultsSlot from './SingleListWithRenderNoResultsSlot.vue';
import SingleDropdownListWithRenderNoResultsSlot from './SingleDropdownListWithRenderNoResultsSlot.vue';
import MultiListWithRenderNoResultsSlot from './MultiListWithRenderNoResultsSlot.vue';
import MultiDropdownListWithRenderNoResultsSlot from './MultiDropdownListWithRenderNoResultsSlot.vue';
import SearchBoxWithCustomSuggestionIcons from './SearchBoxWithCustomSuggestionIcons.vue';
import SearchBoxControlledUsage from './SearchBoxControlledUsage.vue';
import SearchBoxWithIndexProp from './SearchBoxWithIndexProp.vue';
import MultiListWithIndexProp from './MultiListWithIndexProp.vue';
import SearchBoxWithAddonBeforeSlot from './SearchBoxWithAddonBeforeSlot.vue';
import SearchBoxWithAddonAfterSlot from './SearchBoxWithAddonAfterSlot.vue';
import SearchBoxWithAddonBeforeAfterSlots from './SearchBoxWithAddonBeforeAfterSlots.vue';
import SearchBoxWithDocumentSuggestions from './SearchBoxWithDocumentSuggestions.vue';
import SearchBoxWithDocumentSuggestionsRenderItem from './SearchBoxWithDocumentSuggestionsRenderItem.vue';
import SearchBoxWithDocumentSuggestionsNavigateOnClick from './SearchBoxWithDocumentSuggestionsNavigateOnClick.vue';
import BaseRangeInput from './BaseRangeInput.vue';
import BaseReactiveGoogleMap from './reactivemaps/BaseReactiveGoogleMap.vue';
import ReactiveListWithNoResultsSlot from './ReactiveListWithNoResultsSlot.vue';
import ReactiveListWithCustomResultStatsSlot from './ReactiveListWithCustomResultStatsSlot.vue';
import BaseReactiveListCardLayout from './BaseReactiveListCardLayout.vue';

const TreeListReadme = ToggleButtonReadme;

const getKnobType = (value) => {
	switch (typeof value) {
		case 'object':
			return object;
		case 'number':
			return number;
		case 'array':
			return array;
		case 'boolean':
			return boolean;
		default:
			return text;
	}
};

const getKnob = (name, value, type, args, valueType) => ({
	[name]: {
		type: valueType || value.constructor,
		default: (type || getKnobType(value))(name, value, args),
	},
});

const titleKnob = value => getKnob('title', value);
const defaultValue = value => getKnob('defaultValue', value);
const size = (value = 10) => getKnob('size', value);
const filterLabel = value =>
	Object.assign({}, getKnob('filterLabel', value), getKnob('showFilter', true));
const showRadio = (value = true) => getKnob('showRadio', value);
const sortBy = (
	value = { ascending: 'asc', descending: 'desc', count: 'count' },
	// eslint-disable-next-line no-shadow
	defaultValue = 'asc',
) => getKnob('sortBy', value, select, defaultValue, String);
const URLParams = (value = false) => getKnob('URLParams', value);
const dataField = (
	value = ['original_series.keyword', 'authors.keyword', 'language_code.keyword'],
	// eslint-disable-next-line no-shadow
	defaultValue = 'original_series.keyword',
) => getKnob('dataField', value, select, defaultValue);
// eslint-disable-next-line no-shadow
const paginationAt = (value = ['top', 'bottom', 'both'], defaultValue = 'top') =>
	getKnob('paginationAt', value, select, defaultValue);
const selectAllLabel = value => getKnob('selectAllLabel', value);
const showCount = (value = true) => getKnob('showCount', value);
const showSearch = (value = true) => getKnob('showSearch', value);
const showClear = (value = true) => getKnob('showClear', value);
const highlight = (value = true) => getKnob('highlight', value);
const showCheckbox = (value = true) => getKnob('showCheckbox', value);
const showIcon = (value = true) => getKnob('showIcon', value);
const showLeafIcon = (value = true) => getKnob('showLeafIcon', value);
const showSwitcherIcon = (value = true) => getKnob('showSwitcherIcon', value);
const showLine = (value = true) => getKnob('showLine', value);
const rangeLabels = value => getKnob('rangeLabels', value);
const showTooltip = value => getKnob('showTooltip', value, select, false);
// eslint-disable-next-line no-shadow
const modeKnob = (value = ['single', 'multiple'], defaultValue = 'multiple') =>
	getKnob('mode', value, select, defaultValue);

const compoundClauseKnob = () => getKnob('compoundClause', ['filter', 'must'], select, 'filter');
// eslint-disable-next-line no-shadow
function removeFirstLine(str, number = 12) {
	// eslint-disable-next-line no-plusplus, no-param-reassign
	while (number--) {
		// eslint-disable-next-line no-param-reassign
		str = str.substring(str.indexOf('\n') + 1);
	}
	return str;
}
storiesOf('List components/TreeList', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(TreeListReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{  }"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('TreeList Facet'),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ title }"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ compoundClause }"/>',
	}))
	.add('with mode selection', () => ({
		props: modeKnob(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ mode }"/>',
	}))
	.add('with showCount', () => ({
		props: showCount(true),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showCount }"/>',
	}))
	.add('with showRadio', () => ({
		props: showRadio(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showRadio }"/>',
	}))
	.add('with showCheckbox', () => ({
		props: showCheckbox(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showCheckbox, mode: \'multiple\' }" />',
	}))
	.add('with showIcon', () => ({
		props: showIcon(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showIcon }"/>',
	}))
	.add('with showLeafIcon', () => ({
		props: showLeafIcon(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showLeafIcon }"/>',
	}))
	.add('with showSwitcherIcon', () => ({
		props: showSwitcherIcon(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showSwitcherIcon }"/>',
	}))
	.add('with showLine', () => ({
		props: showLine(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showLine }"/>',
	}))
	.add('with showSearch', () => ({
		props: showSearch(),
		components: { BaseTreeList },
		template: '<base-tree-list :subProps="{ showSearch }"/>',
	}))
	.add('With custom icon(non-leaf nodes)', () => ({
		components: { TreeListCustomRenders },
		template: '<tree-list-custom-renders :subProps="{ showIcon: true  }"/>',
	}))
	.add('With custom leafIcon', () => ({
		components: { TreeListCustomRenders },
		template: '<tree-list-custom-renders :subProps="{ showLeafIcon: true   }"/>',
	}))
	.add('With custom switcherIcon', () => ({
		components: { TreeListCustomRenders },
		template: '<tree-list-custom-renders />',
	}))
	.add('With renderItem', () => ({
		components: { TreeListRenderItem },
		template: '<tree-list-render-item />',
	}))
	.add("With custom 'render' slot", () => ({
		components: { TreeListRenderSlot },
		template: '<tree-list-render-slot />',
	}));

storiesOf('Range Components/SingleRange', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(SingleRangeReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseSingleRange },
		template: '<base-single-range :subProps="{ showFilter: false }"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('Books Filter'),
		components: { BaseSingleRange },
		template: '<base-single-range :subProps="{ title, showFilter: false}"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseSingleRange },
		template: '<base-single-range :subProps="{ compoundClause }"/>',
	}))
	.add(
		'with defaultValue',
		() => ({
			props: defaultValue('Rating < 3'),
			components: { BaseSingleRange },
			template: '<base-single-range :subProps="{defaultValue, showFilter: false}"/>',
		}),
		{
			knobs: {
				escapeHTML: false,
			},
		},
	)
	.add('with filter label', () => ({
		props: filterLabel('Books Filter'),
		components: { BaseSingleRange },
		template: '<base-single-range :subProps="{ filterLabel,  showFilter }"/>',
	}))

	.add('without showRadio', () => ({
		props: showRadio(false),
		components: { BaseSingleRange },
		template: '<base-single-range :subProps="{showRadio}"/>',
	}));

storiesOf('Range Components/MultiRange', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(MultiRangeReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseMultiRange },
		template: '<base-multi-range :subProps="{ showFilter: false }"/>',
	}))
	.add('with title', () => ({
		components: { BaseMultiRange },
		props: titleKnob('Books Filter'),
		template: '<base-multi-range :subProps="{ title, showFilter: false}"/>',
	}))
	.add('with compoundClause', () => ({
		components: { BaseMultiRange },
		props: compoundClauseKnob(),
		template: '<base-multi-range :subProps="{ compoundClause }"/>',
	}))
	.add(
		'with defaultValue',
		() => ({
			props: defaultValue('Rating < 3'),
			components: { BaseMultiRange },
			template: '<base-multi-range :subProps="{defaultValue, showFilter: false}"/>',
		}),
		{
			knobs: {
				timestamps: true,
				escapeHTML: false,
			},
		},
	)
	.add('with filter label', () => ({
		props: filterLabel('Books Filter'),
		components: { BaseMultiRange },
		template: '<base-multi-range :subProps="{ filterLabel,  showFilter }"/>',
	}))
	.add('without showCheckbox', () => ({
		props: showCheckbox(false),
		components: { BaseMultiRange },
		template: '<base-multi-range :subProps="{ showCheckbox }"/>',
	}));

storiesOf('Range Components/RangeSlider', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(RangeSliderReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseRangeSlider },
		template: '<base-range-slider :subProps="{ showFilter: false }"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('RangeSlider: Ratings'),
		components: { BaseRangeSlider },
		template: '<base-range-slider :subProps="{ title}"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseRangeSlider },
		template: '<base-range-slider :subProps="{ compoundClause }"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseRangeSlider },
		props: defaultValue({ start: 3000, end: 9000 }),
		template: '<base-range-slider :subProps="{ defaultValue, showFilter: false}"/>',
	}))
	.add('with range Labels', () => ({
		components: { BaseRangeSlider },
		props: rangeLabels({
			start: '3K',
			end: '50K',
		}),
		template: '<base-range-slider :subProps="{ rangeLabels }"/>',
	}))
	.add('without tooltip', () => ({
		components: { BaseRangeSlider },
		props: showTooltip({
			false: 'none',
			true: 'always',
		}),
		template: '<base-range-slider :subProps="{ sliderOptions: { tooltip: showTooltip } }"/>',
	}));

storiesOf('Range Components/RangeInput', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(RangeInputReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseRangeInput },
		template: '<base-range-input :subProps="{ showFilter: false }"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('RangeInput: Ratings'),
		components: { BaseRangeInput },
		template: '<base-range-input :subProps="{ title}"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseRangeInput },
		template: '<base-range-input :subProps="{ compoundClause }"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseRangeInput },
		props: defaultValue({ start: 3000, end: 9000 }),
		template: '<base-range-input :subProps="{ defaultValue, showFilter: false}"/>',
	}))
	.add('with range Labels', () => ({
		components: { BaseRangeInput },
		props: rangeLabels({
			start: '3K',
			end: '50K',
		}),
		template: '<base-range-input :subProps="{ rangeLabels }"/>',
	}));

storiesOf('Range Components/DynamicRangeSlider', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(DynamicRangeSliderReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ showFilter: false }"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('DynamicRangeSlider: Ratings'),
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ title }"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ compoundClause }"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseDynamicRangeSlider },
		template:
			'<base-dynamic-range-slider :subProps="{ defaultValue: function(min, max){ return { start: min + 1000, end: max - 1000} }, showFilter: false}"/>',
	}))
	.add('without tooltip', () => ({
		components: { BaseDynamicRangeSlider },
		props: showTooltip({
			false: 'none',
			true: 'always',
		}),
		template:
			'<base-dynamic-range-slider :subProps="{ sliderOptions: { tooltip: showTooltip } }"/>',
	}));

storiesOf('List Components/SingleList', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(SingleListReadme, 13),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseSingleList },
		template: '<base-single-list/>',
	}))
	.add('with title', () => ({
		props: titleKnob('Authors Search'),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ title }"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ compoundClause }"/>',
	}))
	.add('with size', () => ({
		props: size(),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ size }"/>',
	}))
	.add('without showSearch', () => ({
		components: { BaseSingleList },
		props: getKnob('showSearch', false),
		template: '<base-single-list :subProps="{ showSearch }"/>',
	}))
	.add('without showCount', () => ({
		props: showCount(false),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ showCount }"/>',
	}))
	.add('with placeholder', () => ({
		props: getKnob('placeholder', 'Search for Authors'),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ placeholder }"/>',
	}))
	.add('without showRadio', () => ({
		props: showRadio(false),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ showRadio }"/>',
	}))
	.add('defaultValue', () => ({
		props: defaultValue('Hercule Poirot'),
		components: { BaseSingleList },
		template: '<base-single-list :subProps="{ defaultValue, showFilter: true }"/>',
	}))
	.add('with custom sort', () => ({
		components: { BaseSingleList },
		props: sortBy(),
		template: '<base-single-list :subProps="{ sortBy }"/>',
	}))
	.add('with render slot', () => ({
		components: { SingleListWithRenderSlot },
		template: '<single-list-with-render-slot />',
	}))
	.add('with renderItem slot', () => ({
		components: { SingleListWithRenderItemSlot },
		template: '<single-list-with-render-item-slot />',
	}))
	.add('with renderNoResults', () => ({
		components: { SingleListWithRenderNoResultsSlot },
		template: '<single-list-with-render-no-results-slot />',
	}))
	.add('with enableStrictSelection', () => ({
		components: { BaseSingleList },
		props: getKnob('enableStrictSelection', true),
		template: '<base-single-list :subProps="{ enableStrictSelection }"/>',
	}));

storiesOf('List Components/MulitList', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(MultiListReadme, 15),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseMultiList },
		template: '<base-multi-list/>',
	}))
	.add('with title', () => ({
		props: titleKnob('Authors Search'),
		components: { BaseMultiList },
		template: '<base-multi-list :subProps="{ title }"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseMultiList },
		template: '<base-multi-list :subProps="{ compoundClause }"/>',
	}))
	.add('with size', () => ({
		props: size(),
		components: { BaseMultiList },
		template: '<base-multi-list :subProps="{ size }"/>',
	}))
	.add('with filter', () => ({
		components: { BaseMultiList },
		props: filterLabel('Books filter'),
		template: '<base-multi-list :subProps="{ showFilter, filterLabel }" />',
	}))

	.add('without showSearch', () => ({
		components: { BaseMultiList },
		props: getKnob('showSearch', false),
		template: '<base-multi-list :subProps="{ showSearch }"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseMultiList },
		props: defaultValue(['Nora Roberts']),
		template: '<base-multi-list :subProps="{ defaultValue }"/>',
	}))
	.add('without showCount', () => ({
		props: showCount(false),
		components: { BaseMultiList },
		template: '<base-multi-list :subProps="{ showCount }"/>',
	}))
	.add('with selectAllLabel', () => ({
		components: { BaseMultiList },
		props: selectAllLabel('All Authors'),
		template: '<base-multi-list :subProps="{ selectAllLabel }"/>',
	}))
	.add('with placeholder', () => ({
		props: getKnob('placeholder', 'Search for Authors'),
		components: { BaseMultiList },
		template: '<base-multi-list :subProps="{ placeholder }"/>',
	}))
	.add('without showCheckbox', () => ({
		components: { BaseMultiList },
		props: showCheckbox(false),
		template: '<base-multi-list :subProps="{ showCheckbox }"/>',
	}))
	.add('with custom sort', () => ({
		components: { BaseMultiList },
		props: sortBy(),
		template: '<base-multi-list :subProps="{ sortBy }"/>',
	}))
	.add('with render slot', () => ({
		components: { MultiListWithRenderSlot },
		template: '<multi-list-with-render-slot />',
	}))
	.add('with renderItem slot', () => ({
		components: { MultiListWithRenderItemSlot },
		template: '<multi-list-with-render-item-slot />',
	}))
	.add('with renderNoResults', () => ({
		components: { MultiListWithRenderNoResultsSlot },
		template: '<multi-list-with-render-no-results-slot />',
	}))
	.add('with index prop', () => ({
		components: { MultiListWithIndexProp },
		template: '<multi-list-with-index-prop />',
	}));

storiesOf('List Components/SingleDropdownList', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(SingleListDropdownReadme, 15),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseSingleDropdownList },
		template: '<base-single-dropdown-list :subProps="{showFilter: false}"/>',
	}))
	.add('title', () => ({
		components: { BaseSingleDropdownList },
		props: titleKnob('Good Books'),
		template: '<base-single-dropdown-list :subProps="{title, showFilter: false}"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseSingleDropdownList },
		template: '<base-single-dropdown-list :subProps="{ compoundClause }"/>',
	}))
	.add('with size', () => ({
		props: size(),
		components: { BaseSingleDropdownList },
		template: '<base-single-dropdown-list :subProps="{ size , showFilter: false}"/>',
	}))
	.add('with filter', () => ({
		components: { BaseSingleDropdownList },
		props: filterLabel('Books filter'),
		template: '<base-single-dropdown-list :subProps="{ filterLabel, showFilter }"/>',
	}))

	.add('with custom sort', () => ({
		components: { BaseSingleDropdownList },
		props: sortBy(),
		template: '<base-single-dropdown-list :subProps="{ sortBy, showFilter: false}"/>',
	}))
	.add('with renderLabel', () => ({
		components: { BaseSingleDropdownList },
		template:
			// eslint-disable-next-line no-template-curly-in-string
			'<base-single-dropdown-list :subProps="{ renderLabel: function(value) {return `hello ${value}`} }" />',
	}))
	.add('without count', () => ({
		components: { BaseSingleDropdownList },
		props: showCount(false),
		template: '<base-single-dropdown-list :subProps="{ showCount, showFilter: false}"/>',
	}))
	.add('with search', () => ({
		components: { BaseSingleDropdownList },
		props: showSearch(false),
		template: '<base-single-dropdown-list :subProps="{ showSearch, showFilter: false}"/>',
	}))
	.add('with defaultValue', () => ({
		props: defaultValue('Discworld'),
		components: { BaseSingleDropdownList },
		template: '<base-single-dropdown-list :subProps="{ defaultValue, showFilter: false}"/>',
	}))

	.add('With URLParams', () => ({
		props: URLParams(),
		components: { BaseSingleDropdownList },
		template: '<base-single-dropdown-list :subProps="{ URLParams, showFilter: false}"/>',
	}))

	.add('With show search and clear icon', () => ({
		props: getKnob('showClear', true),
		components: { BaseSingleDropdownList },
		template: '<base-single-dropdown-list :subProps="{ showClear, showSearch: true}"/>',
	}))
	.add('with renderItem slot', () => ({
		components: { SingleDropdownListWithRenderItemSlot },
		template: '<single-dropdown-list-with-render-item-slot />',
	}))
	.add('Playground', () => ({
		components: { BaseSingleDropdownList },
		props: Object.keys(
			{},
			titleKnob('Good Books'),
			getKnob('placeholder', 'Select a Book'),
			dataField(),
			size(),
			filterLabel('Books Filter'),
			sortBy(),
			getKnob('showSearch', false),
			getKnob('showClear', true),
			getKnob('showCount', false),
			getKnob('selectAllLabel', 'All Books'),
			defaultValue('Artemis Fowl'),
			URLParams(),
		),
		template:
			'<base-single-dropdown-list :subProps="{ title, dataField, size, filterLabel, showFilter, sortBy, showCount, showSearch, showClear, selectAllLabel, defaultValue, URLParams, placeholder }"/>',
	}))
	.add('with render slot', () => ({
		components: { SingleDropdownListWithRenderSlot },
		template: '<single-dropdown-list-with-render-slot />',
	}))
	.add('with renderNoResults', () => ({
		components: { SingleDropdownListWithRenderNoResultsSlot },
		template: '<single-dropdown-list-with-render-no-results-slot />',
	}));

storiesOf('List Components/MultiDropdownList ', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(MultiListDropdownReadme, 15),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseMultiDropdownList },
		template: '<base-multi-dropdown-list :subProps="{showFilter: false}"/>',
	}))
	.add('title', () => ({
		props: titleKnob('Good Books'),
		components: { BaseMultiDropdownList },
		template: '<base-multi-dropdown-list :subProps="{title, showFilter: false}"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseMultiDropdownList },
		template: '<base-multi-dropdown-list :subProps="{ compoundClause }"/>',
	}))
	.add('with size', () => ({
		props: size(),
		components: { BaseMultiDropdownList },
		template: '<base-multi-dropdown-list :subProps="{ size, showFilter: false}"/>',
	}))
	.add('with filter', () => ({
		components: { BaseMultiDropdownList },
		props: filterLabel('Books Filter'),
		template: '<base-multi-dropdown-list :subProps="{ filterLabel, showFilter }"/>',
	}))

	.add('with custom sort', () => ({
		components: { BaseMultiDropdownList },
		props: sortBy(),
		template: '<base-multi-dropdown-list :subProps="{ sortBy, showFilter: false}"/>',
	}))
	.add('with renderLabel', () => ({
		components: { BaseMultiDropdownList },
		template:
			// eslint-disable-next-line no-template-curly-in-string
			'<base-multi-dropdown-list :subProps="{ renderLabel: function(value) { return Object.keys(value).map(function (item) { return `hello ${item} ` } ) } }" />',
	}))
	.add('without count', () => ({
		components: { BaseMultiDropdownList },
		props: showCount(false),
		template: '<base-multi-dropdown-list :subProps="{ showCount, showFilter: false}"/>',
	}))
	.add('with search', () => ({
		components: { BaseMultiDropdownList },
		props: showSearch(true),
		template: '<base-multi-dropdown-list :subProps="{ showSearch, showFilter: false}"/>',
	}))
	.add('With Select All', () => ({
		components: { BaseMultiDropdownList },
		props: selectAllLabel('All Books'),
		template: '<base-multi-dropdown-list :subProps="{ selectAllLabel, showFilter: false}"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseMultiDropdownList },
		props: defaultValue(['In Death', 'Discworld']),
		template: '<base-multi-dropdown-list :subProps="{ defaultValue, showFilter: false}"/>',
	}))

	.add('With URLParams', () => ({
		components: { BaseMultiDropdownList },
		props: URLParams(),
		template: '<base-multi-dropdown-list :subProps="{ URLParams, showFilter: false}"/>',
	}))

	.add('With show search and clear icon', () => ({
		props: getKnob('showClear', true),
		components: { BaseMultiDropdownList },
		template: '<base-multi-dropdown-list :subProps="{ showClear, showSearch: true}"/>',
	}))
	.add('Playground', () => ({
		components: { BaseMultiDropdownList },
		props: Object.keys(
			titleKnob('Good Books'),
			getKnob('placeholder', 'Select a Book'),
			dataField(),
			size(),
			filterLabel('Books Filter'),
			sortBy(),
			getKnob('showSearch', false),
			getKnob('showClear', true),
			getKnob('showCount', false),
			selectAllLabel('All Books'),
			defaultValue('Artemis Fowl'),
			URLParams(),
		),
		template:
			'<base-multi-dropdown-list :subProps="{ title, dataField, size, filterLabel, showFilter, sortBy, showCount, showSearch, showClear, selectAllLabel, defaultValue, URLParams, placeholder }"/>',
	}))
	.add('with render slot', () => ({
		components: { MultiDropdownListWithRenderSlot },
		template: '<multi-dropdown-list-with-render-slot />',
	}))
	.add('with renderItem slot', () => ({
		components: { MultiDropdownListWithRenderItemSlot },
		template: '<multi-dropdown-list-with-render-item-slot />',
	}))
	.add('with renderNoResults', () => ({
		components: { MultiDropdownListWithRenderNoResultsSlot },
		template: '<multi-dropdown-list-with-render-no-results-slot />',
	}));

storiesOf('Search Components/AIAnswer', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(SearchBoxReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseAIAnswer },
		template: '<base-a-i-answer :subProps="{ showFilter: false }"/>',
	}))
	.add('With showVoiceInput', () => ({
		components: { BaseAIAnswer },
		props: getKnob('showVoiceInput', true),
		template: '<base-a-i-answer :subProps="{ showVoiceInput }"/>',
	}))
	.add('With showIcon', () => ({
		components: { BaseAIAnswer },
		props: getKnob('showIcon', true),
		template: '<base-a-i-answer :subProps="{ showIcon }"/>',
	}))
	.add('with iconPosition prop', () => ({
		components: { BaseAIAnswer },
		props: getKnob('iconPosition', ['left', 'right'], select, 'right'),
		template: '<base-a-i-answer :subProps="{ iconPosition }"/>',
	}))
	.add('with placeholder', () => ({
		props: getKnob('placeholder', 'Search for Intelligent answers!!'),
		components: { BaseAIAnswer },
		template: '<base-a-i-answer :subProps="{ placeholder }"/>',
	}))
	.add('With custom icon', () => ({
		components: { BaseAIAnswer },
		template: '<base-a-i-answer :subProps="{ showIcon: true}" :showCustomIcon="true"/>',
	}))
	.add('With showInput', () => ({
		components: { BaseAIAnswer },
		props: getKnob('showInput', true),
		template: '<base-a-i-answer :subProps="{ showInput }"/>',
	}))
	.add('With enterButton', () => ({
		components: { BaseAIAnswer },
		props: getKnob('enterButton', false),
		template: '<base-a-i-answer :subProps="{ enterButton }"/>',
	}))
	.add('With custom enterButton', () => ({
		components: { BaseAIAnswer },
		template:
			'<base-a-i-answer :subProps="{ enterButton: true }" :showCustomEnterButton="true"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('Book Store AI Assistant'),
		components: { BaseAIAnswer },
		template: '<base-a-i-answer :subProps="{ iconPosition: \'right\', title, }"/>',
	}))
	.add('with themePreset', () => ({
		components: { BaseAIAnswer },
		props: getKnob('themePreset', ['dark', 'light'], select, 'dark'),
		template: '<base-a-i-answer :themePreset="themePreset"/>',
	}))
	.add('With showSourceDocuments', () => ({
		components: { BaseAIAnswer },
		props: getKnob('showSourceDocuments', true),
		template: '<base-a-i-answer :subProps="{ showSourceDocuments }"/>',
	}))
	.add('With renderSourceDocument slot', () => ({
		components: { BaseAIAnswer },
		template:
			'<base-a-i-answer :subProps="{ showSourceDocuments: true}" :renderSourceDocumentSlot="true"/>',
	}))
	.add('With triggerOn - manual', () => ({
		components: { BaseAIAnswer },
		template: '<base-a-i-answer :subProps="{ triggerOn: \'manual\'}" :showCustomTitle="true"/>',
	}))
	.add('With triggerOn - question', () => ({
		components: { BaseAIAnswer },
		template:
			'<base-a-i-answer :subProps="{ triggerOn: \'question\'}" :showCustomTitle="true"/>',
	}))
	.add('With renderTriggerMessage', () => ({
		components: { BaseAIAnswer },
		props: getKnob('renderTriggerMessage', 'Hit 🔨 🎯 to trigger AI 🤖 '),
		template:
			'<base-a-i-answer :subProps="{ triggerOn: \'manual\', renderTriggerMessage}" :showCustomTitle="true"/>',
	}))
	.add('with render slot', () => ({
		components: { BaseAIAnswer },
		template: '<base-a-i-answer :showRenderSlot="true"/>',
	}));

storiesOf('Search Components/SearchBox', module)
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ showFilter: false }"/>',
	}))
	.add('With enableAI', () => ({
		props: getKnob('enableAI', true),
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ enableAI, showFilter: false}"/>',
	}))
	.add('With enableFAQSuggestions', () => ({
		props: getKnob('enableFAQSuggestions', true),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ enableAI, enableFAQSuggestions, searchboxId: \'rs_docs\'}"/>',
	}))
	.add('With FAQSuggestionsConfig', () => ({
		props: {
			enableFAQSuggestions: {
				default: boolean('enableFAQSuggestions', true),
			},
			suggestionSize: {
				default: number('suggestionSize', 1),
			},
			sectionLabel: {
				default: text('sectionLabel', 'FAQs'),
			},
		},
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ enableFAQSuggestions, FAQSuggestionsConfig: {size: suggestionSize, sectionLabel },searchboxId: \'rs_docs\'}"/>',
	}))
	.add('With enableFeaturedSuggestions', () => ({
		props: getKnob('enableFeaturedSuggestions', true),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ enableAI, enableFeaturedSuggestions, searchboxId: \'rs_docs\', showFilter: false}"/>',
	}))
	.add('With featuredSuggestionsConfig', () => ({
		props: getKnob('enableFeaturedSuggestions', true),
		components: { BaseSearchBox },
		template:
			"<base-search-box :subProps=\"{ enableFeaturedSuggestions, featuredSuggestionsConfig: {size: 2, sectionLabel: 'Featured'}, searchboxId: 'rs_docs', showFilter: false}\"/>",
	}))
	.add('With enableAI - askButton', () => ({
		props: getKnob('askButton', true),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ enableAI: true, showFilter: false, AIUIConfig: { askButton }}"/>',
	}))
	.add('With renderAIAnswer slot', () => ({
		components: { SearchBoxWithCustomAIScreen },
		template: '<search-box-with-custom-a-i-screen />',
	}))
	.add('With enterButton', () => ({
		props: getKnob('enterButton', true),
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ enterButton, showFilter: false}"/>',
	}))
	.add('with mode prop', () => ({
		components: { BaseSearchBox },
		props: getKnob('mode', ['select', 'tag'], select, 'tag'),
		template: '<base-search-box :subProps="{ mode }"/>',
	}))
	.add('with title', () => ({
		props: titleKnob('Book Store'),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ iconPosition: \'right\', title, showFilter: false}"/>',
	}))
	.add('with compoundClause', () => ({
		props: compoundClauseKnob(),
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ compoundClause, showFilter: false}"/>',
	}))
	.add('with categoryField', () => ({
		props: titleKnob('Book Store'),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ iconPosition: \'right\', categoryField, showFilter: false}"/>',
	}))
	.add('without search icon', () => ({
		props: getKnob('showIcon', false),
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ showIcon, showFilter: false}"/>',
	}))
	.add('with show clear', () => ({
		components: { BaseSearchBox },
		props: showClear(false),
		template: '<base-search-box :subProps="{ showClear, showFilter: false}"/>',
	}))
	.add('with custom suggestion icons', () => ({
		components: { SearchBoxWithCustomSuggestionIcons },
		template: '<search-box-with-custom-suggestion-icons/>',
	}))
	.add('with debounce', () => ({
		components: { BaseSearchBox },
		props: getKnob('debounce', 300),
		template: '<base-search-box :subProps="{ debounce, showFilter: false}"/>',
	}))
	.add('With strictSelection', () => ({
		components: { BaseSearchBox },
		props: getKnob('strictSelection', true),
		template: '<base-search-box :subProps="{ strictSelection, showFilter: false}"/>',
	}))
	.add('Without autosuggest', () => ({
		components: { BaseSearchBox },
		props: getKnob('autosuggest', false),
		template: '<base-search-box :subProps="{ autosuggest, showFilter: false}"/>',
	}))
	.add('With fuzziness as a number', () => ({
		components: { BaseSearchBox },
		props: getKnob('fuzziness', 1),
		template: '<base-search-box :subProps="{ fuzziness, showFilter: false}"/>',
	}))
	.add('With fuzziness as AUTO', () => ({
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ fuzziness: \'AUTO\', showFilter: false}"/>',
	}))
	.add('With highlight', () => ({
		components: { BaseSearchBox },
		props: highlight(),
		template: '<base-search-box :subProps="{ highlight, showFilter: false}"/>',
	}))
	.add('With voice search', () => ({
		components: { BaseSearchBox },
		props: getKnob('showVoiceSearch', true),
		template: '<base-search-box :subProps="{ showVoiceSearch, showFilter: false}"/>',
	}))
	.add('with iconPosition', () => ({
		components: { BaseSearchBox },
		props: getKnob('iconPosition', ['right', 'left'], select, 'right'),
		template: '<base-search-box :subProps="{ iconPosition, showFilter: false }"/>',
	}))
	.add('with controlledUsage', () => ({
		components: { SearchBoxControlledUsage },
		props: {
			enableFAQSuggestions: {
				default: boolean('enableFAQSuggestions', true),
			},
			suggestionSize: {
				default: number('suggestionSize', 1),
			},
			sectionLabel: {
				default: text('sectionLabel', 'FAQs'),
			},
			enableAI: {
				default: boolean('enableAI', true),
			},
			shouldTriggerQueryWhileTyping: {
				default: boolean('shouldTriggerQueryWhileTyping', true),
			},
		},
		template:
			'<search-box-controlled-usage :subProps="{ enableFAQSuggestions, shouldTriggerQueryWhileTyping, enableAI, FAQSuggestionsConfig: {size: suggestionSize, sectionLabel },searchboxId: \'rs_docs\', showFilter: false}"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseSearchBox },
		props: defaultValue('Harry Potter'),
		template: '<base-search-box :subProps="{ defaultValue, showFilter: false }"/>',
	}))
	.add('with default Suggestions', () => ({
		components: { BaseSearchBox },
		props: getKnob('defaultSuggestions', [
			{ label: 'Sherlock Holmes', value: 'Sherlock Holmes' },
			{ label: 'The Lord of the Rings', value: 'The Lord of the Rings' },
		]),
		template: '<base-search-box :subProps="{ defaultSuggestions, showFilter: false }"/>',
	}))
	.add('with Filters', () => ({
		components: { BaseSearchBox },
		props: filterLabel('Books Search'),
		template: '<base-search-box :subProps="{ showFilter, filterLabel }"/>',
	}))
	.add('with enablePredictiveSuggestions', () => ({
		props: getKnob('enablePredictiveSuggestions', true),
		components: { BaseSearchBox },
		template: '<base-search-box :subProps="{ enablePredictiveSuggestions }"/>',
	}))
	.add('with renderNoSuggestion', () => ({
		components: { BaseSearchBox },
		props: getKnob('renderNoSuggestion', 'No Suggestions Found'),
		template: '<base-search-box :subProps="{ showFilter: true, renderNoSuggestion }"/>',
	}))
	.add('with render slot', () => ({
		components: { SearchBoxWithRenderSlot },
		template: '<search-box-with-render-slot />',
	}))
	.add('with renderItem slot', () => ({
		components: { SearchBoxWithRenderItemSlot },
		template: '<search-box-with-render-item-slot />',
	}))
	.add('with index prop', () => ({
		components: { SearchBoxWithIndexProp },
		template: '<search-box-with-index-prop />',
	}))
	.add('with autoFocus', () => ({
		components: { BaseSearchBox },
		props: getKnob('autoFocus', true),
		template: '<base-search-box :subProps="{ autoFocus }"/>',
	}))
	.add('with focusShortcuts', () => ({
		components: { BaseSearchBox },
		props: getKnob('focusShortcuts', ['/', 'r', 'b']),
		template: '<base-search-box :subProps="{ focusShortcuts }"/>',
	}))
	.add('with addonBefore', () => ({
		components: { SearchBoxWithAddonBeforeSlot },
		template: '<search-box-with-addon-before-slot/>',
	}))
	.add('with addonAfter', () => ({
		components: { SearchBoxWithAddonAfterSlot },
		template: '<search-box-with-addon-after-slot/>',
	}))
	.add('with addonBefore & addonAfter', () => ({
		components: { SearchBoxWithAddonBeforeAfterSlots },
		template: '<search-box-with-addon-before-after-slots/>',
	}))
	.add('with expandSuggestionsContainer', () => ({
		components: { SearchBoxWithAddonBeforeAfterSlots },
		props: getKnob('expandSuggestionsContainer', false),
		template:
			'<search-box-with-addon-before-after-slots :subProps="{ expandSuggestionsContainer }"/>',
	}))
	.add('with enableRecentSuggestions & recentSuggestionsConfig', () => ({
		components: { BaseSearchBox },
		props: Object.assign(
			{},
			getKnob('enableRecentSuggestions', true),
			getKnob('recentSuggestionsConfig', {
				size: 3,
				minChars: 3,
				minHits: 2,
				index: 'good-books-ds',
			}),
		),
		template:
			'<base-search-box :subProps="{ enableRecentSuggestions, recentSuggestionsConfig }"/>',
	}))
	.add('with enablePopularSuggestions & popularSuggestionsConfig', () => ({
		components: { BaseSearchBox },
		props: Object.assign(
			{},
			getKnob('enablePopularSuggestions', true),
			getKnob('popularSuggestionsConfig', {
				size: 3,
				minChars: 3,
				index: 'good-books-ds',
				showGlobal: false,
			}),
		),
		template:
			'<base-search-box :subProps="{ enablePopularSuggestions, popularSuggestionsConfig }"/>',
	}))
	.add('With documentSuggestions', () => ({
		props: {
			enableDocumentSuggestions: { default: boolean('enableDocumentSuggestions', true) },
			documentSuggestionsConfig: {
				default: {
					maxChars: number('maxChars', 6), // only return results until value is within maxChars count limit, optional setting where the default value of maxChars is 6
					from: number('from', 0),
					size: number('size', 5),
					sectionLabel: text('sectionLabel', '🕝 Recent Document Suggestions'),
			  },
			},
		},
		components: { SearchBoxWithDocumentSuggestions },
		template: '<search-box-with-document-suggestions :subProps="{enableDocumentSuggestions, documentSuggestionsConfig}" />',
	}))
	.add('With documentSuggestions + renderItem', () => ({
		props: {
			enableDocumentSuggestions: { default: boolean('enableDocumentSuggestions', true) },
			documentSuggestionsConfig: {
				default: {
					maxChars: number('maxChars', 6), // only return results until value is within maxChars count limit, optional setting where the default value of maxChars is 6
					from: number('from', 0),
					size: number('size', 5),
					sectionLabel: text('sectionLabel', '🕝 Document Suggestions'),
			  },
			},
		},
		components: { SearchBoxWithDocumentSuggestionsRenderItem },
		template: `<search-box-with-document-suggestions-render-item
					:subProps="{
						enableDocumentSuggestions,
						documentSuggestionsConfig,
					}" />`,
	}))
	.add('With documentSuggestions + navigate on click', () => ({
		props: {
			enableDocumentSuggestions: { default: boolean('enableDocumentSuggestions', true) },
			documentSuggestionsConfig: {
				default: {
					maxChars: number('maxChars', 6), // only return results until value is within maxChars count limit, optional setting where the default value of maxChars is 6
					from: number('from', 0),
					size: number('size', 5),
					sectionLabel: text('sectionLabel', '🕝 Document Suggestions'),
			  },
			},
		},
		components: { SearchBoxWithDocumentSuggestionsNavigateOnClick },
		template: `<search-box-with-document-suggestions-navigate-on-click
					:subProps="{
						enableDocumentSuggestions,
						documentSuggestionsConfig,
					}" />`,
	}))
	.add('With showSourceDocuments', () => ({
		props: getKnob('triggerOn', ['manual', 'question'], select),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ enableAI: true, showFilter: false, AIUIConfig: { triggerOn }}"/>',
	}))
	.add('With triggerOn + renderTriggerMessage', () => ({
		props: Object.assign(
			{},
			getKnob('triggerOn', ['manual', 'question'], select),
			getKnob('renderTriggerMessage', 'Click to trigger AIAnswer 🤖🎯'),
		),
		components: { BaseSearchBox },
		template:
			'<base-search-box :subProps="{ enableAI: true, showFilter: false, AIUIConfig: { triggerOn, askButton: true, renderTriggerMessage  }}"/>',
	}));

storiesOf('Result Components/Reactive List', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(ReactiveListReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseReactiveList },
		template: '<base-reactive-list/>',
	}))
	.add('with compoundClause', () => ({
		components: { BaseReactiveList },
		props: compoundClauseKnob(),
		template: '<base-reactive-list :subProps="{ compoundClause }"/>',
	}))
	.add('With pagination', () => ({
		components: { BaseReactiveList },
		props: getKnob('pagination', true),
		template: '<base-reactive-list :subProps="{ pagination }"/>',
	}))
	.add('With Infinite Loading', () => ({
		components: { BaseReactiveList },
		template: '<base-reactive-list/>',
	}))
	.add('with custom sort', () => ({
		components: { BaseReactiveList },
		props: sortBy({ ascending: 'asc', descending: 'desc' }, 'asc'),
		template: '<base-reactive-list :subProps="{ sortBy }"/>',
	}))
	.add('With pagination at top', () => ({
		components: { BaseReactiveList },
		props: paginationAt(),
		template: '<base-reactive-list :subProps="{ pagination: true, paginationAt }"/>',
	}))
	.add('Without resultStats', () => ({
		components: { BaseReactiveList },
		props: getKnob('showResultStats', false),
		template: '<base-reactive-list :subProps="{ showResultStats }"/>',
	}))
	.add('With custom number of pages', () => ({
		components: { BaseReactiveList },
		props: getKnob('currentPage', 10),
		template: '<base-reactive-list :subProps="{ pagination: true, currentPage }"/>',
	}))
	.add('with renderNoResults prop', () => ({
		components: { ReactiveListWithNoResultsSlot },
		props: getKnob('renderNoResults', 'No Results Found!'),
		template: '<reactive-list-with-no-results-slot :subProps="{ renderNoResults }"/>',
	}))
	.add('With custom result stats message', () => ({
		components: { ReactiveListWithCustomResultStatsSlot },
		template: '<reactive-list-with-custom-result-stats-slot />',
	}))
	.add('With card layout', () => ({
		components: { BaseReactiveListCardLayout },
		template: '<base-reactive-list-card-layout />',
	}));

storiesOf('Result Components/ResultList', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(ResultListReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseResultList },
		template: '<base-result-list/>',
	}))
	.add('With pagination', () => ({
		components: { BaseResultList },
		props: getKnob('pagination', true),
		template: '<base-result-list :subProps="{ pagination }"/>',
	}))
	.add('with custom sort', () => ({
		components: { BaseResultList },
		props: sortBy({ ascending: 'asc', descending: 'desc' }, 'asc'),
		template: '<base-result-list :subProps="{ sortBy }"/>',
	}))
	.add('With paginationAt', () => ({
		components: { BaseResultList },
		props: paginationAt(),
		template: '<base-result-list :subProps="{ pagination: true, paginationAt }"/>',
	}))
	.add('With showResultStats', () => ({
		components: { BaseResultList },
		props: getKnob('showResultStats', true),
		template: '<base-result-list :subProps="{ showResultStats }"/>',
	}))
	.add('With custom number of pages', () => ({
		components: { BaseResultList },
		props: getKnob('pages', 2),
		template: '<base-result-list :subProps="{ pagination: true, pages }"/>',
	}));

storiesOf('Result Components/ResultCard', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(ResultCardReadme),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseResultCard },
		template: '<base-result-card/>',
	}))
	.add('With pagination', () => ({
		components: { BaseResultCard },
		props: getKnob('pagination', true),
		template: '<base-result-card :subProps="{ pagination }"/>',
	}))
	.add('with custom sort', () => ({
		components: { BaseResultCard },
		props: sortBy({ ascending: 'asc', descending: 'desc' }, 'asc'),
		template: '<base-result-card :subProps="{ sortBy }"/>',
	}))
	.add('With paginationAt', () => ({
		components: { BaseResultCard },
		props: paginationAt(),
		template: '<base-result-card :subProps="{pagination: true, paginationAt }"/>',
	}))
	.add('With showResultStats', () => ({
		components: { BaseResultCard },
		props: getKnob('showResultStats', true),
		template: '<base-result-card :subProps="{ showResultStats }"/>',
	}))
	.add('With custom number of pages', () => ({
		components: { BaseResultCard },
		props: getKnob('pages', 7),
		template: '<base-result-card :subProps="{ pagination: true, pages }"/>',
	}));

storiesOf('Base components/ReactiveComponent', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(ReactiveComponentReadme, 15),
		},
	})
	.addDecorator(withKnobs)
	.add('A custom component', () => ({
		components: { BaseReactiveComponent },
		template: '<base-reactive-component :subProps="{ pagination: true }"/>',
	}))
	.add('ReactiveComponent with customQuery', () => ({
		components: { BaseReactiveComponent },
		template:
			'<base-reactive-component :subProps="{ customQuery:function() {return { query: {term: {[`brand.keyword`]: `Ford`}} } } }"/>',
	}));

storiesOf('Base components/ToggleButton', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(ToggleButtonReadme, 15),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseToggleButton },
		template: '<base-toggle-button :subProps="{ showFilter: false }"/>',
	}))
	.add('With title', () => ({
		props: titleKnob('ToggleButton: Topics'),
		components: { BaseToggleButton },
		template: '<base-toggle-button :subProps="{ showFilter: false, title }"/>',
	}))
	.add('with compoundClause', () => ({
		components: { BaseToggleButton },
		props: compoundClauseKnob(),
		template: '<base-toggle-button :subProps="{ showFilter: false, compoundClause }"/>',
	}))
	.add('with defaultValue', () => ({
		components: { BaseToggleButton },
		props: getKnob('defaultValue', ['Music']),
		template: '<base-toggle-button :subProps="{ showFilter: false, defaultValue }"/>',
	}))
	.add('With filter', () => ({
		components: { BaseToggleButton },
		props: filterLabel('Topics filter'),
		template: '<base-toggle-button :subProps="{ showFilter, filterLabel }"/>',
	}))
	.add('Without multiSelect', () => ({
		components: { BaseToggleButton },
		props: getKnob('multiSelect', true),
		template: '<base-toggle-button :subProps="{ showFilter: false, multiSelect }"/>',
	}))
	.add('With URLParams', () => ({
		components: { BaseToggleButton },
		props: URLParams(),
		template: '<base-toggle-button :subProps="{ showFilter: false, URLParams }"/>',
	}));

storiesOf('Map components/ReactiveGoogleMap', module)
	.addParameters({
		readme: {
			// sidebar: removeFirstLine(ToggleButtonReadme, 15),
		},
	})
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseReactiveGoogleMap },
		template: '<base-reactive-google-map />',
	}))
	.add('with compoundClause', () => ({
		components: { BaseReactiveGoogleMap },
		props: compoundClauseKnob(),
		template: '<base-reactive-google-map :subProps="{ compoundClause }"/>',
	}))
	.add('With defaultPin', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('defaultPin', './placeholder.png'),
		template: '<base-reactive-google-map :subProps="{ defaultPin }"/>',
	}))
	.add('With showMarkerClusters', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('showMarkerClusters', true),
		template: '<base-reactive-google-map :subProps="{ showMarkerClusters }"/>',
	}))
	.add('With autoCenter', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('autoCenter', true),
		template: '<base-reactive-google-map :subProps="{ autoCenter }"/>',
	}))
	.add('With showSearchAsMove', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('showSearchAsMove', true),
		template: '<base-reactive-google-map :subProps="{ showSearchAsMove }"/>',
	}))
	.add('With searchAsMove', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('searchAsMove', true),
		template: '<base-reactive-google-map :subProps="{ searchAsMove }"/>',
	}))
	.add('With loader', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('loader', 'Loading ...'),
		template: '<base-reactive-google-map :subProps="{ loader }"/>',
	}))
	.add('With size', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('size', 100),
		template: '<base-reactive-google-map :subProps="{ size }"/>',
	}))
	.add('With defaultZoom', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('defaultZoom', 4),
		template: '<base-reactive-google-map :subProps="{ defaultZoom }"/>',
	}))
	.add('With defaultCenter', () => ({
		components: { BaseReactiveGoogleMap },
		props: getKnob('defaultCenter', {
			lat: 40.7128,
			lng: 74.006,
		}),
		template: '<base-reactive-google-map :subProps="{ defaultCenter }"/>',
	}))
	.add('Playground', () => ({
		components: { BaseReactiveGoogleMap },
		props: Object.assign(
			{},
			getKnob('showMarkerClusters', true),
			getKnob('autoCenter', true),
			getKnob('showSearchAsMove', true),
			getKnob('searchAsMove', false),
			getKnob('size', 100),
			getKnob('defaultZoom', 4),
			getKnob('defaultCenter', {
				lat: 40.7128,
				lng: 74.006,
			}),
		),
		template:
			'<base-reactive-google-map :subProps="{ showMarkerClusters, autoCenter, showSearchAsMove, searchAsMove, size, defaultZoom, defaultCenter }"/>',
	}));
