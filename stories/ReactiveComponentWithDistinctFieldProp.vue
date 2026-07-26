<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://reactivesearch-api-9-4-0.onrender.com"
		credentials="d03e6f5f33d5:49124674-554e-4343-9ab2-006b2932f5c0"
		:enableAppbase="true"
	>
		<div class="row">
			<div class="col">
				<ReactiveComponent
					componentId="AuthorSensor"
					:defaultQuery="
						() => ({
							aggs: {
								'authors.keyword': {
									terms: {
										field: 'authors.keyword',
										order: {
											_count: 'desc',
										},
										size: 1,
									},
								},
							},
						})
					"
					:size="10"
					v-bind="subProps"
					v-on="subEvents"
				>
					<template #default="{ data, setQuery }">
						<div>
							<CustomComponentForDistinctProp :data="data" :setQuery="setQuery" />
						</div>
					</template>
				</ReactiveComponent>
			</div>

			<div class="col">
				<ReactiveList
					componentId="SearchResult"
					dataField="original_title.keyword"
					title="ReactiveList"
					:from="0"
					:size="20"
					:pagination="true"
					:react="{
						and: 'AuthorSensor',
					}"
				>
					<template #renderItem="{ item }">
						<h2>{{ item.original_title }}</h2>
						<p>{{ item.authors }} - {{ item.average_rating }} stars rated</p>
					</template>
				</ReactiveList>
			</div>
		</div>
	</ReactiveBase>
</template>
<script>
import CustomComponentForDistinctProp from './CustomComponentForDistinctProp';
export default {
	name: 'BaseReactiveComponent',
	props: {
		subProps: Object,
		subEvents: Object,
	},
	components: { CustomComponentForDistinctProp },
};
</script>
