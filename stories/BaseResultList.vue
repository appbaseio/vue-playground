<template>
    <ReactiveBase
        app="good-books-ds"
        url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
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
