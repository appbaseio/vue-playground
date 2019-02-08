<template>
    <div v-if="aggregations">
        <div :style="{ cursor: 'pointer' }" v-for="item in aggregations['brand.keyword'].buckets" v-bind:key="item.id" @click="() => setValue(item.key)">
            {{item.key}}
        </div>
    </div>
</template>
<script>
export default {
  name: 'CustomComponent',
  props: {
      subProps: Object,
      subEvents: Object,
      aggregations: Object,
      setQuery: Function
  },
  methods: {
      setValue(value) {
		this.$props.setQuery({
			query: {
				term: {
					"brand.keyword": value,
				},
			},
			value,
		});
  }
}
}
</script>
