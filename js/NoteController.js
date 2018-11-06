import {storage} from "./Storage.js";
import {noteRenderer} from "./NoteRenderer.js"

export class NoteController {
    constructor(note) {
        this.note = note;
        this._grabPointX = null;
        this._grabPointY = null;
    }
    
    handleTitleChange(event) {
        this.note.title = event.target.value;
        storage.save();
    }
    
    handleContentChange(event) {
        this.note.content = event.target.value;
        storage.save();
    }
    
    handleDragStart(event) {
        this._grabPointX = event.clientX;
        this._grabPointY = event.clientY;
    }
    
    handleDrag(event) {
        let noteElement = event.target.parentElement;
        let currentX = event.clientX - this._grabPointX;
        let currentY = event.clientY - this._grabPointY;

        noteElement.style.transform = "translateX(" 
            + currentX + "px) translateY(" 
            + currentY + "px)";
    }
    
    handleDragEnd(event) {
        let noteElement = event.target.parentElement;
        noteElement.style.transform = null;
    
        let dropTarget = document.elementFromPoint(event.clientX, event.clientY);
        
        if (dropTarget == null) {
            return;
        }
        
        if (dropTarget.className.includes("delete")) {
            
            storage.remove(this.note);
            delete this;
            
        } else if (dropTarget.parentElement.className.includes("note")) {
            
            let dropTargetNoteOrder = dropTarget.parentElement.style.order;
            storage.moveNoteToIndex(this.note, dropTargetNoteOrder);
            
        }
        
        noteRenderer.render();
        this._grabPointX = null;
        this._grabPointY = null;
    }
}