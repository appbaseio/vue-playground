// eslint-disable-next-line
import { storiesOf } from '@storybook/vue';

import {
	withKnobs,
	text,
	boolean,
	object,
	number,
	select,
} from "@storybook/addon-knobs";

import BaseReactiveList from './BaseReactiveList.vue';
import BaseDataSearch from './BaseDataSearch.vue';
import BaseMultiList from './BaseMultiList.vue';
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
import DataSearchWithRenderSlot from './DataSearchWithRenderSlot';
import SingleListWithRenderSlot from './SingleListWithRenderSlot';
import MultiListWithRenderSlot from './MultiListWithRenderSlot';
import SingleDropdownListWithRenderSlot from './SingleDropdownListWithRenderSlot';
import MultiDropdownListWithRenderSlot from './MultiDropdownListWithRenderSlot';
import DataSearchWithRenderQuerySuggestionsSlot from './DataSearchWithRenderQuerySuggestionsSlot';
import SingleListWithRenderNoResultsSlot from "./SingleListWithRenderNoResultsSlot.vue";
import SingleDropdownListWithRenderNoResultsSlot from "./SingleDropdownListWithRenderNoResultsSlot";
import MultiListWithRenderNoResultsSlot from "./MultiListWithRenderNoResultsSlot.vue";
import MultiDropdownListWithRenderNoResultsSlot from "./MultiDropdownListWithRenderNoResultsSlot";
import DataSearchWithCustomSuggestionIcons from './DataSearchWithCustomSuggestionIcons.vue';
import BaseRangeInput from './BaseRangeInput.vue';
import BaseReactiveGoogleMap from './reactivemaps/BaseReactiveGoogleMap.vue';
import './styles.css';

// README
// Range Components
import SingleRangeReadme from '@appbaseio/reactive-manual-vue/content/docs/range-components/SingleRange.md';
import MultiRangeReadme from '@appbaseio/reactive-manual-vue/content/docs/range-components/MultiRange.md';
import RangeSliderReadme from '@appbaseio/reactive-manual-vue/content/docs/range-components/RangeSlider.md';
import DynamicRangeSliderReadme from '@appbaseio/reactive-manual-vue/content/docs/range-components/DynamicRangeSlider.md';
// import RangeInputReadme from '@appbaseio/reactive-manual-vue/content/docs/range-components/RangeInput.md';
// List Components
import SingleListReadme from '@appbaseio/reactive-manual-vue/content/docs/list-components/SingleList.md';
import MultiListReadme from '@appbaseio/reactive-manual-vue/content/docs/list-components/MultiList.md';
import SingleListDropdownReadme from '@appbaseio/reactive-manual-vue/content/docs/list-components/SingleDropdownList.md';
import MultiListDropdownReadme from '@appbaseio/reactive-manual-vue/content/docs/list-components/MultiDropdownList.md';
import ToggleButtonReadme from '@appbaseio/reactive-manual-vue/content/docs/list-components/ToggleButton.md';
// Search components
import DataSearchReadme from '@appbaseio/reactive-manual-vue/content/docs/search-components/DataSearch.md';
// Result Components
import ReactiveListReadme from '@appbaseio/reactive-manual-vue/content/docs/result-components/ReactiveList.md';
import ResultCardReadme from '@appbaseio/reactive-manual-vue/content/docs/result-components/ResultCard.md';
import ResultListReadme from '@appbaseio/reactive-manual-vue/content/docs/result-components/ResultList.md';
// base components
import ReactiveComponentReadme from '@appbaseio/reactive-manual-vue/content/docs/advanced/ReactiveComponent.md';


const getKnobType = (value) => {
	switch(typeof value) {
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
}

const getKnob = (name, value, type, args, valueType) => ({
	[name]: {
		type: valueType || value.constructor,
		default: (type || getKnobType(value))(name, value, args)
	}
})

const titleKnob = value => getKnob('title', value);
const defaultValue = value => getKnob('defaultValue', value);
const size = (value = 10) => getKnob('size', value);
const filterLabel = (value) => Object.assign({}, getKnob('filterLabel', value), getKnob('showFilter', true));
const showRadio = (value = true) => getKnob('showRadio', value);
const sortBy = (value = { ascending: 'asc', descending: 'desc', count: 'count' }, defaultValue = 'asc') => getKnob('sortBy', value, select, defaultValue, String);
const URLParams = (value = false) => getKnob('URLParams', value);
const dataField = (value = ['original_series.keyword', 'authors.keyword', 'language_code.keyword'], defaultValue = 'original_series.keyword') => getKnob('dataField', value, select, defaultValue);
const paginationAt = (value = ['top', 'bottom', 'both'], defaultValue = 'bottom') => getKnob('paginationAt', value, select, defaultValue);
const selectAllLabel = (value) => getKnob('selectAllLabel', value);
const showCount = (value = true) => getKnob('showCount', value);
const showClear = (value = true) => getKnob('showClear', value);
const highlight = (value = true) => getKnob('highlight', value);
const showCheckbox = (value = true) => getKnob('showCheckbox', value);

function removeFirstLine(str, number = 12) {
  while (number--) {
    str = str.substring(str.indexOf("\n") + 1);
  }
  return str;
}

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
  .add('with defaultValue', () => ({
		props: defaultValue('Rating < 3'),
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{defaultValue, showFilter: false}"/>',
  }), {
		knobs: {
			escapeHTML: false
		}
	})
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
  .add('with defaultValue', () => ({
		props: defaultValue('Rating < 3'),
    components: { BaseMultiRange },
    template: '<base-multi-range :subProps="{defaultValue, showFilter: false}"/>',
  }), {
		knobs: {
			timestamps: true,
			escapeHTML: false
		}
	})
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
   .add('with defaultValue', () => ({
		components: { BaseRangeSlider },
		props: defaultValue({ start: 3000, end: 9000 }),
    template: '<base-range-slider :subProps="{ defaultValue, showFilter: false}"/>',
	}))

storiesOf('Range Components/RangeInput', module)
	.addParameters({
		readme: {
			// sidebar: removeFirstLine(RangeInputReadme),
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
   .add('with defaultValue', () => ({
	components: { BaseRangeInput },
	props: defaultValue({ start: 3000, end: 9000 }),
    template: '<base-range-input :subProps="{ defaultValue, showFilter: false}"/>',
	}))

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
	.add('with defaultValue', () => ({
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ defaultValue: function(min, max){ return { start: min + 1000, end: max - 1000} }, showFilter: false}"/>',
	}))

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
	template: '<single-list-with-render-slot />'
  }))
  .add('with renderNoResults', () => ({
	components: { SingleListWithRenderNoResultsSlot },
	template: '<single-list-with-render-no-results-slot />'
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
	template: '<multi-list-with-render-slot />'
  }))
  .add('with renderNoResults', () => ({
	components: { MultiListWithRenderNoResultsSlot },
	template: '<multi-list-with-render-no-results-slot />'
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
		template: '<base-single-dropdown-list :subProps="{ renderLabel: function(value) {return `hello ${value}`} }" />',
	}))
    .add('without count', () => ({
		components: { BaseSingleDropdownList },
		props: showCount(false),
    template: '<base-single-dropdown-list :subProps="{ showCount, showFilter: false}"/>',
  }))
    .add('with defaultValue', () => ({
		props: defaultValue('Artemis Fowl'),
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ defaultValue, showFilter: false}"/>',
  }))

    .add('With URLParams', () => ({
		props: URLParams(),
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ URLParams, showFilter: false}"/>',
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
			getKnob('showCount', false),
			getKnob('selectAllLabel', 'All Books'),
			defaultValue('Artemis Fowl'),
			URLParams()
		),
    template: '<base-single-dropdown-list :subProps="{ title, dataField, size, filterLabel, showFilter, sortBy, showCount, showSearch, selectAllLabel, defaultValue, URLParams, placeholder }"/>',
  }))
	.add('with render slot', () => ({
		components: { SingleDropdownListWithRenderSlot },
		template: '<single-dropdown-list-with-render-slot />'
	}))
	.add('with renderNoResults', () => ({
		components: { SingleDropdownListWithRenderNoResultsSlot },
		template: '<single-dropdown-list-with-render-no-results-slot />'
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
		template: '<base-multi-dropdown-list :subProps="{ renderLabel: function(value) { return Object.keys(value).map(function (item) { return `hello ${item} ` } ) } }" />',
	}))
    .add('without count', () => ({
		components: { BaseMultiDropdownList },
		props: showCount(false),
    template: '<base-multi-dropdown-list :subProps="{ showCount, showFilter: false}"/>',
  }))

    .add('With Select All', () => ({
		components: { BaseMultiDropdownList },
		props: selectAllLabel('All Books'),
    template: '<base-multi-dropdown-list :subProps="{ selectAllLabel, showFilter: false}"/>',
  }))

    .add('with defaultValue', () => ({
    components: { BaseMultiDropdownList },
		props: defaultValue([
			"In Death",
			"Discworld"
		]),
    template: '<base-multi-dropdown-list :subProps="{ defaultValue, showFilter: false}"/>',
  }))

    .add('With URLParams', () => ({
    components: { BaseMultiDropdownList },
		props: URLParams(),
    template: '<base-multi-dropdown-list :subProps="{ URLParams, showFilter: false}"/>',
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
			getKnob('showCount', false),
			selectAllLabel('All Books'),
			defaultValue('Artemis Fowl'),
			URLParams()
		),
    template: '<base-multi-dropdown-list :subProps="{ title, dataField, size, filterLabel, showFilter, sortBy, showCount, showSearch, selectAllLabel, defaultValue, URLParams, placeholder }"/>',
  }))
	.add('with render slot', () => ({
		components: { MultiDropdownListWithRenderSlot },
		template: '<multi-dropdown-list-with-render-slot />'
	}))
	.add('with renderNoResults', () => ({
		components: { MultiDropdownListWithRenderNoResultsSlot },
		template: '<multi-dropdown-list-with-render-no-results-slot />'
	}));

storiesOf('Search Components/DataSearch', module)
	.addParameters({
		readme: {
			sidebar: removeFirstLine(DataSearchReadme),
		},
	})
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ showFilter: false }"/>',
  }))
  .add('with title', () => ({
		props: titleKnob('Book Store'),
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ iconPosition: 'right', title, showFilter: false}\"/>",
  }))
  .add('without search icon', () => ({
		props: getKnob('showIcon', false),
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ showIcon, showFilter: false}\"/>",
  }))
  .add('with show clear', () => ({
		components: { BaseDataSearch },
		props: showClear(false),
    template: "<base-data-search :subProps=\"{ showClear, showFilter: false}\"/>",
  }))
  .add('with custom suggestion icons', () => ({
		components: { DataSearchWithCustomSuggestionIcons },
		template: "<data-search-with-custom-suggestion-icons/>",
	}))
  .add('with debounce', () => ({
		components: { BaseDataSearch },
		props: getKnob('debounce', 300),
    template: "<base-data-search :subProps=\"{ debounce, showFilter: false}\"/>",
  }))
  .add('With strictSelection', () => ({
		components: { BaseDataSearch },
		props: getKnob('strictSelection', true),
    template: "<base-data-search :subProps=\"{ strictSelection, showFilter: false}\"/>",
  }))
  .add('Without autosuggest', () => ({
		components: { BaseDataSearch },
		props: getKnob('autosuggest', false),
    template: "<base-data-search :subProps=\"{ autosuggest, showFilter: false}\"/>",
  }))
  .add('With fuzziness as a number', () => ({
		components: { BaseDataSearch },
		props: getKnob('fuzziness', 1),
    template: "<base-data-search :subProps=\"{ fuzziness, showFilter: false}\"/>",
  }))
  .add('With fuzziness as AUTO', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ fuzziness: 'AUTO', showFilter: false}\"/>",
  }))
   .add('With highlight', () => ({
		components: { BaseDataSearch },
		props: highlight(),
    template: "<base-data-search :subProps=\"{ highlight, showFilter: false}\"/>",
  }))

  .add('with iconPosition', () => ({
		components: { BaseDataSearch },
		props: getKnob('iconPosition', ['right', 'left'], select, 'right'),
    template: '<base-data-search :subProps="{ iconPosition, showFilter: false }"/>',
  }))
  .add('with defaultValue', () => ({
		components: { BaseDataSearch },
		props: defaultValue('Harry Potter'),
    template: '<base-data-search :subProps="{ defaultValue, showFilter: false }"/>',
  }))
  .add('with Filters', () => ({
		components: { BaseDataSearch },
		props: filterLabel('Books Search'),
    template: '<base-data-search :subProps="{ showFilter, filterLabel }"/>',
  }))
	.add('with parse suggestions', () => ({
		components: { BaseDataSearch },
		template: '<base-data-search :subProps="{ parseSuggestion: function(suggestion) { return { label: `hello ${suggestion.source.original_title}`, value: suggestion.source.original_title } } }"/>',
	}))
	.add('with enablePredictiveSuggestions', () => ({
		props: getKnob('enablePredictiveSuggestions', true),
		components: { BaseDataSearch },
		template: '<base-data-search :subProps="{ enablePredictiveSuggestions }"/>',
	}))
  .add('with renderNoSuggestion', () => ({
		components: { BaseDataSearch },
		props: getKnob('renderNoSuggestion', 'No Suggestions Found'),
    template: '<base-data-search :subProps="{ showFilter: true, renderNoSuggestion }"/>',
  }))
	.add('with render slot', () => ({
		components: { DataSearchWithRenderSlot },
		template: '<data-search-with-render-slot />'
	}))
	.add('with enableQuerySuggestions', () => ({
		components: { BaseDataSearch },
		template: '<base-data-search :subProps="{ enableQuerySuggestions: true }"/>',
	}))
	.add('with renderQuerySuggestions', () => ({
		components: { DataSearchWithRenderQuerySuggestionsSlot },
		template: '<data-search-with-render-query-suggestions-slot />',
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
	.add('A custom component', () => ({
		components: { BaseReactiveComponent },
		template: '<base-reactive-component :subProps="{ pagination: true }"/>',
	}))
	.add('ReactiveComponent with customQuery', () => ({
		components: { BaseReactiveComponent },
		template: '<base-reactive-component :subProps="{ customQuery:function() {return { query: {term: {[`brand.keyword`]: `Ford`}} } } }"/>',
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
  }))

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
  .add('With defaultPin', () => ({
    components: { BaseReactiveGoogleMap },
	props: getKnob('defaultPin', "./placeholder.png"),
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
	props: getKnob('loader', "Loading ..."),
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
		lng: 74.0060
	}),
	template: '<base-reactive-google-map :subProps="{ defaultCenter }"/>',
  }))
  .add('Playground', () => ({
    components: { BaseReactiveGoogleMap },
	props: Object.assign({},
		getKnob('showMarkerClusters', true),
		getKnob('autoCenter', true),
		getKnob('showSearchAsMove', true),
		getKnob('searchAsMove', false),
		getKnob('size', 100),
		getKnob('defaultZoom', 4),
		getKnob('defaultCenter', {
			lat: 40.7128,
			lng: 74.0060
		}),
	),
	template: '<base-reactive-google-map :subProps="{ showMarkerClusters, autoCenter, showSearchAsMove, searchAsMove, size, defaultZoom, defaultCenter }"/>',
  }))
