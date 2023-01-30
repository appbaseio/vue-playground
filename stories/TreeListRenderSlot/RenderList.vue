<template>
	<ul :style="isExpanded ? { fontWeight: 600 } : {}">
		<template v-for="item in transformedData" :key="item.key">
			<RenderListItem
				:propObject="
					this.getListItemPropObject(
						item,
						this.$props.parentPath,
						this.$props.selectedValues,
						this.$props.handleClick,
					)
				"
			/>
		</template>
	</ul>
</template>
<script>
import { defineAsyncComponent } from 'vue';

export default {
	name: 'RenderList',
	components: { RenderListItem: defineAsyncComponent(() => import('./RenderListItem.vue')) },
	props: {
		transformedData: Array,
		parentPath: String,
		isExpanded: Boolean,
		selectedValues: Object,
		handleClick: Function,
		TREELIST_VALUES_PATH_SEPARATOR: String,
	},
	methods: {
		recLookup(obj, path) {
			try {
				const parts = path.split(this.TREELIST_VALUES_PATH_SEPARATOR);
				if (parts.length === 1) {
					return obj[parts[0]];
				}
				return recLookup(
					obj[parts[0]],
					parts.slice(1).join(this.TREELIST_VALUES_PATH_SEPARATOR),
				);
			} catch (e) {
				return false;
			}
		},
		getListItemPropObject(listItem, parentPath, selectedValues, handleListItemClick) {
			if (!(listItem instanceof Object) || Object.keys(listItem).length === 0) {
				return null;
			}
			const listItemLabel = listItem.key;
			const listItemCount = listItem.count;
			const isLeafNode = !(Array.isArray(listItem.list) && listItem.list.length > 0);

			let newParentPath = listItemLabel;
			if (parentPath) {
				newParentPath = `${parentPath}${this.TREELIST_VALUES_PATH_SEPARATOR}${listItemLabel}`;
			}
			const isSelected = this.recLookup(selectedValues, newParentPath);

			return {
				key: newParentPath,
				isSelected,
				listItemLabel,
				parentPath,
				listItemCount,
				handleListItemClick,
				selectedValues,
				listItem,
				newParentPath,
				isLeafNode,
				TREELIST_VALUES_PATH_SEPARATOR: this.TREELIST_VALUES_PATH_SEPARATOR,
			};
		},
	},
};
</script>
