<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
	>
		<div class="row">
			<div class="col">
				<DynamicRangeSlider
					data-field="books_count"
					componentId="BookSensor"
					:rangeLabels="
						(min, max) => {
							return {
								start: min + ' Books',
								end: max + ' Books',
							};
						}
					"
					v-bind="subProps"
					v-on="subEvents"
				/>
			</div>
			<div class="col">
				<SelectedFilters />
				<ReactiveList
					componentId="SearchResult"
					data-field="original_title.keyword"
					class="result-list-container"
					:pagination="true"
					:from="0"
					:size="5"
					:react="{ and: ['BookSensor'] }"
				>
					<template #renderItem="{ item }">
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
												<span
													v-for="(item, index) in Array(
														item.average_rating_rounded,
													)
														.fill('x')
														.slice(0, item.average_rating_rounded)"
													:key="index + Date.now()"
												>
													<i class="fas fa-star" />
												</span>
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
					</template>
				</ReactiveList>
			</div>
		</div>
	</ReactiveBase>
</template>
<script>
export default {
	name: 'BaseDynamicRangeSlider',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
