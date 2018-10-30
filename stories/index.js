// eslint-disable-next-line
import { storiesOf } from '@storybook/vue';
import BaseReactiveList from './BaseReactiveList.vue';
import BaseDataSearch from './BaseDataSearch.vue';
import BaseMultiList from './BaseMultiList.vue';
import BaseSingleList from './BaseSingleList.vue';
import BaseSingleRange from './BaseSingleRange.vue';
import BaseReactiveComponent from './BaseReactiveComponent.vue';
import './styles.css';

storiesOf('Range Components/SingleRange', module)
  .add('Basic', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range/>',
  }))
  .add('with title', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{title: \'Books Filter\'}"/>',
  }))
  .add('with defaultSelected', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{defaultSelected: \'Rating 3 to 4\'}"/>',
  }))
  .add('without showRadio', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{showRadio: false}"/>',
  }));

storiesOf('List Components/SingleList', module)
  .add('Basic', () => ({
    components: { BaseSingleList },
    template: '<base-single-list/>',
  }))
  .add('with title', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ title: \'Authors Search\' }"/>',
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
  .add('with sortBy', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ sortBy: \'asc\' }"/>',
  }));

storiesOf('List Components/MulitList', module)
  .add('Basic', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list/>',
  }))
  .add('with title', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ title: \'Authors Search\' }"/>',
  }))
  .add('without showSearch', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showSearch: false }"/>',
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

storiesOf('Search Components/DataSearch', module)
  .add('Basic', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ showFilter: false }"/>',
  }))
  .add('with title', () => ({
    components: { BaseDataSearch },
    template: "<base-data-search :subProps=\"{ iconPosition: 'right', title: 'Book Store', showFilter: false}\"/>",
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
  }));

storiesOf('Result Components/Reactive List', module)
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

storiesOf('Base components/ReactiveComponent', module).add('A custom component', () => ({
  components: { BaseReactiveComponent },
  template: '<base-reactive-component :subProps="{ pagination: true }"/>',
}));
