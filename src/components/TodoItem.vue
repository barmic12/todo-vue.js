<template>
	<div class="todo" >
		<div class="left-side">
			<input type="checkbox" v-model="status" @change="doneEdit" />
			<div v-if="!editing" :class="{ completed: status }">

				<span @dblclick="editItem">
					{{ name }}
				</span>
			</div>
			<div v-if="editing">
				<input type="text" v-model="name" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus class="input-edit" />
			</div>
		</div>
		<div>
			<span>Plural</span>
			<div class="destroy" @click="removeItem(item.id)">&times</div>
		</div>
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
  		'name': this.item.name,
  		'status': this.item.status,
  		'editing': this.item.editing,
  		'beforeEditCache': ''
  	}
  },
  watch: {
  	checkAll() {
  		this.status = this.checkAll ? true : this.item.status
  	}
  },
  methods: {
  	removeItem(id) {
  		//this.$emit('removedItem', item)
			//eventBus.$emit('removedItem', item)
			this.$store.dispatch('deleteItem', id)
  	},
  	editItem() {
  		this.beforeEditCache = this.name
  		this.editing = true;
  	},
  	doneEdit() {
  		if (this.name.trim().length == 0) {
  			return;
  		}
  		this.editing = false;
  		//this.$emit('finishedEdit', {
			this.$store.dispatch('updateItem', {
				'id': this.id,
				'name': this.name,
				'status': this.status,
				'editing:': this.editing,
			})
  	},
  	cancelEdit() {
  		this.name = this.beforeEditCache;
  		this.editing = false;
  	},
  },
  directives: {
  	focus: {
  		inserted: function(el) {
  			el.focus()
  		}
  	}
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

	.todo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		animation-duration: 0.3s;
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
		display: flex;
	}

	.left-side input {
		margin-right: 10px;
	}

	.right-side {
		float: left;
	}
</style>
