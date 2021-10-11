
export class Modal {
    constructor() {
        this.render();
        this.setup();
    }

    render() {
        this.$modal = document.createElement('div');
        this.$modal.classList.add('modal');
        this.$modal.id = 'modal';
        this.$modal.innerHTML = this.getTemplete();
        document.body.append(this.$modal)
    }

    setup() {
        this.$modal.addEventListener('click', (e) => {
            if (e.target.id === 'close-todo-btn') {
                this.close()
            }  
        })
    }

    open() {
        this.$modal.style.display = 'block'
    }

    close() {
        this.$modal.style.display = 'none'
    }

    getTemplete() {
        return `
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <input type="text" id="field-title" placeholder="Name">
          </div>
          <div class="modal-body">
              <input type="text" id="field-text" placeholder="Description">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-todo-btn">Close</button>
            <button type="button" class="btn btn-primary" id="save-todo-btn">Save</button>
            <button type="button" class="btn btn-primary edit" id="save-todo-edit">Save changes</button>
          </div>
        </div>
      </div>
    `
    }
}