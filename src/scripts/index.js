import { Card, CardDone } from './card.js';
import { getStorage, setStorage } from './storageApi.js'
import { Modal } from './Modal.js'

const addTodoBtn = document.getElementById('add-todo-btn')
const deleteAllTodosBtn = document.getElementById('delete-all-todos-btn')
const deleteAllTodosDoneBtn = document.getElementById('delete-all-done-todos-btn')
const containerTask = document.getElementById('todo-list')

let todoList = getStorage('todos')
let todoDone = getStorage('done')

let newModal = new Modal()

const app = () => {
    new Card().getHtml()
    new CardDone().getHtmlDone()

    addTodoBtn.addEventListener('click', () => {
        newModal.open()
        document.getElementById('save-todo-edit').style.display = 'none'
        document.getElementById('field-title').value = ""
        document.getElementById('field-text').value = ""
        newModal.setup()
    })

    document.getElementById('save-todo-btn').addEventListener('click', () => {
        saveTodo()
        setStorage('todos', todoList)
        new Card().getHtml()
    })

    deleteAllTodosBtn.addEventListener('click', () => {
        todoList.splice(0, todoList.length)
        setStorage('todos', todoList)
        new Card().getHtml()
    })

    deleteAllTodosDoneBtn.addEventListener('click', () => {
        todoDone.splice(0, todoDone.length)
        setStorage('done', todoDone)
        new CardDone().getHtmlDone()
    })

    containerTask.addEventListener('click', (e) => {

        if (e.target.id === 'del-todo'){
            let todoId = e.target.offsetParent.id

            for(let i = 0; i < todoList.length; i++){
                if (todoId === todoList[i].id)
                todoList.splice(i, 1)
                setStorage('todos', todoList)
                new Card().getHtml()
            }
        }

        if (e.target.id === 'done-todo'){
            let todoId = e.target.offsetParent.id

            for(let i = 0; i < todoList.length; i++){
                if (todoId === todoList[i].id)
                todoList.splice(i, 1)
                setStorage('todos', todoList)
                new Card().getHtml()
            }

            let newTodoDone = {
                title: e.target.parentNode.previousElementSibling.innerHTML,
                text: e.target.parentNode.firstElementChild.innerHTML,
                id: `${todoDone.length}`,
            }
            todoDone.push(newTodoDone)

            setStorage('done', todoDone)
            new CardDone().getHtmlDone()
        }

        if (e.target.id === 'edit-todo'){
            newModal.open()
            document.getElementById('save-todo-edit').style.display = 'block'
            document.getElementById('save-todo-btn').style.display = 'none'
    
            document.getElementById('field-title').value = e.target.parentNode.previousElementSibling.innerHTML
            document.getElementById('field-text').value = e.target.parentNode.firstElementChild.innerHTML
            let idEl = e.target.parentNode.parentNode.id

            let item = todoList.find(el => el.id === idEl)

            document.getElementById('save-todo-edit').addEventListener('click', () => {
                item.title = document.getElementById('field-title').value
                item.text = document.getElementById('field-text').value
                todoList.splice(idEl, 1, item)
                setStorage('todos', todoList)
                new Card().getHtml()
                document.location.reload()
            })
        }
    })

}
app()

// saveTodo
function saveTodo(){
    let newTodo = {
        title: document.getElementById('field-title').value,
        text: document.getElementById('field-text').value,
        id: `${todoList.length}`,
    }
    todoList.push(newTodo)
}
// Drag and Drop

const drugItems = document.querySelectorAll('.mb-3')
const dropZones = document.getElementById('todo-list')
const dropZonesDone = document.getElementById('done-list')

drugItems.forEach(drugItems => {
    drugItems.addEventListener('dragstart', handlerDragStart)
    drugItems.addEventListener('dragend', handlerDragEnd)
})

dropZones.addEventListener('dragenter', handlerDragEnter)
dropZones.addEventListener('dragleave', handlerDragLeave)
dropZones.addEventListener('dragover', handlerDragOver)
dropZones.addEventListener('drop', handlerDrop)

dropZonesDone.addEventListener('dragenter', handlerDragEnter)
dropZonesDone.addEventListener('dragleave', handlerDragLeave)
dropZonesDone.addEventListener('dragover', handlerDragOver)
dropZonesDone.addEventListener('drop', handlerDrop)


function handlerDragStart (event){
    event.dataTransfer.setData('drugItems', this.id)
    this.classList.add('opacity')
}

function handlerDragEnd (event){
    this.classList.remove('opacity')
}

function handlerDragEnter (event){
    event.preventDefault() //отменить запрет
    this.classList.add('opacity')
}
function handlerDragLeave (event){
    this.classList.remove('opacity')
}

function handlerDragOver (event){
    event.preventDefault() //отменить запрет
}

function handlerDrop (event){
    const dragFlag = event.dataTransfer.getData('drugItems')
    const drugItems = document.querySelector(`[id = '${dragFlag}']`)
    this.append(drugItems)
}

