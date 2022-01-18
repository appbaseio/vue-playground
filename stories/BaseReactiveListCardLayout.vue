<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
	>
		<ReactiveList
			componentId="SearchResult"
			data-field="original_title.keyword"
			class="result-list-container"
			:from="0"
			:size="5"
			:react="{ and: ['BookSensor'] }"
			v-bind="subProps"
			v-on="subEvents"
		>
			<div slot="render" slot-scope="{ data }">
				<ResultCardsWrapper>
					<ResultCard v-bind:key="result._id" :id="result._id" v-for="result in data">
						<ResultCardImage :src="result.image" />
						<ResultCardTitle>
							{{ result.original_title }}
						</ResultCardTitle>
						<ResultCardDescription>
							<div class="flex column justify-space-between">
								<div>
									<div>
										by
										<span class="authors-list">{{ result.authors }}</span>
									</div>
									<div class="ratings-list flex align-center">
										<span class="stars">
											<span
												v-for="(result, index) in Array(
													result.average_rating_rounded,
												)
													.fill('x')
													.slice(0, result.average_rating_rounded)"
												:key="index + Date.now()"
											>
												<i class="fas fa-star" />
											</span>
										</span>
										<span class="avg-rating"
											>({{ result.average_rating }} avg)</span
										>
									</div>
								</div>
								<span class="pub-year"
									>Pub {{ result.original_publication_year }}</span
								>
							</div>
						</ResultCardDescription>
					</ResultCard>
				</ResultCardsWrapper>
			</div>
		</ReactiveList>
	</ReactiveBase>
</template>
<script>
export default {
	name: 'BaseReactiveListCardLayout',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
