
const trebleKey = document.getElementById('treble-li');
const bassKey = document.getElementById('bass-li');

let selectedOctave = "";

function openPartiture (clicked, type) {
    const pageTitle = document.querySelector('h1');
    const paragraph = document.querySelectorAll('p'); 
    const list = document.querySelector ('ul');
    const listItems = document.querySelectorAll('li');
    const octavaTrebleShow = document.querySelector('div.treble-keys'); 
    const octavaBassShow = document.querySelector('div.bass-keys');
    clicked.addEventListener('click', function(e){
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

if (trebleKey)openPartiture(trebleKey, 'treble');
if (bassKey)openPartiture(bassKey, 'bass');

const octaveButtonsArray = document.getElementsByClassName('octava__button');
function switchOctaves (clicked){
    const imgOctavaSubContra = document.getElementById('img-bass-partiture-controctave');
    const octaveButtonsIds = [...document.getElementsByClassName('octava__button')].map(el => el.id);
    const octaveName = clicked.id; 
    
    clicked.addEventListener('click', function (e){
        let notesArray = [...document.getElementsByClassName("note")].forEach(el => el.classList.add('_show'));

        octaveButtonsIds.forEach(id => imgOctavaSubContra.classList.remove(`_show-${id}`));
        imgOctavaSubContra.classList.add(`_show-${octaveName}`);
        selectedOctave = clicked.id;
        console.log(selectedOctave);
        [...octaveButtonsArray].forEach((el) => {
            if(el.id !== clicked.id) {
                el.classList.remove('colour')
            }
        })
        clicked.classList.add('colour');
    })
} 
for (octaveName of octaveButtonsArray) {
    switchOctaves(octaveName);
} 
// if (buttonOctavaContra)switchOctaves(buttonOctavaContra);

// octaveButtonsArray.addEventListener('click', function(clicked){
//     clicked.style.backgro
// })

let showNoteDo = document.getElementById('note-do');
const notesArray = document.getElementsByClassName('note');

function openOctavaImg (hover) {
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
const labelNote = document.getElementById('label__block');
function showNoteLabel (hovered){
    const noteNamesArray = {'do':'ДО', 're':'РЕ', 'mi': 'МИ', 'fa':'ФА', 'sol':'СОЛЬ', 'la': 'ЛЯ', 'si':'СИ'};
    hovered.addEventListener('mouseover', function(e){
        const noteNamePic = hovered.id.substr(5);
        const noteName = document.createElement("div");
        noteName.id = 'note-name';
        noteName.innerText = noteNamesArray[noteNamePic] || "";
        labelNote.append(noteName);
    })
    hovered.addEventListener('mouseleave', function(e){
        const noteName = document.getElementById('note-name');
        noteName.remove()
    })
}

for(noteElement of notesArray) {
    openOctavaImg(noteElement)
    showNoteLabel(noteElement)
}

const keysNames = {
    SCO: ['la', 'si'],
    CO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    GO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    SO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    FO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    SecondO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    ThirdO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'],
    FourthO: ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do5'],

}

function createKeyboard (){
    const keyboardFrameWhite = document.getElementById('white-keys__block');
    for (key in keysNames){
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

