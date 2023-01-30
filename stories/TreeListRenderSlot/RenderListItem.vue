<template>
	<li :key="this.$props.propObject.newParentPath">
		<span
			:style="
				this.$props.propObject.isSelected ? { background: 'green', margin: '5px 0' } : {}
			"
			@click="
				() =>
					this.$props.propObject.handleListItemClick(
						this.$props.propObject.listItemLabel,
						this.$props.propObject.parentPath,
					)
			"
		>
			<React.Fragment>
				<span>{{ this.$props.propObject.listItemLabel }}</span>
				-
				<span>{{ this.$props.propObject.listItemCount }}</span>
			</React.Fragment>
		</span>

		<div v-if="!this.$props.propObject.isLeafNode" className="--list-child">
			<RenderList
				:transformedData="this.$props.propObject.listItem.list"
				:handleClick="this.$props.propObject.handleListItemClick"
				:parentPath="this.$props.propObject.newParentPath"
				isExpanded="this.$props.propObject.isSelected"
				:selectedValues="this.$props.propObject.selectedValues"
				:TREELIST_VALUES_PATH_SEPARATOR="
					this.$props.propObject.TREELIST_VALUES_PATH_SEPARATOR
				"
			/>
		</div>
	</li>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
	name: 'RenderListItem',
	components: {
		RenderList: defineAsyncComponent(() => import('./RenderList.vue')),
	},
	props: {
		propObject: Object,
	},
};
</script>
