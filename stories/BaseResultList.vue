<template>
    <ReactiveBase app="good-books-ds" credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d" >
        <ResultList
            componentId="SearchResult"
            dataField="original_title.raw"
            :from="0"
            :size="5"
            :renderItem="booksList"
            v-bind='subProps'
            v-on='subEvents'
        />
    </ReactiveBase>
</template>
<script>
    export default {
        name: 'BaseResultList',
        props: {
            subProps: Object,
            subEvents: Object,
        },
        methods: {
            booksList(data) {
                return {
                    title: data.original_title,
                    image: data.image,
                    description: `
                        <div>
                            <p>
                                <em>by ${data.authors}</em>
                            </p>
                            <p>
                                <b>${data.average_rating}</b> ⭐
                            </p>
                            <span>Pub ${data.original_publication_year}</span>
                        </div>
                    `,
                };
            }
        }
    }
</script>
