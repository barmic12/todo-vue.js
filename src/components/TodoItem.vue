<template>
	<div>One todo-item</div>
</template>

<script>
export default {
  name: 'todo-item',
  data() {
  	return {
  		title: '',
  		beforeEditCache: '',
  		filter: 'all',
  		items: [
  		{
  			title: 'Create Todo',
  			completed: false,
  			editing: false
  		},
  		{
  			title: 'Create Rails Server',
  			completed: false,
  			editing: false
  		},
  		],
		visibility: 'all',
		errors: []
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

	.todo-list li {
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

	.todo-list li:hover .destroy {
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
</style>