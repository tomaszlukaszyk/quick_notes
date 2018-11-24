import {storage} from "./Storage.js";
import {noteRenderer} from "./NoteRenderer.js"

export class NoteController {
    constructor(note) {
        this.note = note;
        this._noteView = null;
        this._grabPointX = null;
        this._grabPointY = null;
    }
    
    set noteView(value) {
        this._noteView = value;
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
        noteRenderer.addGlow();
    }
    
    handleDrag(event) {
        let currentX = event.clientX - this._grabPointX;
        let currentY = event.clientY - this._grabPointY;
        this._noteView.moveToPosition(currentX, currentY);
    }
    
    handleDragEnd(event) {
        this._noteView.stopMove();
        noteRenderer.removeGlow();
    
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