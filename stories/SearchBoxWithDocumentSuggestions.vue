<template>
	<ReactiveBase
        app="movies-store-app"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:reactivesearchAPIConfig="{
			'recordAnalytics': true,
			'userId': 'test',
			'enableQueryRules': true,
			'emptyQuery': true,
			'suggestionAnalytics': true
		}"
	>
		<SearchBox
            componentId="BookSensor"
            dataField="original_title"
            :includeFields="[
                'original_title',
                'original_language',
                'overview'
            ]"
			v-bind="subProps"
			v-on="subEvents"
		/>
		<SelectedFilters componentId="BookSensor" />
		<reactive-list
            :size="10"
            :show-result-stats="false"
            :react="{
            and: 'BookSensor',
            }"
            :pagination="!isResultsLoading"
            component-id="SearchResult"
            data-field="original_title"
            class="result-list-container"
        >
            <template #renderNoResults>
                <span :style="{ color: '#fff' }">
                    Oops! try searching something else.
                </span>
            </template>
            <template #render="{ data, loading, resultStats }">
                <div
                    v-if="loading"
                    class="results-loader"
                >
                    <img
                    class="loader"
                    src="https://i.pinimg.com/originals/bc/56/b3/bc56b31a50e519be2ed335a47e75bc62.gif"
                    alt="results loading"
                    >
                </div>
                <div v-else>
                    <span :style="{ color: '#fff' }">
                    Showing {{ resultStats.displayedResults }} of total&nbsp;
                    {{ resultStats.numberOfResults }} in {{ resultStats.time }} ms
                    </span>
                    <results-card-wrapper>
                    <card
                        v-for="item in data"
                        v-bind="item"
                        :key="item._id" />
                    </results-card-wrapper>
                </div>
            </template>
      </reactive-list>
	</ReactiveBase>
</template>
<script>
export default {
	name: 'BaseSearchBox',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
<style scoped>
/* layout */

body {
  margin: 0 auto;
  padding-top: 15px;
  font-family: monospace !important;
  background: #000;
  padding: 1rem;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.col {
  flex: 1;
  padding: 15px;
}

.flex {
  display: flex;
}

.wrap {
  flex-wrap: wrap;
}

.column {
  flex-direction: column;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-space-between {
  justify-content: space-between;
}

.text-center {
  text-align: center;
}

@media all and (max-width: 767px) {
  .row {
    flex-direction: column;
  }

  .row > .col:first-child {
    border-right: none;
    max-width: none;
  }
}

.results-loader {
  text-align: center;
}

</style>
