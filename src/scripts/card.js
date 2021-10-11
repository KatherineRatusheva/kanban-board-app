import { getStorage, setStorage } from './storageApi.js'

export class Card {
    constructor(title, text, id) {
        this.title = title,
        this.text = text,
        this.id = id,
        this.date = this.getDate();
    }

    render(){
        return `
        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;" draggable="true" id="${this.id}">
        <button type="button" class="btn-close" id="del-todo" aria-label="Close"></button>
          <div class="card-header">${this.title}</div>
          <div class="card-body">
            <h5 class="card-title">${this.text}</h5>
            <p class="card-data">${this.date}</p>
            <button type="button" id="edit-todo" class="btn btn-primary">Edit</button>
            <button type="button" id="doing-todo" class="btn btn-success">Doing</button>
          </div>
        </div>
        `;
    }

    getHtml(){
      document.getElementById('todo-list').innerHTML = getStorage('todos').map(todo => new Card(todo.title, todo.text, todo.id).render()).join(' ')
      document.getElementById('todos-counter').textContent = getStorage('todos').length
  }

    getDate(){
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        if(month < 10){
            month = '0' + month
        }
        
        let day = new Date().getDate()
        if(day < 10){
            day = '0' + day
        }
        
        let hours = new Date().getHours()
        if(hours < 10){
            hours = '0' + hours
        }
        
        let minutes = new Date().getMinutes()
        if(minutes < 10){
            minutes = '0' + minutes
        }
        
        return `${day}-${month}-${year} ${hours}:${minutes}`
    }
}

export class CardDone extends Card{
    constructor(title, text, id) {
        super()
        this.title = title,
        this.text = text,
        this.id = id
    }

    render(){
        return `
        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;" draggable="true" id="${this.id}">
          <div class="card-header">${this.title}</div>
          <div class="card-body">
            <h5 class="card-title">${this.text}</h5>
            <p class="card-data">${this.date}</p>
          </div>
        </div>
        `;
    }

  getHtmlDone(){
    document.getElementById('done-list').innerHTML = getStorage('done').map(todo => new CardDone(todo.title, todo.text, todo.id).render()).join(' ')
    document.getElementById('done-counter').textContent = getStorage('done').length
  }
}

export class CardDoing extends Card{
  constructor(title, text, id) {
      super()
      this.title = title,
      this.text = text,
      this.id = id
  }

  render(){
      return `
      <div class="card text-dark bg-light mb-3" style="max-width: 18rem;" draggable="true" id="${this.id}">
      <button type="button" class="btn-close" id="del-todo" aria-label="Close"></button>
        <div class="card-header">${this.title}</div>
        <div class="card-body">
          <h5 class="card-title">${this.text}</h5>
          <p class="card-data">${this.date}</p>
          <button type="button" id="done-todo" class="btn btn-success">Done</button>
        </div>
      </div>
      `;
  }
  
  getHtml(){
    document.getElementById('doing-list').innerHTML = getStorage('doing').map(todo => new CardDoing(todo.title, todo.text, todo.id).render()).join(' ')
    document.getElementById('doing-counter').textContent = getStorage('doing').length
  }

}