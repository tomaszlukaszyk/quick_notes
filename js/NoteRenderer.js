import {storage} from "./Storage.js";
import {NoteController} from "./NoteController.js";
import {NoteView} from "./NoteView.js";

class NoteRenderer {
    constructor() {
        this._container = document.getElementById("container");
    }
    
    render() {
        this.clearContainer();
        for (let i=0; i<storage.notes.length; i++) {
            let noteController = new NoteController(storage.notes[i]);
            let noteView = new NoteView(noteController);
            noteController.noteView = noteView;
            noteView.element.style.order = i;
            this._container.appendChild(noteView.element);
        }
    }
    
    clearContainer() {
        this._container.innerHTML = "";
    }
}

export let noteRenderer = new NoteRenderer();