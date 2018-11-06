import {Note} from "./Note.js";

class Storage {
    constructor() {
        this.notes = [];
        this.load();
    }
    
    add(note) {
        this.notes.unshift(note);
        this.save();
    }
    
    remove(note) {
        let i = this.notes.indexOf(note);
        this.notes.splice(i, 1);
        this.save();
    }
    
    moveNoteToIndex(note, newIndex) {
        let currentIndex = this.notes.indexOf(note);
        this.notes.splice(currentIndex, 1);
        this.notes.splice(newIndex, 0, note);
        this.save();
    }
    
    save(){
        localStorage.setItem('notes', JSON.stringify([...this.notes]))
    }

    load(){
        let notes = JSON.parse(localStorage.getItem('notes'));
        if(notes !== null){
            for(let note of notes){
                this.notes.push(Note.createFromObject(note));
            }
        }
    }
}

export let storage = new Storage();