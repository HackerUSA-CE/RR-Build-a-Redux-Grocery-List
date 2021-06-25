const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

const initialState = {
    groceries: []
}
let nextGroceryId = 0

const todoReducer = (state = initialState.groceries, action) => {
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
        state.forEach(grocery => {
            let li = document.createElement('li')
            list.appendChild(li)
            li.innerHTML = grocery.text
        })
    }
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'todo/add',
        id: nextGroceryId++,
        text: groceryText
    })
}

const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'todo/clear'
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

grocerySubmit.addEventListener('submit', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

render()

store.subscribe(render)