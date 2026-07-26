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
				<ResultListWrapper>
					<ResultList v-bind:key="result._id" v-for="result in data">
						<ResultListImage :src="result.image" />
						<ResultListContent>
							<ResultListTitle>
								{{ result.original_title }}
							</ResultListTitle>
							<ResultListDescription>
								<div>
									<p>
										<em>by {{ result.authors }}</em>
									</p>
									<p>
										<b>{{ result.average_rating }}</b> ⭐
									</p>
									<span>Pub {{ result.original_publication_year }}</span>
								</div>
							</ResultListDescription>
						</ResultListContent>
					</ResultList>
				</ResultListWrapper>
			</template
			>
		</ReactiveList>
	</ReactiveBase>
</template>
<script>
export default {
	name: 'BaseResultList',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
