// eslint-disable-next-line
import { storiesOf } from '@storybook/vue';
import './styles.css';

storiesOf('Result Components', module).add('Reactive List', () => ({
  template: `<ReactiveBase app="good-books-ds" credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d" >
  <ReactiveList
    componentId="SearchResult"
    dataField="original_title.raw"
    className="result-list-container"
    :pagination="true"
    :from="0"
    :size="5"
    :react="{and: ['BookSensor']}"
  >
      <div slot="onData" slot-scope="{ item }">
      <div class="flex book-content" key="item._id">
		    <img :src="item.image" alt="Book Cover" class="book-image" />
        <div class="flex column justify-center ml20">
          <div class="book-header">{{ item.original_title }}</div>
          <div class="flex column justify-space-between">
            <div>
              <div>
                by <span class="authors-list">{{ item.authors }}</span>
              </div>
              <div class="ratings-list flex align-center">
                <span class="stars">
                  <i v-for="(item, index) in Array(item.average_rating_rounded).fill('x')" class="fas fa-star" :key="index" />
                </span>
                <span class="avg-rating">({{item.average_rating}} avg)</span>
              </div>
            </div>
            <span class="pub-year">Pub {{item.original_publication_year}}</span>
          </div>
        </div>
        </div>
      </div>
  </ReactiveList>
  </ReactiveBase>`,
}));
