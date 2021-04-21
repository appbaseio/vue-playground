<template>
	<ReactiveBase
				app="carstore-dataset"
				url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
				:enableAppbase="true"
			>
				<div class="row">
					<div class="col">
						<ReactiveComponent
							componentId="CarSensor"
							:defaultQuery="() => ({
								aggs: {
									'brand.keyword': {
										terms: {
											field: 'brand.keyword',
											order: {
												_count: 'desc',
											},
											size: 1,
										},
									},
								},
							})"
                            distinctField="brand.keyword"
                            :distinctFieldConfig="{
                                inner_hits: {
                                    name: 'most_recent',
                                    size: 5,
                                    sort: [{ timestamp: 'asc' }],
                                },
                                max_concurrent_group_searches: 4,
                            }"
                            :size="10"
							v-bind="subProps"
						>
						<div slot-scope="{ data, setQuery }">
							<CustomComponentForDistinctProp :data="data" :setQuery="setQuery"/>
						</div>
						</ReactiveComponent>
					</div>

					<div class="col">
						<ReactiveList
							componentId="SearchResult"
							dataField="name"
							title="ReactiveList"
							:from="0"
							:size="20"
							:pagination="true"
							:react="{
								and: 'CarSensor',
							}"
						>
						<div slot="renderItem" slot-scope="{ item }">
							<h2>{{item.model}}</h2>
							<p>{{item.price}} - {{item.rating}} stars rated</p>
						</div>
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
}
</script>
