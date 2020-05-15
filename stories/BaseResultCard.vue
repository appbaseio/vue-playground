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
                <ResultCardsWrapper>
                    <ResultCard
                        v-bind:key="result._id"
                        v-for="result in data"
                    >
                        <ResultCardImage :src="result.image" />
                        <ResultCardTitle>
                            {{result.original_title}}
                        </ResultCardTitle>
                        <ResultCardDescription>
                             <div>
                                <p>
                                    <em>by {{result.authors}}</em>
                                </p>
                                <p>
                                    <b>{{result.average_rating}}</b> ⭐
                                </p>
                                <span>Pub {{result.original_publication_year}}</span>
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
        name: 'BaseResultCard',
        props: {
            subProps: Object,
            subEvents: Object,
        },
    }
</script>
