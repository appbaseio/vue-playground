<template>
	<ReactiveBase
		app="earthquakes"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		enableAppbase
	>
		<div class="row" style="{ height: 100% }">
			<div class="col">
				<div>
					<SingleList
						componentId="CitySensor"
						dataField="place.keyword"
						showCount
						:size="10"
						title="Input Filter"
					/>
				</div>
			</div>
			<div class="col">
				<ReactiveGoogleMap
					componentId="map"
					dataField="location"
					:style="{ height: 'calc(100vh - 70px)'}"
					:react="{
						and: ['CitySensor', 'VenueSensor'],
					}"
					v-bind="{defaultZoom: 6, ...subProps}"
					v-on="subEvents"
				>
					<div
						slot="renderPopover"
						slot-scope="{ place, magnitude, time }"
						:style="{ margin: 0, maxWidth: '300px', lineHeight: '18px' }"
					>
						<p>
							Earthquake (at) <strong>{{ place }}</strong
							>&nbsp; of maginutde: <code>{{ magnitude }}</code> in the year
							{{ time }}.
						</p>
					</div>
				</ReactiveGoogleMap>
			</div>
		</div>
	</ReactiveBase>
</template>
<script>
import './styles.css';

export default {
	name: 'BaseReactiveGoogleMap',
	props: {
		subProps: Object,
		subEvents: Object,
	},
	mounted() {
		console.log("Props", this.subProps)
	}
};
</script>
