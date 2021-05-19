<template>
    <div id="app">
        <ReactiveBase
            app="good-books-ds"
            url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
            :enable-appbase="true"
        >
            <div class="row">
                <div class="col">
                    <RangeInput
                        componentId="RatingsSensor"
                        dataField="ratings_count"
                        :range="{
                            start: 3000,
                            end: 50000,
                        }"
                        :rangeLabels="{
                            start: '3K',
                            end: '50K',
                        }"
                        :componentStyle="{
                            margin: '10px'
                        }"
                        :stepValue="1"
                        :includeNullValues="true"
                        className="component-wrapper"
                        :validateRange="validateInputChange"
                        :value="this.$data.currentValue"
                        @change="handleChange"
                        @value-change="handleValueChange"
                        v-bind="subProps"
                        v-on="subEvents"
                    />
                </div>
                <div class="col">
                    <SelectedFilters />
                    <ReactiveList
                        componentId="SearchResult"
                        dataField="original_title.keyword"
                        className="result-list-container"
                        :pagination="true"
                        :from="0"
                        :size="5"
                        :react="{ and: ['BookSensor'] }"
                    >
                        <div slot="renderItem" slot-scope="{ item }">
                            <div class="flex book-content" key="item._id">
                                <img :src="item.image" alt="Book Cover" class="book-image" />
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
                                                    <i
                                                        v-for="(item, index) in Array(
                                                            item.average_rating_rounded,
                                                        ).fill('x')"
                                                        class="fas fa-star"
                                                        :key="index"
                                                    />
                                                </span>
                                                <span class="avg-rating"
                                                    >({{ item.average_rating }} avg)</span
                                                >
                                            </div>
                                        </div>
                                        <span class="pub-year"
                                            >Pub {{ item.original_publication_year }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReactiveList>
                </div>
            </div>
        </ReactiveBase>
    </div>
</template>

<script>
import './styles.css';

export default {
    name: 'BaseRangeInput',
    props: {
		subProps: Object,
		subEvents: Object,
	},
    data() {
        const state = {
            currentValue: {
                start: 0,
                end: 1000
            }
        };
        return state;
    },
    methods: {
        handleValueChange(value) {
            console.log('value ', value);
        },
        handleChange(value) {
            this.$data.currentValue = {
                start: value.start + 200,
                end: value.end - 100,
            };
        },
        validateInputChange(value) {
            const [start, end] = value;
            if (start >= end) {
                return false;
            }
            return true;
        }
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
