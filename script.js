const addBtn = document.getElementById('addTodo')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

const initialState = {
    todos: []
}
let nextTodoId = 0

const todoReducer = (state = initialState.todos, action) => {
    switch(action.type) {
        case 'todo/add':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case 'todo/clear':
            return []
        default:
            return state
    }
}


let store = Redux.createStore(todoReducer)

const renderList = (state) => {
    while(list.firstChild) list.removeChild(list.firstChild)
    if(state.length > 0){
        state.forEach(todo => {
            let li = document.createElement('li')
            list.appendChild(li)
            li.innerHTML = todo.text
        })
    }
}

const newTodo = () => {
    let todoText = document.getElementById('newItem').value
    store.dispatch({
        type: 'todo/add',
        id: nextTodoId++,
        text: todoText
    })
}

const clearTodo = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'todo/clear'
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

addBtn.addEventListener('click', newTodo)
clearBtn.addEventListener('click', clearTodo)

render()

store.subscribe(render)