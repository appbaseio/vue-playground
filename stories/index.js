// eslint-disable-next-line
import { storiesOf } from '@storybook/vue';
import BaseReactiveList from './BaseReactiveList.vue';
import BaseDataSearch from './BaseDataSearch.vue';
import BaseMultiList from './BaseMultiList.vue';
import BaseSingleList from './BaseSingleList.vue';
import BaseSingleRange from './BaseSingleRange.vue';
import './styles.css';

storiesOf('Range Components/SingleRange', module)
  .add('Basic', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range/>',
  }))
  .add('With Title', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{title: \'Books Filter\'}"/>',
  }))
  .add('With defaultSelected', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{defaultSelected: \'Rating 3 to 4\'}"/>',
  }))
  .add('Without Radio', () => ({
    components: { BaseSingleRange },
    template: '<base-single-range :subProps="{showRadio: false}"/>',
  }));

storiesOf('List Components/SingleList', module)
  .add('Basic', () => ({
    components: { BaseSingleList },
    template: '<base-single-list/>',
  }))
  .add('With Title', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ title: \'Authors Search\' }"/>',
  }))
  .add('Without Search', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ showSearch: false }"/>',
  }))
  .add('Without Count', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ showCount: false }"/>',
  }))
  .add('With custom Placeholder', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ placeholder: \'Search for Authors\' }"/>',
  }))
  .add('Without Radio', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ showRadio: false }"/>',
  }))
  .add('With sortBy', () => ({
    components: { BaseSingleList },
    template: '<base-single-list :subProps="{ sortBy: \'asc\' }"/>',
  }));

storiesOf('List Components/MulitList', module)
  .add('Basic', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list/>',
  }))
  .add('With Title', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ title: \'Authors Search\' }"/>',
  }))
  .add('Without Search', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showSearch: false }"/>',
  }))
  .add('Without Count', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showCount: false }"/>',
  }))
  .add('With SelectAll Label', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ selectAllLabel: \'All Authors\' }"/>',
  }))
  .add('With custom Placeholder', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ placeholder: \'Search for Authors\' }"/>',
  }))
  .add('Without Checkbox', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ showCheckbox: false }"/>',
  }))
  .add('With sortBy', () => ({
    components: { BaseMultiList },
    template: '<base-multi-list :subProps="{ sortBy: \'asc\' }"/>',
  }));

storiesOf('Search Components/DataSearch', module)
  .add('Basic', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search/>',
  }))
  .add('With Icon Position', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ iconPosition: \'right\' }"/>',
  }))
  .add('With defaultSelected', () => ({
    components: { BaseDataSearch },
    template: '<base-data-search :subProps="{ defaultSelected: \'Harry Potter\' }"/>',
  }));

storiesOf('Result Components/Reactive List', module)
  .add('Basic', () => ({
    components: { BaseReactiveList },
    template: '<base-reactive-list/>',
  }))
  .add('With Pagination', () => ({
    // methods: {
    //   onPageChange: (page, total) => {
    //     console.log('Called page change', page, total);
    //   },
    // },
    components: { BaseReactiveList },
    template: '<base-reactive-list :subProps="{ pagination: true }"/>',
    // template:
    //   '<base-reactive-list :subProps="{ pagination: true }" :subEvents="{ pageChange: onPageChange }"/>',
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
