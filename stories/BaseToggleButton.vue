<template>
    <ReactiveBase
        app="meetup_dataset"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
    >
        <div class="row">
            <div class="col">
                <ToggleButton
                    componentId="CitySensor"
                    dataField="group.group_topics.topic_name_raw.keyword"
                    :data="[
                        { label: 'Social', value: 'Social' },
                        { label: 'Adventure', value: 'Adventure' },
                        { label: 'Music', value: 'Music' },
                    ]"
                    v-bind='subProps'
                    v-on='subEvents'
                />
            </div>
            <div class="col">
                <SelectedFilters componentId="CitySensor" />
                <ReactiveList
					componentId="SearchResult"
                    dataField="group.group_topics.topic_name_raw.keyword"
                    title="Results"
                    sortBy="asc"
                    class="result-list-container"
                    :from="0"
                    :size="5"
                    :innerClass="{
                        image: 'meetup-list-image'
                    }"
                    :pagination="true"
                    :react='{
                        and: ["CitySensor"]
                    }'
				>
					<div slot="render" slot-scope="{ data }">
						<ResultListWrapper>
							<ResultList
								v-bind:key="result._id"
								v-for="result in data"
								:href="result.event.event_url"
							>
								<ResultListImage :small="true" :src="result.member.photo" />
								<ResultListContent>
									<ResultListTitle>
										{{ result.member ? result.member.member_name : '' }} is
										going to
										{{ result.event ? result.event.event_name : '' }}
									</ResultListTitle>
									<ResultListDescription>
										{{ result.group ? result.group.group_city : '' }}
									</ResultListDescription>
								</ResultListContent>
							</ResultList>
						</ResultListWrapper>
					</div>
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
