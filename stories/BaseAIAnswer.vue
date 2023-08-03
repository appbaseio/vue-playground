<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
		:themePreset="themePreset || 'light'"
	>
		<SearchBox
			className="result-list-container"
			componentId="BookSensor"
			:dataField="['original_title', 'original_title.search']"
			defaultValue="Paradise"
		/><AIAnswer
			className="ai-answer"
			componentId="AIComponent"
			:react="{ and: ['BookSensor'] }"
			v-bind="subProps"
			v-on="subEvents"
		>
			<template v-if="showCustomTitle" #title
				><img
					src="https://w7.pngwing.com/pngs/287/964/png-transparent-computer-icons-information-online-chat-answer-icon-miscellaneous-text-logo-thumbnail.png"
					height="30px"
					alt="ai-chat"
			/></template>
			<template v-if="showCustomIcon" #icon>
				<div>📚</div>
			</template>
			<template v-if="showCustomEnterButton" #renderEnterButton="cb">
				<button :style="{ height: '100%' }" @click="cb">📚</button>
			</template>
			<template v-if="renderSourceDocumentSlot" #renderSourceDocument="obj">
				<div>{{ obj.original_title }} 🔍</div>
			</template>
			<template v-if="showRenderSlot" v-slot:render="{ loading, data, error }">
				<div v-if="loading">loading...</div>
				<pre v-else-if="error">{{ JSON.stringify(error) }}</pre>
				<div
					v-else-if="data && Array.isArray(data)"
					style="width: 80%; margin: 0 auto; padding: 20px"
				>
					<div
						v-for="(message, index) in data"
						:key="index"
						:style="{
							display: 'flex',
							justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
						}"
					>
						<div :style="getMessageStyle(message)">
							{{ message.content }}
						</div>
					</div>
				</div>
			</template>
		</AIAnswer>
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
			</template>
		</ReactiveList>
	</ReactiveBase>
</template>
<script>
import { AIAnswer } from '@appbaseio/reactivesearch-vue';

export default {
	name: 'BaseAIAnswer',
	props: {
		subProps: Object,
		subEvents: Object,
		showCustomIcon: Boolean,
		showCustomEnterButton: Boolean,
		themePreset: String,
		showRenderSlot: Boolean,
		renderSourceDocumentSlot: Boolean,
		showCustomTitle: Boolean,
	},
	components: { AIAnswer },
	methods: {
		getMessageStyle(message) {
			const isSender = message.role === 'user';
			return {
				backgroundColor: isSender ? '#cce5ff' : '#f8f9fa',
				padding: '10px',
				borderRadius: '7px',
				marginBottom: '10px',
				maxWidth: '80%',
				alignSelf: isSender ? 'flex-end' : 'flex-start',
				display: 'inline-block',
				border: '1px solid',
				color: isSender ? '#004085' : '#383d41',
				position: 'relative',
				whiteSpace: 'pre-wrap',
			};
		},
	},
};
</script>
