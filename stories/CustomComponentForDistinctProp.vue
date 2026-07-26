<template>
    <div v-if="data">
        <div :style="{ cursor: 'pointer' }" v-for="item in data" v-bind:key="item._id" @click="() => setValue(item.authors)">
            {{item.authors}}
        </div>
    </div>
</template>
<script>
export default {
  name: 'CustomComponentForDistinctProp',
  props: {
      subProps: Object,
      subEvents: Object,
      data: Array,
      setQuery: Function
  },
  methods: {
      setValue(value) {
		this.$props.setQuery({
			query: {
				term: {
					"authors.keyword": value,
				},
			},
			value,
		});
  }
}
}
</script>
