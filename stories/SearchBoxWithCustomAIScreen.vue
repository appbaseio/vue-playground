<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
	>
		<SearchBox
			className="result-list-container"
			componentId="BookSensor"
			:dataField="['original_title', 'original_title.search']"
			v-bind="subProps"
			v-on="subEvents"
			:enableAI="true"
		>
			<template #renderAIAnswer="slotProps">
				<div style="width: 100%; margin: 0 auto; font-family: Arial, sans-serif">
					<div style="display: flex; flex-direction: column; padding: 16px">
						<!-- User message -->
						<template v-if="slotProps.question">
							<div style="align-self: flex-end; margin-bottom: 8px">
								<div
									style="
										display: inline-block;
										background-color: #007bff;
										color: white;
										border-radius: 16px;
										padding: 8px 16px;
										white-space: pre-wrap;
										word-wrap: break-word;
									"
								>
									{{ slotProps.question }}
								</div>
							</div></template
						>

						<!-- AI message -->
						<div
							v-if="slotProps.loading"
							style="align-self: flex-start; margin-bottom: 8px; max-width: 70%"
						>
							<div
								style="
									display: inline-block;
									max-width: 100%;
									background-color: #f1f1f1;
									color: black;
									border-radius: 16px;
									padding: 8px 16px;
									white-space: pre-wrap;
									word-wrap: break-word;
								"
							>
								Loading...
							</div>
						</div>
						<div
							v-else
							style="align-self: flex-start; margin-bottom: 8px; max-width: 70%"
						>
							<div
								style="
									display: inline-block;
									max-width: 100%;
									background-color: #f1f1f1;
									color: black;
									border-radius: 16px;
									padding: 8px 16px;
									white-space: pre-wrap;
									word-wrap: break-word;
								"
							>
								{{ slotProps.answer }}
							</div>
						</div>

						<!-- Sources -->
						<div
							v-if="
								!slotProps.loading && slotProps.sources && slotProps.sources.length
							"
							style="align-self: flex-start; font-size: 12px; color: gray"
						>
							Sources:
							<div
								v-for="(source, index) in slotProps.sources"
								:key="source.original_title"
							>
								{{ index + 1 }}. {{ source.original_title }}
							</div>
						</div>
					</div>
				</div>
			</template>
		</SearchBox>
		<SelectedFilters componentId="BookSensor" />
		<ReactiveList
			componentId="SearchResult"
			dataField="original_title.keyword"
			className="result-list-container"
			:pagination="true"
			:from="0"
			:size="5"
			:react="{ and: ['BookSensor'] }"
		>
			<template #renderItem="{ item }">
				<div class="flex book-content" key="item._id">
					<img :src="item.image" alt="Book Cover" class="book-image" />
					<div class="flex column justify-center ml20">
						<div class="book-header" v-html="item.original_title"></div>
						<div class="flex column justify-space-between">
							<div>
								<div>
									by <span class="authors-list">{{ item.authors }}</span>
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
									<span class="avg-rating">({{ item.average_rating }} avg)</span>
								</div>
							</div>
							<span class="pub-year">Pub {{ item.original_publication_year }}</span>
						</div>
					</div>
				</div>
			</template>
		</ReactiveList>
	</ReactiveBase>
</template>
<script>
export default {
	name: 'SearchBoxWithCustomAIScreen',
	props: {
		subProps: Object,
		subEvents: Object,
	},
};
</script>
