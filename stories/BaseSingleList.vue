<template>
  <ReactiveBase
      app="good-books-ds"
      url="https://1e47b838a035:767b5a1a-03cb-4c5f-a536-4f399c24134b@arc-cluster-appbase-tryout-k8dsnj.searchbase.io"
      :enableAppbase="true"
  >
    <div class="row">
      {{JSON.stringify(subProps)}}
      <div class="col">
        <SingleList
          componentId="BookSensor"
          data-field="original_series.keyword"
          v-bind="subProps"
          v-on="subEvents"
        />
      </div>

      <div class="col">
        <selected-filters/>
        <ReactiveList
          componentId="SearchResult"
          data-field="original_title.keyword"
          class="result-list-container"
          :pagination="true"
          :from="0"
          :size="5"
          :react="{and: ['BookSensor']}"
        >
          <div slot="renderItem" slot-scope="{ item }">
            <div class="flex book-content" key="item._id">
              <img :src="item.image" alt="Book Cover" class="book-image">
              <div class="flex column justify-center ml20">
                <div class="book-header">{{ item.original_title }}</div>
                <div class="flex column justify-space-between">
                  <div>
                    <div>
                      by
                      <span class="authors-list">{{ item.authors }}</span>
                    </div>
                    <div class="ratings-list flex align-center">
                      <span class="stars">
                        <span
                          v-for="(item, index) in Array(item.average_rating_rounded).fill('x').slice(0, item.average_rating_rounded)"
                          :key="index + Date.now()"
                        >
                          <i class="fas fa-star"/>
                        </span>
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
      </div>
    </div>
  </ReactiveBase>
</template>
<script>
export default {
	name: 'BaseSingleList',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
