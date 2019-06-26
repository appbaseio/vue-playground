// eslint-disable-next-line
import { storiesOf } from '@storybook/vue';

import {
  withKnobs,
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
import './styles.css';

storiesOf('Range Components/SingleRange', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{ showFilter: false }"/>',
  }))
  .add('with title', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{ title: text(\'title\',\' Books Filter \'), showFilter: false}"/>',
  }))
  .add('with defaultSelected', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{defaultSelected: text(\'defaultSelected\',\'Rating 3 to 4\'), showFilter: false}"/>',
  }))
   .add('with filter', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{ filterLabel: text(\'filterLabel\',\'Books filter\'),  showFilter: false }"/>',
  }))

  .add('without showRadio', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{showRadio: boolean(\'showRadio\',false)}"/>',
  }));

storiesOf('Range Components/MultiRange', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseMultiRange },
    template: '<base-multi-range :subProps="{ showFilter: false }"/>',
  }))
  .add('with title', () => ({
    components: { BaseMultiRange },
    template: '<base-multi-range :subProps="{ title: text(\'title\',\' Books Filter \'), showFilter: false}"/>',
  }))
  .add('with defaultSelected', () => ({
    components: { BaseMultiRange },
    template: '<base-multi-range :subProps="{defaultSelected: text(\'defaultSelected\',\'Rating 3 to 4\'), showFilter: false}"/>',
  }))
   .add('with filter', () => ({
    components: { BaseMultiRange },
    template: '<base-multi-range :subProps="{ filterLabel: text(\'filterLabel\',\'Books filter\'),  showFilter: boolean(\'showFilter\',true) }"/>',
  }))
  .add('without showCheckbox', () => ({
    components: { BaseMultiRange },
    template: '<base-multi-range :subProps="{showCheckbox: boolean(\'showCheckbox\',false)}"/>',
  }));

storiesOf('Range Components/RangeSlider', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseRangeSlider },
    template: '<base-range-slider :subProps="{ showFilter: false }"/>',
  }))
  .add('with title', () => ({
    components: { BaseRangeSlider },
    template: '<base-range-slider :subProps="{ title: text(\'title\',\'RangeSlider: Ratings \')}"/>',
  }))
   .add('with defaultSelected', () => ({
    components: { BaseRangeSlider },
    template: '<base-range-slider :subProps="{ defaultSelected: object(\'defaultSelected\', { start: 3000, end: 9000 }), showFilter: false}"/>',
	}))

storiesOf('Range Components/DynamicRangeSlider', module)
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ showFilter: false }"/>',
	}))
	.add('with title', () => ({
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ title: text(\'title\',\'DynamicRangeSlider: Ratings \')}"/>',
	}))
	.add('with defaultSelected', () => ({
		components: { BaseDynamicRangeSlider },
		template: '<base-dynamic-range-slider :subProps="{ defaultSelected: function(min, max){ return { start: min + 1000, end: max - 1000} }, showFilter: false}"/>',
	}))

storiesOf('List Components/SingleList', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseSingleList },
    template: '<base-single-list/>',
  }))
  .add('with title', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ title: \'Authors Search\' }"/>',
  }))
  .add('with size', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ size: 10 }"/>',
  }))
  .add('without showSearch', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ showSearch: false }"/>',
  }))
  .add('without showCount', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ showCount: false }"/>',
  }))
  .add('with placeholder', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ placeholder: \'Search for Authors\' }"/>',
  }))
  .add('without showRadio', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ showRadio: false }"/>',
  }))
  .add('defaultSelected', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ defaultSelected: \'Hercule Poirot\' }"/>',
  }))
  .add('with custom sort', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ sortBy: select(\'sortBy\', { asc: \'asc\', count: \'count\'}, \'asc\' ) }"/>',
  }));

storiesOf('List Components/MulitList', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list/>',
  }))
  .add('with title', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ title: \'Authors Search\' }"/>',
  }))
  .add('with size', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ size: 10 }"/>',
  }))
  .add('with filter', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showFilter: true, filterLabel: \'Books filter\' }" />',
  }))

  .add('without showSearch', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showSearch: false }"/>',
  }))
  .add('Default Selected', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ defaultSelected: \'Nora Roberts\' }"/>',
  }))
  .add('without showCount', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showCount: false }"/>',
  }))
  .add('with selectAllLabel', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ selectAllLabel: \'All Authors\' }"/>',
  }))
  .add('with placeholder', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ placeholder: \'Search for Authors\' }"/>',
  }))
  .add('without showCheckbox', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showCheckbox: false }"/>',
  }))
  .add('with sortBy', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ sortBy: \'asc\' }"/>',
  }));

storiesOf('List Components/SingleDropdownList', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{showFilter: false}"/>',
  }))
  .add('title', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{title: text(\'title\',\' Good Books \') ,showFilter: false}"/>',
  }))
   .add('with size', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ size: number(\'size\',10) , showFilter: false}"/>',
  }))
   .add('with filter', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ filterLabel: text(\'filterLabel\',\'Books filter\'), showFilter: boolean(\'showFilter\',true)}"/>',
  }))

    .add('with custom sort', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ sortBy: select(\'sortBy\', { asc: \'asc\', description: \'desc\', count: \'count\'}, \'asc\' ), showFilter: false}"/>',
  }))
    .add('without count', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ showCount: boolean(\'showCount\',false), showFilter: false}"/>',
  }))

    .add('with defaultSelected', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ defaultSelected: text(\'defaultSelected\',\'Artemis Fowl\'), showFilter: false}"/>',
  }))

    .add('With URLParams', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ URLParams: boolean(\'URLParams (not visible on storybook )\',false), showFilter: false}"/>',
  }))

    .add('Playground', () => ({
    components: { BaseSingleDropdownList },
    template: '<base-single-dropdown-list :subProps="{ title: text(\'title\',\' Good Books \'),dataField: select(\'dataField\', [\'original_series.raw\', \'authors.raw\', \'language_code.raw\'], \'original_series.raw\'), size: number(\'size\',10),filterLabel: text(\'filterLabel\',\'Books filter\'), showFilter: boolean(\'showFilter\',true),sortBy: select(\'sortBy\', { asc: \'asc\', description: \'desc\', count: \'count\'}, \'asc\' ), showCount: boolean(\'showCount\',false), showSearch: boolean(\'showSearch\',true), selectAllLabel: text(\'selectAllLabel\',\'All Books\'), defaultSelected: text(\'defaultSelected\',\'Artemis Fowl\'),URLParams: boolean(\'URLParams (not visible on storybook )\',false), placeholder: text(\'placeholder\',\' Select a Book \')    }"/>',
  }))


storiesOf('List Components/MultiDropdownList ', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{showFilter: false}"/>',
  }))
  .add('title', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{title: text(\'title\',\' Good Books \') ,showFilter: false}"/>',
  }))
   .add('with size', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{ size: number(\'size\',10) , showFilter: false}"/>',
  }))
   .add('with filter', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{ filterLabel: text(\'filterLabel\',\'Books filter\'), showFilter: boolean(\'showFilter\',true)}"/>',
  }))

    .add('with custom sort', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{ sortBy: select(\'sortBy\', { asc: \'asc\', description: \'desc\', count: \'count\'}, \'asc\' ), showFilter: false}"/>',
  }))
    .add('without count', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{ showCount: boolean(\'showCount\',false), showFilter: false}"/>',
  }))

    .add('With Select All', () => ({
    components: { BaseMultiDropdownList },
    template: '<base-multi-dropdown-list :subProps="{ selectAllLabel: text(\'selectAllLabel\',\'All Books\'), showFilter: false}"/>',
  }))

    .add('with defaultSelected', () => ({
    components: { BaseMultiDropdownList },

    template: '<base-multi-dropdown-list :subProps="{ defaultSelected: text(\'defaultSelected\',\'Artemis Fowl\'), showFilter: false}"/>',
  }))

    .add('With URLParams', () => ({
    components: { BaseMultiDropdownList },

    template: '<base-multi-dropdown-list :subProps="{ URLParams: boolean(\'URLParams (not visible on storybook )\',false), showFilter: false}"/>',
  }))

    .add('Playground', () => ({
    components: { BaseMultiDropdownList },

    template: '<base-multi-dropdown-list :subProps="{ title: text(\'title\',\' Good Books \'),dataField: select(\'dataField\', [\'original_series.raw\', \'authors.raw\', \'language_code.raw\'], \'original_series.raw\'), size: number(\'size\',10),filterLabel: text(\'filterLabel\',\'Books filter\'), showFilter: boolean(\'showFilter\',true),sortBy: select(\'sortBy\', { asc: \'asc\', description: \'desc\', count: \'count\'}, \'asc\' ), showCount: boolean(\'showCount\',false), showSearch: boolean(\'showSearch\',true), selectAllLabel: text(\'selectAllLabel\',\'All Books\'), defaultSelected: text(\'defaultSelected\',\'Artemis Fowl\'),URLParams: boolean(\'URLParams (not visible on storybook )\',false), placeholder: text(\'placeholder\',\' Select a Book \')    }"/>',
  }))

storiesOf('Search Components/DataSearch', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ showFilter: false }"/>',
  }))
  .add('with title', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ iconPosition: 'right', title: 'Book Store', showFilter: false}\"/>",
  }))
  .add('without search icon', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ showIcon: false, showFilter: false}\"/>",
  }))
  .add('with show clear', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ showClear: boolean(\'showClear\',true), showFilter: false}\"/>",
  }))
  .add('with debounce', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ debounce: 300, showFilter: false}\"/>",
  }))
  .add('With strictSelection', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ strictSelection: true, showFilter: false}\"/>",
  }))
  .add('Without autosuggest', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ autosuggest: false, showFilter: false}\"/>",
  }))
  .add('With fuzziness as a number', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ fuzziness: number(\'fuzziness'\, 1), showFilter: false}\"/>",
  }))
  .add('With fuzziness as AUTO', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ fuzziness: 'AUTO', showFilter: false}\"/>",
  }))
   .add('With highlight', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ highlight: boolean(\'highlight\',true), showFilter: false}\"/>",
  }))

  .add('with iconPosition', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ iconPosition: \'right\', showFilter: false }"/>',
  }))
  .add('with defaultSelected', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ defaultSelected: \'Harry Potter\', showFilter: false }"/>',
  }))
  .add('with Filters', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ showFilter: true }"/>',
  }))
  .add('with renderNoSuggestion', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ showFilter: true, renderNoSuggestion: \'No Suggestions Found\' }"/>',
  }));

storiesOf('Result Components/Reactive List', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list/>',
  }))
  .add('With pagination', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list :subProps="{ pagination: true }"/>',
  }))
  .add('With Infinite Loading', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list/>',
  }))
  .add('With sortBy', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list :subProps="{ sortBy: \'asc\' }"/>',
  }))
  .add('With pagination at top', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list :subProps="{ pagination: true, paginationAt: \'top\' }"/>',
  }))
  .add('Without resultStats', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list :subProps="{ showResultStats: false }"/>',
  }))
  .add('With custom number of pages', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list :subProps="{ pagination: true, pages: 10 }"/>',
	}));
storiesOf('Result Components/ResultList', module)
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseResultList },
		template: '<base-result-list/>',
	}))
	.add('With pagination', () => ({
		components: { BaseResultList },
		template: '<base-result-list :subProps="{ pagination: boolean(\'pagination\',false) }"/>',
	}))
	.add('With sortBy', () => ({
		components: { BaseResultList },
		template: '<base-result-list :subProps="{ sortBy: text(\'sortBy\',\'asc\') }"/>',
	}))
	.add('With paginationAt', () => ({
		components: { BaseResultList },
		template: '<base-result-list :subProps="{pagination: true, paginationAt: text(\'paginationAt\',\'top\') }"/>',
	}))
	.add('With showResultStats', () => ({
		components: { BaseResultList },
		template: '<base-result-list :subProps="{ showResultStats: boolean(\'showResultStats\', true) }"/>',
	}))
	.add('With custom number of pages', () => ({
		components: { BaseResultList },
    template: '<base-result-list :subProps="{ pagination: true, pages: number(\'pages\',2) }"/>',
  }));

storiesOf('Result Components/ResultCard', module)
	.addDecorator(withKnobs)
	.add('Basic', () => ({
		components: { BaseResultCard },
		template: '<base-result-card/>',
	}))
	.add('With pagination', () => ({
		components: { BaseResultCard },
		template: '<base-result-card :subProps="{ pagination: boolean(\'pagination\',false) }"/>',
	}))
	.add('With sortBy', () => ({
		components: { BaseResultCard },
		template: '<base-result-card :subProps="{ sortBy: text(\'sortBy\',\'asc\') }"/>',
	}))
	.add('With paginationAt', () => ({
		components: { BaseResultCard },
		template: '<base-result-card :subProps="{pagination: true, paginationAt: text(\'paginationAt\',\'top\') }"/>',
	}))
	.add('With showResultStats', () => ({
		components: { BaseResultCard },
		template: '<base-result-card :subProps="{ showResultStats: boolean(\'showResultStats\', true) }"/>',
	}))
	.add('With custom number of pages', () => ({
		components: { BaseResultCard },
		template: '<base-result-card :subProps="{ pagination: true, pages: number(\'pages\',7) }"/>',
	}));

storiesOf('Base components/ReactiveComponent', module).add('A custom component', () => ({
  components: { BaseReactiveComponent },
  template: '<base-reactive-component :subProps="{ pagination: true }"/>',
}));
storiesOf('Base components/ToggleButton', module)
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    components: { BaseToggleButton },
    template: '<base-toggle-button :subProps="{ showFilter: false }"/>',
  }))
  .add('With title', () => ({
    components: { BaseToggleButton },
    template: '<base-toggle-button :subProps="{ showFilter: false, title: text(\'title\',\'ToggleButton: Topics\') }"/>',
  }))
  .add('With Default Selected', () => ({
    components: { BaseToggleButton },
    template: '<base-toggle-button :subProps="{ showFilter: false, defaultValue: array(\'defaultValue\',[\'Music\']) }"/>',
  }))
  .add('With filter', () => ({
    components: { BaseToggleButton },
    template: '<base-toggle-button :subProps="{ showFilter: boolean(\'showFilter\', true), filterLabel: text(\'filterLabel\', \'Topics filter\') }"/>',
  }))
  .add('Without multiSelect', () => ({
    components: { BaseToggleButton },
    template: '<base-toggle-button :subProps="{ showFilter: false, multiSelect: boolean(\'multiSelect\', false) }"/>',
  }))
  .add('With URLParams', () => ({
    components: { BaseToggleButton },
    template: '<base-toggle-button :subProps="{ showFilter: false, URLParams: boolean(\'URLParams (not visible on storybook)\', true) }"/>',
  }))
