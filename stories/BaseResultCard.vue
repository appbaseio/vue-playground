<template>
    <ReactiveBase app="good-books-ds" credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d" >
        <ReactiveList
            componentId="SearchResult"
            dataField="original_title.raw"
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
