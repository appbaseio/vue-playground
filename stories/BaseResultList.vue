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
                                        <em>by {{data.authors}}</em>
                                    </p>
                                    <p>
                                        <b>{{data.average_rating}}</b> ⭐
                                    </p>
                                    <span>Pub {{data.original_publication_year}}</span>
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
