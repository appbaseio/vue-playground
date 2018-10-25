<template>
	<ReactiveBase
				app="car-store"
				credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
			>
				<div class="row">
					<div class="col">
						<ReactiveComponent
							componentId="CarSensor"
							:defaultQuery="() => ({
								aggs: {
									'brand.raw': {
										terms: {
											field: 'brand.raw',
											order: {
												_count: 'desc',
											},
											size: 10,
										},
									},
								},
							})"
						>
						<div slot-scope="{ aggregations, setQuery }">
							<CustomComponent :aggregations="aggregations" :setQuery="setQuery"/>
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
						<div slot="onData" slot-scope="{ item }">
							<h2>{{item.name}}</h2>
							<p>{{item.price}} - {{item.rating}} stars rated</p>
						</div>
						</ReactiveList>
					</div>
				</div>
			</ReactiveBase>
</template>
<script>
import CustomComponent from './CustomComponent.vue';
export default {
	name: 'BaseReactiveComponent',
	props: {
		subProps: Object,
		subEvents: Object,
	},
	components: { CustomComponent },
}
</script>
