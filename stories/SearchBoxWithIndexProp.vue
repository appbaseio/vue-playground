
<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
	>
		<div style="display: flex; flex-direction: row; justify-content: flex-start">
			<div style="flex: 1; max-width: 35vw">
				<!-- as no index is specified in this component, by default all the queries made will be targetted to the
      index provided in seachbase component -->
				<SearchBox
					className="result-list-container"
					componentId="BookSensor"
					:dataField="['original_title', 'original_title.search']"
					:react="{ and: ['AuthorSensor'] }"
					title="Search index 'good-books-ds'"
					placeholder="Search Books"
				/>
			</div>
			<div style="flex: 1; max-width: 35vw; margin-left: 50px">
				<!-- all queries triggereing from this component will be tragetted to the 'good-books-clone' index in the BE as it is specified
      through the index prop -->
				<SearchBox
					className="result-list-container"
					componentId="AuthorSensor"
					:dataField="['authors', 'authors.search']"
					:react="{ and: ['BookSensor'] }"
					index="good-books-clone"
					title="Search index 'good-books-clone'"
					placeholder="Search Authors"
				/>
			</div>
		</div>
		<ReactiveList
			componentId="SearchResult"
			dataField="original_title.keyword"
			className="result-list-container"
			:pagination="true"
			:from="0"
			:size="5"
			:react="{ and: ['BookSensor', 'AuthorSensor'] }"
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
	name: 'SearchBoxWithIndexProp',
};
</script>
