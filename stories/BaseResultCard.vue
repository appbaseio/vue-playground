<template>
    <ReactiveBase
        app="good-books-ds"
        url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@arc-cluster-appbase-demo-6pjy6z.searchbase.io"
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
