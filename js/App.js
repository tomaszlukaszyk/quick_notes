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