<template>
	<ReactiveBase
		app="best-buy-dataset"
		url="https://reactivesearch-api-9-4-0.onrender.com"
		credentials="d03e6f5f33d5:49124674-554e-4343-9ab2-006b2932f5c0"
		:enable-appbase="true"
	>
		<div class="row">
			<div class="col">
				<TreeList
					componentId="TreeListComponent"
					mode="multiple"
					:URLParams="true"
					:dataField="['class.keyword', 'subclass.keyword', 'categoryPath.name.keyword']"
					:showSwitcherIcon="true"
					:showIcon="true"
					:showLeafIcon="true"
				>
					<template #render="{ data, handleClick, value, PATH_SEPARATOR }">
						<RenderList
							:transformedData="data"
							:handleClick="handleClick"
							:parentPath="''"
							isExpanded="true"
							:selectedValues="value"
							:TREELIST_VALUES_PATH_SEPARATOR="PATH_SEPARATOR"
						/>
					</template>
				</TreeList>
			</div>

			<div class="col">
				<SelectedFilters />
				<ReactiveList
					componentId="SearchResult"
					dataField="original_title"
					className="result-list-container"
					:pagination="true"
					:from="0"
					:size="5"
					:react="{ and: ['TreeListComponent'] }"
					:includeFields="['*']"
				>
					<template #renderItem="{ item: data }">
						<div className="flex book-content" :key="data._id">
							<img :src="data.image" alt="Book Cover" className="book-image" />
							<div className="flex column justify-center" :style="{ marginLeft: 20 }">
								<div className="book-header">{{ data.name }}</div>
								<div className="flex column justify-space-between">
									<div>
										<div>
											<span className="authors-list">
												{{ data.class }} > {{ data.subclass }}
											</span>
										</div>
										<div className="ratings-list flex align-center">
											Sale Price 💰 <b>{{ data.salePrice }}</b>
										</div>
									</div>
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
import RenderList from './RenderList.vue';
export default {
	name: 'TreeListRenderSlot',
	components: { RenderList },
	methods: {
		log(args) {
			console.log(args);
		},
	},
};
</script>
