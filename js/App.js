"use strict";

import {storage} from "./Storage.js";
import {noteRenderer} from "./NoteRenderer.js";
import {Note} from "./Note.js";

let addButton = document.getElementById("add");
addButton.addEventListener("click", newNote);

function newNote() {
    let note = new Note();
    storage.add(note);
    noteRenderer.render();
}

noteRenderer.render();

let helpButton = document.getElementById("help");
let instruction = document.getElementById("instruction");
helpButton.addEventListener("click", toggleInstruction);

function toggleInstruction() {
    if (instruction.style.display == "none") {
        instruction.style.display = "block";
    } else {
        instruction.style.display = "none";
    }
}

let closeButton = document.getElementById("close");
closeButton.addEventListener("click", closeInstruction);

function closeInstruction() {
    instruction.style.display = "none";
}