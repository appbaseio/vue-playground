<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://reactivesearch-api-9-4-0.onrender.com"
		credentials="d03e6f5f33d5:49124674-554e-4343-9ab2-006b2932f5c0"
	>
		<div class="row">
			<div class="col">
				<ToggleButton
					componentId="LanguageSensor"
					dataField="language_code.keyword"
					:data="[
						{ label: 'English', value: 'eng' },
						{ label: 'French', value: 'fre' },
						{ label: 'Spanish', value: 'spa' },
					]"
					v-bind="subProps"
					v-on="subEvents"
				/>
			</div>
			<div class="col">
				<SelectedFilters componentId="LanguageSensor" />
				<ReactiveList
					componentId="SearchResult"
					dataField="original_title.keyword"
					title="Results"
					sortBy="asc"
					class="result-list-container"
					:from="0"
					:size="5"
					:pagination="true"
					:react="{
						and: ['LanguageSensor'],
					}"
				>
					<template #renderItem="{ item }">
						<div class="flex book-content" :key="item._id">
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
												<i
													v-for="(star, index) in Array(
														item.average_rating_rounded,
													).fill('x')"
													class="fas fa-star"
													:key="index"
												/>
											</span>
											<span class="avg-rating">({{ item.average_rating }} avg)</span>
										</div>
									</div>
									<span class="pub-year">Pub {{ item.original_publication_year }}</span>
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
	name: 'BaseToggleButton',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
