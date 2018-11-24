"use strict";

let addButton = document.getElementById("add");
let notesContainer = document.getElementById("container");
let noteTemplate = document.getElementById("note_template");
let draggedNote;
let grabPointX;
let grabPointY;

addButton.addEventListener("click", addNote);

document.addEventListener('mousemove', onDrag, false);
document.addEventListener('mouseup', onDragEnd, false);
document.addEventListener('click', showClickPoint);

function addNote() {
    let note = noteTemplate.content.cloneNode(true).querySelector(".note");
    console.log(note);
    note.style.order = 1;
    note.addEventListener("mousedown", onDragStart, false);
    increaseOrderOfNotesAfterTarget(Infinity, 1);
    notesContainer.appendChild(note);
}

function changeOrderOfNotes(draggedNoteOrder, targetNoteOrder) {
    if (draggedNoteOrder > targetNoteOrder) {
        increaseOrderOfNotesAfterTarget(draggedNoteOrder, targetNoteOrder);
    } else if (draggedNoteOrder < targetNoteOrder) {
        decreaseOrderOfNotesBeforeTarget(draggedNoteOrder, targetNoteOrder);
    }
}

function increaseOrderOfNotesAfterTarget(draggedNoteOrder, targetNoteOrder) {
    let notes = document.getElementsByClassName("note");
    let currentOrder = 0;
    
    for (let i=0; i<notes.length; i++) {
        currentOrder = notes[i].style.order;
        
        if (currentOrder >= targetNoteOrder && currentOrder < draggedNoteOrder) {
            notes[i].style.order = ++currentOrder;
        }
    }
}

function decreaseOrderOfNotesBeforeTarget(draggedNoteOrder, targetNoteOrder) {
    let notes = document.getElementsByClassName("note");
    let currentOrder = 0;
    
    for (let i=0; i<notes.length; i++) {
        currentOrder = notes[i].style.order;
        
        if (currentOrder <= targetNoteOrder && currentOrder > draggedNoteOrder) {
            notes[i].style.order = --currentOrder;
        }
    }
}

function decreaseOrderOfNotesAfterTarget(draggedNoteOrder) {
    let notes = document.getElementsByClassName("note");
    let currentOrder = 0;
    
    for (let i=0; i<notes.length; i++) {
        currentOrder = notes[i].style.order;
        
        if (currentOrder > draggedNoteOrder) {
            notes[i].style.order = --currentOrder;
        }
    }
}

function onDragStart(event) {
    if (event.target.className.indexOf("bar") === -1) {
        return;
    }
    
    draggedNote = this;
    
    grabPointY = event.clientY;
    grabPointX = event.clientX;
}

function onDrag(event) {
    if (!draggedNote) {
        return;
    }
    
    let currentX = event.clientX - grabPointX;
    let currentY = event.clientY - grabPointY;
    
    draggedNote.style.transform = "translateX(" 
        + currentX + "px) translateY(" 
        + currentY + "px)";
}

function onDragEnd(event) {
    
    if (draggedNote == null) {
        return;
    }
    
    draggedNote.style.transform = null;
    
    let targetElement = document.elementFromPoint(event.clientX, event.clientY);
    
    if (targetElement != null && targetElement.className.includes("delete")) {
        decreaseOrderOfNotesAfterTarget(draggedNote.style.order);
        draggedNote.parentElement.removeChild(draggedNote);
    }
    
    let targetNoteOrder = 0;
    
    if (targetElement != null && targetElement.parentElement != null) {
        targetNoteOrder = targetElement.parentElement.style.order;
    }
    
    if (targetNoteOrder > 0) {
        changeOrderOfNotes(draggedNote.style.order, targetNoteOrder);
        draggedNote.style.order = targetNoteOrder;
    }
    
    draggedNote = null;
    grabPointX = null;
    grabPointY = null;
}

function showClickPoint(event) {
    let targetElement = document.elementFromPoint(event.clientX, event.clientY);
    console.log(targetElement);
    console.log(targetElement.parentElement);
}