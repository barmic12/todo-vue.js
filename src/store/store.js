import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      filter: 'all',
  		items: [
  		{
  			id: 1,
  			title: 'Create Todo',
  			completed: false,
  			editing: false
  		},
  		{
  			id: 2,
  			title: 'Create Rails Server',
  			completed: false,
  			editing: false
  		},
  		],
    },
    getters: {
      remaining(state) {
        return state.items.filter(todo => !todo.completed).length
      },
      anyRemaining(state, getters) {
        return getters.remaining != 0
      },
      itemsFiltered(state) {
        if(state.filter == 'all') {
          return state.items
        }
        else if (state.filter == 'active') {
          return state.items.filter(todo => !todo.completed)
        }
        else if (state.filter == 'completed') {
          return state.items.filter(todo => todo.completed)
        }

        return state.items;
      },
      showClearCompletedButton(state) {
        return state.items.filter(todo => todo.completed).length > 0
      }
    },
    mutations: {
      addItem(state, item) {
        state.items.push( {
          id: item.id,
          title: item.title,
          completed: false,
          editing: false,
        })
      },
      clearCompleted(state) {
        state.items = state.items.filter(todo => !todo.completed)
      },
      changeFilter(state, filter) {
        state.filter = filter
      },
      checkAll(state, checked) {
        state.items.forEach((item) => item.completed = checked )
      },
      deleteTodo(state, id) {
        const index = state.items.findIndex(item => item.id == id)
  			state.items.splice(index, 1);
      },
      updateItem(state, item) {
        const index = state.items.findIndex((todo) => todo.id == item.id)
        state.items.splice(index, 1, {
          'id': item.id,
          'title': item.title,
          'completed': item.completed,
          'editing:': item.editing,
        })
      }
    },
    actions: {
      addItem(context, item) {
        context.commit('addItem', item)
      },
      clearCompleted(context) {
        context.commit('clearCompleted')
      },
      changeFilter(context, filter) {
        context.commit('changeFilter', filter)
      },
      checkAll(context, event) {
        context.commit('checkAll', event)
      },
      deleteTodo(context, id) {
        context.commit('deleteTodo', id)
      },
      updateItem(context, item) {
        context.commit('updateItem', item)
      }
    }
})
