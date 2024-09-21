
const cards = 16;
const funny_video = false;
const animation_speed = 145;
let paused_animation = true;

const followCardID = Math.round(cards / 2) - 1;

window.addEventListener('keydown', setKeys);
window.addEventListener('DOMContentLoaded', loadSavedCardTitlesAndImages);

function saveToLocalStorage(id, content) {
    localStorage.setItem(id, content);
}

function loadFromLocalStorage(id) {
    return localStorage.getItem(id) || '';
}

function loadSavedCardTitlesAndImages() {
    for (let cardIndex = 0; cardIndex < cards; cardIndex++) {
        
        const hexTopTitle = document.getElementById(`hex-top-title${cardIndex}`);
        const hexMidTitle = document.getElementById(`hex-mid-title${cardIndex}`);
        const hexBottTitle = document.getElementById(`hex-bott-title${cardIndex}`);
        const mainTitle = document.getElementById(`main-title${cardIndex}`);
        const descriptionText = document.getElementById(`description-text-${cardIndex}`);

        if (hexTopTitle) hexTopTitle.innerHTML = loadFromLocalStorage(`hex-top-title${cardIndex}`) || hexTopTitle.innerHTML;
        if (hexMidTitle) hexMidTitle.innerHTML = loadFromLocalStorage(`hex-mid-title${cardIndex}`) || hexMidTitle.innerHTML;
        if (hexBottTitle) hexBottTitle.innerHTML = loadFromLocalStorage(`hex-bott-title${cardIndex}`) || hexBottTitle.innerHTML;
        if (mainTitle) mainTitle.innerHTML = loadFromLocalStorage(`main-title${cardIndex}`) || mainTitle.innerHTML;
        if (descriptionText) descriptionText.innerHTML = loadFromLocalStorage(`description-text-${cardIndex}`) || descriptionText.innerHTML;

        const descriptionImage = document.getElementById(`description-image-${cardIndex}`);
        if (descriptionImage) descriptionImage.src = loadFromLocalStorage(`description-image-${cardIndex}`) || descriptionImage.src;
    }
}

function setKeys(e) {

    if (e.key === 'Escape') {
        toggleAnimation();
    }
}

const cardsContainer = document.querySelector('.cards');
const main = document.querySelector('main');
cardsContainer.style.gridTemplateColumns = `repeat(${cards + 1}, 379px)`;
main.style.animationDuration = animation_speed + 's';

setInterval(() => paused_animation ? main.style.animationName = 'none' : main.style.animationName = 'cardAnimation', 100);

for (let cardIndex = 0; cardIndex < cards; cardIndex++) {
    const _c = document.createElement('div');

    if (cardIndex !== (followCardID - 1)) {
        _c.innerHTML = `
            <div class="top">
                <div class="hexagon-items">
                    <div class="hexagon-top-title" id="hex-top-title${cardIndex}" onclick="editTitle(document.getElementById('hex-top-title${cardIndex}'))">napis1</div>
                    <div class="hexagon-middle-title" id="hex-mid-title${cardIndex}" onclick="editTitle(document.getElementById('hex-mid-title${cardIndex}'))">napis2</div>
                    <div class="hexagon-bottom-title" id="hex-bott-title${cardIndex}" onclick="editTitle(document.getElementById('hex-bott-title${cardIndex}'))">napis3</div>
                    <div class="hexagon-container"><img class="hexagon" alt="hexagon-image" draggable="false"></div>
                </div>
            </div>

            <div class="title-container">
                <div class="title" id="main-title${cardIndex}" onclick="editTitle(document.getElementById('main-title${cardIndex}'))">Tytuł</div>
            </div>

            <div class="description">
                <p class="description-text" id="description-text-${cardIndex}" onclick="editTitle(document.getElementById('description-text-${cardIndex}'))">
                    to jest krótki opis który ma się odnosić do tytułu.
                </p>
                <div class="description-image-container">
                    <img class="description-image" id="description-image-${cardIndex}" onclick="editImg(document.getElementById('description-image-${cardIndex}'))" draggable="false" alt="description-image" src="example_image.png">
                </div>
            </div>
        `;
    } else {
        _c.innerHTML = `
            <div class="top">
                <div class="hexagon-items">
                    <div class="hexagon-top-title">&nbsp;</div>
                    <div class="hexagon-middle-title">Nie Zapomnij</div>
                    <div class="hexagon-bottom-title">&nbsp;</div>
                    <div class="hexagon-container"><img class="hexagon" alt="hexagon-image" draggable="false"></div>
                </div>
            </div>

            <div class="title-container">
                <div class="title">Zaobserwować</div>
            </div>

            <div class="description">
                <p class="description-text">Dzięki temu mamy więcej motywacji do tworzenia lepszych filmów!</p>
                <div class="description-image-container"><img class="description-image" draggable="false" src="" alt="our-profile-image"></div>
            </div>
        `;
    }
    _c.classList.add('card');
    cardsContainer.appendChild(_c);
}

const hex = document.getElementsByClassName('hexagon');

function isFunnyVideo() {
    const hexSource = funny_video ? 'yellow_hexagon.png' : 'orange_hexagon.png';

    for (let i = 0; i < hex.length; i++) 
        hex[i].src = hexSource;
}
isFunnyVideo();

function editTitle(title) {
    const promptText = capitalize(prompt('Enter title: '));
    function checkPromptText(txt) {
        if (txt.trim().length < 175) {
            return txt.trim() === '' ? '&nbsp;' : txt;
        } else {
            alert('Text too long!');
            return txt.trim() === '' ? '&nbsp;' : txt;
        } 
    }
    const newContent = checkPromptText(promptText);
    title.innerHTML = newContent;
    saveToLocalStorage(title.id, newContent);
}

function editImg(img) {
    const promptImage = prompt('Enter image source: ');
    const newSrc = (promptImage.trim() === '' ? 'example_image.png' : promptImage);
    img.src = newSrc;
    saveToLocalStorage(img.id, newSrc);
}

const toggleAnimation = () => paused_animation ? paused_animation = false : paused_animation = true;
const capitalize = (text) => text.length === 0 ? ' ' : text[0].toUpperCase() + text.slice(1);