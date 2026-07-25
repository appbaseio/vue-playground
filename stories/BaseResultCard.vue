<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://reactivesearch-api-9-4-0.onrender.com"
		credentials="d03e6f5f33d5:49124674-554e-4343-9ab2-006b2932f5c0"
		:enableAppbase="true"
	>
		<ReactiveList
			componentId="SearchResult"
			dataField="original_title.keyword"
			:from="0"
			:size="5"
			v-bind="subProps"
			v-on="subEvents"
		>
			<template #render="{ data }">
				<ResultCardsWrapper>
					<ResultCard v-bind:key="result._id" v-for="result in data">
						<ResultCardImage :src="result.image" />
						<ResultCardTitle>
							{{ result.original_title }}
						</ResultCardTitle>
						<ResultCardDescription>
							<div>
								<p>
									<em>by {{ result.authors }}</em>
								</p>
								<p>
									<b>{{ result.average_rating }}</b> ⭐
								</p>
								<span>Pub {{ result.original_publication_year }}</span>
							</div>
						</ResultCardDescription>
					</ResultCard>
				</ResultCardsWrapper></template
			>
		</ReactiveList>
	</ReactiveBase>
</template>
<script>
export default {
	name: 'BaseResultCard',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
