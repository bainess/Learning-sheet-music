'use strict'

const trebleKey = document.getElementById('treble-li');
const bassKey = document.getElementById('bass-li');

let selectedOctave = "";
let selectedNote = "";
let selectedKey = "";

function openPartiture (clicked, type) {
    const pageTitle = document.querySelector('h1');
    const paragraph = document.querySelectorAll('p'); 
    const list = document.querySelector ('ul');
    const listItems = document.querySelectorAll('li');
    const octavaTrebleShow = document.querySelector('div.treble-keys'); 
    const octavaBassShow = document.querySelector('div.bass-keys');
    clicked.addEventListener('click', function(e){
        selectedKey = type; 
        pageTitle.classList.add('_active');
        for (let node of paragraph){
            node.classList.add('_active');
        }
        list.classList.add('_active');
        for (let node of listItems){
            node.classList.add('_active');
        }
        if(type === 'treble') {
            octavaTrebleShow.classList.add('_show');
            octavaBassShow.classList.remove('_show');
        } else if (type === 'bass') {
            octavaBassShow.classList.add('_show');
            octavaTrebleShow.classList.remove('_show');
        }
    });
    
}

if (trebleKey) openPartiture(trebleKey, 'treble');
if (bassKey) openPartiture(bassKey, 'bass');

const setOctave = (octaveId) => {
    const octaveButtonsIds = [...document.getElementsByClassName('octava__button')].map(el => el.id);
    const imgOctavaSubContra = document.getElementById('img-bass-partiture-controctave');

        octaveButtonsIds.forEach(id => imgOctavaSubContra.classList.remove(`_show-${id}`));
        imgOctavaSubContra.classList.add(`_show-${octaveId}`);
        if (octaveId == 'SO' || octaveId == "TSO") { 
            selectedOctave = 'SmallOctave'
        } else if (octaveId == 'FO' || octaveId == 'TFirst') {
            selectedOctave = 'FirstOctave' 
        } else {
            selectedOctave = octaveId;
        }
        console.log(selectedOctave);
        [...octaveButtonsArray].forEach((el) => {
            if(el.id !== octaveId) {
                el.classList.remove('colour')
            } else {
                el.classList.add('colour')
            }
        })
}

const octaveButtonsArray = document.getElementsByClassName('octava__button');
function switchOctaves(clicked){
    clicked.addEventListener('click', function (e){
        setOctave(clicked.id)
    })
} 
for (let octaveName of octaveButtonsArray) {
    switchOctaves(octaveName);
} 

let showNoteDo = document.getElementById('note-do');
const notesArray = document.getElementsByClassName('note');

function openOctavaImg (hover) {
    [...document.getElementsByClassName("note")].forEach(el => el.classList.add('_show'));
    const shadeLeft = document.getElementById('shade-left');
    const shadeRight = document.getElementById('shade-right');
    const noteName = hover.id.substr(5)

    hover.addEventListener('mouseover', function(e){
        shadeLeft.classList.add(noteName);
        shadeRight.classList.add(noteName);
    })

    hover.addEventListener('mouseleave', function(e){
        shadeLeft.classList.remove(noteName);
        shadeRight.classList.remove(noteName);
    })
}


const createNoteLabel = (noteNamePic) => {
    console.log(noteNamePic)
    const labelNote = document.getElementById('label__block');
    const noteNamesArray = {'do':'ДО', 're':'РЕ', 'mi': 'МИ', 'fa':'ФА', 'sol':'СОЛЬ', 'la': 'ЛЯ', 'si':'СИ'};
    selectedNote = noteNamePic;
    const noteName = document.createElement("div");
    noteName.id = 'note-name';
    noteName.innerText = noteNamesArray[noteNamePic] || "";
    labelNote.append(noteName);
}

const hideNoteLabel = () => {
    const noteName = document.getElementById('note-name');
    if(noteName) noteName.remove()
}

function showNoteLabel(hovered) {
    const _noteNamePic = hovered.id.substr(5);

    hovered.addEventListener('mouseover', function(e) {
        hideNoteLabel();
        createNoteLabel(_noteNamePic)
    })
    hovered.addEventListener('mouseleave', function(e){
        hideNoteLabel()
    })
}

const keysNames = {
    SCO: ['la', 'si'],
    CO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    GO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    SmallOctave: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    FirstOctave: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    TSecond: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    TThird: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    TFourth: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do5'],
}

function createKeyboard (){
    const keyboardFrameWhite = document.getElementById('white-keys__block');
    for (let key in keysNames){
        keysNames[key].forEach((e) =>{
            let keyWhite = document.createElement('div');
            keyWhite.classList.add('white-keys');
            keyWhite.id = `${key} ${e}`;
            keyboardFrameWhite.append(keyWhite);
        });   
    }
    const keyboardFrameBlack = document.getElementById('black-keys__block');
    for (let i = 53; i <= 88 ; i++){
        let key = document.createElement('div');
        key.classList.add('black-keys');
        key.id = `key-${i}`;
        keyboardFrameBlack.append(key);
    }
}
if (trebleKey || bassKey) createKeyboard()

function showNoteHovered(hovered) {
    hovered.addEventListener('mouseover', () => {
        if(selectedOctave && selectedNote) {
            const key = document.getElementById(`${selectedOctave} ${selectedNote}`);
            key.classList.add('_pressed');
        }
    })
    hovered.addEventListener('mouseleave', () => {
        if(selectedOctave && selectedNote) {
            const key = document.getElementById(`${selectedOctave} ${selectedNote}`);
            key.classList.remove('_pressed');
        }
    })
}

for(let noteElement of notesArray) {
    openOctavaImg(noteElement)
    showNoteLabel(noteElement)
    showNoteHovered(noteElement)
}

let keysWhite = document.getElementsByClassName('white-keys');
function showNotePressed(pressed){
    const shadeLeft = document.getElementById('shade-left');
    const shadeRight = document.getElementById('shade-right');
    const notesList = document.getElementsByClassName('note');
    
    function getNoteName(name) {
        let index = name.indexOf(' ');
        return name.substr(index+1);
    }
    function getOctaveName(name) {
        let index = name.indexOf(' ');
        return name.substr(0, index);
    }

    let octaveName = getOctaveName(pressed.id);
    let noteName = getNoteName(pressed.id);

    pressed.addEventListener('mousedown', function(e) {
        // selectedKey
        const pressKey = () => {
        if (selectedOctave) pressed.classList.add('_pressed');
        shadeLeft.classList.add(noteName);
        shadeRight.classList.add(noteName);
        let actualOctaveName = octaveName;
        if(octaveName === "SmallOctave" && selectedKey === "bass") {
            actualOctaveName = "SO"
        }
        if(octaveName === "SmallOctave" && selectedKey === "treble") {
            actualOctaveName = "TSO"
        }
        if(octaveName === "FirstOctave" && selectedKey === "bass") {
            actualOctaveName = "FO"
        }
        if(octaveName === "FirstOctave" && selectedKey === "treble") {
            actualOctaveName = "TFirst"
        }
        setOctave(actualOctaveName)
        hideNoteLabel()
        createNoteLabel(noteName)
        }
        if(['SCO', 'CO', 'GO'].includes(octaveName)) {
            if(selectedKey === 'bass') {
                pressKey()
            }
        } else if(['TSecond', 'TThird', 'TFourth'].includes(octaveName)) {
            if(selectedKey === 'treble') {
                pressKey()
            }
        } else {
            pressKey()
        }  
        pressed.addEventListener('mouseup', function(e){
        if(selectedOctave) pressed.classList.remove('_pressed');
        shadeLeft.classList.remove(noteName);
        shadeRight.classList.remove(noteName);
    });
}
    )}


for (let key of keysWhite) showNotePressed(key);