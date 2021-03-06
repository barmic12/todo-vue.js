import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:3000'
export const store = new Vuex.Store({
    state: {
      filter: 'all',
  		items: [
  		// {
  		// 	id: 1,
  		// 	name: 'Create Todo',
  		// 	completed: false,
  		// 	editing: false
  		// },
  		// {
  		// 	id: 2,
  		// 	name: 'Create Rails Server',
  		// 	completed: false,
  		// 	editing: false
  		// },
  		],
    },
    getters: {
      remaining(state) {
        return state.items.filter(todo => !todo.status).length
      },
      anyRemaining(state, getters) {
        return getters.remaining != 0
      },
      itemsFiltered(state) {
        if(state.filter == 'all') {
          return state.items
        }
        else if (state.filter == 'active') {
          return state.items.filter(todo => !todo.status)
        }
        else if (state.filter == 'completed') {
          return state.items.filter(todo => todo.status)
        }

        return state.items;
      },
      showClearCompletedButton(state) {
        return state.items.filter(todo => todo.status).length > 0
      }
    },
    mutations: {
      addItem(state, item) {
        state.items.push( {
          id: item.id,
          name: item.name,
          status: false,
          editing: false,
        })
      },
      clearCompleted(state) {
        state.items = state.items.filter(todo => !todo.status)
      },
      changeFilter(state, filter) {
        state.filter = filter
      },
      checkAll(state, checked) {
        state.items.forEach((item) => item.status = checked )
      },
      deleteItem(state, id) {
        const index = state.items.findIndex(item => item.id == id)
  			state.items.splice(index, 1);
      },
      updateItem(state, item) {
        const index = state.items.findIndex((todo) => todo.id == item.id)
        state.items.splice(index, 1, {
          'id': item.id,
          'name': item.name,
          'status': item.status,
          'editing:': item.editing,
        })
      },
      retrieveItems(state, items) {
        state.items = items
      }
    },
    actions: {
      retrieveItems(context, items) {
        axios.get('/tasks')
          .then(function(response)  {
            items = []
            for (var i = 0; i < response.data['data'].length; i++) {
                items.push(response.data['data'][i]['attributes'])
                context.commit('retrieveItems', items)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      addItem(context, item) {
        axios.post('/tasks', {
          name: item.name,
          status: false,
          headers: {
        'Content-Type': 'application/json'
    }
        })
          .then(response =>  {
              context.commit('addItem', item)
          })
          .catch(error => {
            console.log(error)
          })
      },
      clearCompleted(context) {
        axios.delete('/tasks/remove_completed')
          .then(response =>  {
              context.commit('clearCompleted')
          })
          .catch(error => {
            console.log(error)
          })

      },
      changeFilter(context, filter) {
        context.commit('changeFilter', filter)
      },
      checkAll(context, event) {
        axios.put('/tasks/update_all', {
          status: event
        })
          .then(response =>  {
              context.commit('checkAll', event)
          })
          .catch(error => {
            console.log(error)
          })
      },
      deleteItem(context, id) {
        axios.delete('/tasks/'+id)
          .then(response =>  {
              context.commit('deleteItem', id)
          })
          .catch(error => {
            console.log(error)
          })
      },
      updateItem(context, item) {
        axios.put('/tasks/'+item.id, {
          name: item.name,
          status:
          item.status
        })
          .then(response =>  {
              context.commit('updateItem', item)
          })
          .catch(error => {
            console.log(error)
          })
      },
    }
})
