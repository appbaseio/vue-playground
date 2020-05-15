<template>
    <ReactiveBase
        app="good-books-ds"
        url="https://1e47b838a035:767b5a1a-03cb-4c5f-a536-4f399c24134b@arc-cluster-appbase-tryout-k8dsnj.searchbase.io"
        :enableAppbase="true"
    >
        <ReactiveList
            componentId="SearchResult"
            dataField="original_title.keyword"
            :from="0"
            :size="5"
            v-bind='subProps'
            v-on='subEvents'
        >
            <div slot="render" slot-scope="{ data }">
                <ResultListWrapper>
                    <ResultList
                        v-bind:key="result._id"
                        v-for="result in data"
                    >
                        <ResultListImage :src="result.image" />
                        <ResultListContent>
                            <ResultListTitle>
                                {{result.original_title}}
                            </ResultListTitle>
                            <ResultListDescription>
                                 <div>
                                    <p>
                                        <em>by {{result.authors}}</em>
                                    </p>
                                    <p>
                                        <b>{{result.average_rating}}</b> ⭐
                                    </p>
                                    <span>Pub {{result.original_publication_year}}</span>
                                </div>
                            </ResultListDescription>
                        </ResultListContent>
                    </ResultList>
                </ResultListWrapper>
            </div>
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
    }
</script>
