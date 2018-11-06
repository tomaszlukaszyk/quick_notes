export class Note {
    constructor() {
        this._title = "";
        this._content = "";
    }
    
    static createFromObject(object) {
        let note = new Note();
        Object.assign(note, object);
        return note;
    }
    
    get title() {
        return this._title;
    }
    
    set title(value) {
        this._title = value;
    }
    
    get content() {
        return this._content;
    }
    
    set content(value) {
        this._content = value;
    }
}