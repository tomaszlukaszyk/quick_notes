export class NoteView {
    constructor(controller) {
        this._controller = controller;
        this.element = this.createElement();
        this.registerEventListeners();
    }
    
    createElement() {
        let noteTemplate = document.getElementById("note_template");
        let noteElement = noteTemplate.content.cloneNode(true).querySelector(".note");
        noteElement.getElementsByTagName("input")[0].value = this._controller.note.title;
        noteElement.getElementsByTagName("textarea")[0].value = this._controller.note.content;
        return noteElement;
    }
    
    registerEventListeners() {
        this.element.getElementsByTagName("input")[0].addEventListener('input', this._controller.handleTitleChange.bind(this._controller));
        this.element.getElementsByTagName("textarea")[0].addEventListener('input', this._controller.handleContentChange.bind(this._controller));
        
        let bar = this.element.getElementsByClassName("bar")[0];
        bar.addEventListener('dragstart', this._controller.handleDragStart.bind(this._controller));
        bar.addEventListener('drag', this._controller.handleDrag.bind(this._controller));
        bar.addEventListener('dragend', this._controller.handleDragEnd.bind(this._controller));
    }
    
    moveToPosition(x, y) {
        this.element.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    }
    
    stopMove() {
        this.element.style.transform = null;
    }
}