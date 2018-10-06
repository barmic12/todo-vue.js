<template>
	<div class="todo" >
		<div class="left-side">
			<input type="checkbox" v-model="completed" @change="doneEdit" />
		</div>
		<div class="right-side">
		<div v-if="!editing" :class="{ completed: completed }">

			<span @dblclick="editItem">
				{{ title }}
			</span>
			<div class="destroy" @click="removeItem(this)">&times</div>
		</div>
		<div v-if="editing">
			<input type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus class="input-edit" />
		</div>
		</div>
		<div style="clear: both"></div>
	</div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
  	item: {
  		type: Object,
  		required: true,
  	},
  	index: {
  		type: Number,
  		required: true,
  	},
  	checkAll: {
  		type: Boolean,
  		required: true,
  	}
  },
  data() {
  	return {
  		'id': this.item.id,
  		'title': this.item.title,
  		'completed': this.item.completed,
  		'editing': this.item.editing,
  		'beforeEditCache': ''
  	}
  },
  watch: {
  	checkAll() {
  		if(this.checkAll) {
  			this.completed = true
  		} else {
  			this.completed = false
  		}
  	}
  },
  methods: {
  	removeItem(item) {
  		this.$emit('removedItem', item)
  	},
  	editItem() {
  		this.beforeEditCache = this.title
  		this.editing = true;
  	},
  	doneEdit() {
  		if (this.title.trim().length == 0) {
  			return;
  		}
  		this.editing = false;
  		this.$emit('finishedEdit', {
  			'index': this.index,
  			'item': {
  				'id': this.id,
  				'title': this.title,
  				'completed': this.completed,
  				'editing:': this.editing,
  			}
  		})
  	},
  	cancelEdit() {
  		this.title = this.beforeEditCache;
  		this.editing = false;
  	},
  }
	}
</script>


<style>

	#form-app input{
		width:100%;
		padding: 10px;
		border: none;
		border-bottom: 1px solid #ededed;
		box-sizing : border-box;
		font-size: 18px;

	}

	.todo-list {
		list-style: none;
		padding-left:0px;
		margin: 0px;
	}

	.todo-list .todo-item {
		padding: 10px;
		background-color: white;
		border-bottom: 1px solid #ededed;
		font-size: 18px;
	}

	.completed {
		color: grey;
		text-decoration: line-through;
	}

	.destroy {
		display: none;
		cursor: pointer;
	}

	.destroy:hover {
		color: red;
	}

	.todo-list .todo-item:hover .destroy {
		display: inline-block;
		float: right;
	}

	.block-info {
		background-color: white;
		padding: 10px 10px;
		display:flex;
		align-items: center;
		justify-content: space-between;
	}

	.input-edit {
		padding: 10px;
		border-bottom: 1px solid #ededed;
		box-sizing : border-box;
		font-size: 18px;
	}

	button.active {
		background-color: green;
		color: white;
		border: 0px;
	}

	.left-side {
		float: left;
	}

	.right-side {
		float: left;
	}
</style>
