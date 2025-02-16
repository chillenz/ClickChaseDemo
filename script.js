const box = document.getElementById('clickbox');
const clickdisplay = document.getElementById('clickamount');
const shopbutton = document.getElementById('shopbutton');
const statsbutton = document.getElementById('statsbutton');
const settingbutton = document.getElementById('settingbutton');
const shop = document.getElementById('shop');
const setting = document.getElementById('setting');
const stats = document.getElementById('stats');
clicks = 0;
let inStats = false;
let inSetting = false;
let inShop = false;
const currentclicks = document.getElementById('currentclicks');
const totalclicks = document.getElementById('totalclicks')
const boxarea = document.getElementById('boxarea')
let randomTop = (Math.random() * 100);
let randomLeft = (Math.random() * 100);
let Xtravel = 0;
let Ytravel = 0;
let oldTop = 50;
let oldLeft = 50;
let totalTravel = 0;
const totaldistance = document.getElementById('totaldistance');
const rainbow = document.getElementById('rainbow');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const purple = document.getElementById('purple');
const white = document.getElementById('white');
const customcolor = document.getElementById('customcolor');
const colorInput = document.getElementById('customcolor')
let soundVolume = 1;
const volumeInput = document.getElementById('volumevalue')
const volume = document.getElementById('volumevaluedisplay')
const boxtransition = document.getElementById('boxtransition');
const boxtransitiontoggle = document.getElementById('boxtransitiontoggle');
const boxtransitionsetting = document.getElementById('boxtransitionsetting');
let transitionOn = true;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function movebox(){
    const clicksfx = new Audio('cookieclickerpress.wav');
    clicksfx.volume = soundVolume;
    clicksfx.play();
    randomTop = (Math.random() * 100);
    randomLeft = (Math.random() * 100);
    box.style.top = `${randomTop}%`;
    box.style.left = `${randomLeft}%`;

    clicks += 1
    clickdisplay.innerText = `${clicks} Clicks`
    totalclicks.innerHTML = `Total clicks: <span class='statsinfo'>${clicks}</span>`;
    currentclicks.innerHTML = `Current clicks: <span class='statsinfo'>${clicks}</span>`;
    if (clicks > 999999){
        clickdisplay.innerText = `${(clicks/1000000).toFixed(3)} Million Clicks`
        totalclicks.innerHTML = `Total clicks: <span class='statsinfo'>${(clicks/1000000).toFixed(3)}</span> Million`;
        currentclicks.innerHTML = `Current clicks: <span class='statsinfo'>${(clicks/1000000).toFixed(3)}</span> Million`;
    }
    if (oldTop>randomTop){
        Ytravel += (oldTop-randomTop)*(boxarea.offsetHeight/100)
    } else{
        Ytravel += (randomTop-oldTop)*(boxarea.offsetHeight/100)
    }

    if (oldLeft>randomLeft){
        Xtravel += (oldLeft-randomLeft)*(boxarea.offsetWidth/100)
    } else{
        Xtravel += (randomLeft-oldLeft)*(boxarea.offsetWidth/100)
    }
    oldLeft = randomLeft
    oldTop = randomTop
    totalTravel = ((Xtravel**2) + (Ytravel**2))**0.5;
    totaldistance.innerHTML = `Box total distance: <span class="statsinfo">${totalTravel.toFixed(2)}px</span>`;

    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `${event.clientX}px`;
    div.style.top = `${event.clientY}px`;
    div.style.padding = "5px";
    div.style.color = "white";
    div.style.fontSize = "25px";
    div.style.borderRadius = "5px";
    div.style.whiteSpace = "nowrap";
    div.style.fontFamily = "Zilla Slab";
    div.style.animation = "textfade 1s linear";
    div.style.userSelect = 'none';

    div.innerText = "+1";

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1000);
}

box.addEventListener('click', movebox);


function openpage(page){
    const clicksfx = new Audio('cookieclickerpress.wav');
    clicksfx.volume = soundVolume;
    clicksfx.play();
    if (page==='stats'){
        if (inStats === false){
            stats.style.left = '50%';
            inShop = false;
            inSetting = false;
            inStats = true;
            setting.style.left = '140%';
            shop.style.top = '100%';
        } else{
            stats.style.left = '-40%';
            inStats = false;
        }
    } else if (page==='setting'){
        if (inSetting === false){
            setting.style.left = '50%';
            inShop = false;
            inSetting = true;
            inStats = false;
            stats.style.left = '-40%';
            shop.style.top = '100%';
        } else{
            setting.style.left = '140%';
            inSetting = false;
        }
    } else if (page==='shop'){
        if (inShop === false){
            shop.style.top = '126px';
            inShop = true;
            inSetting = false;
            inStats = false;
            setting.style.left = '140%';
            stats.style.left = '-40%';
        } else{
            shop.style.top = '100%';
            inShop = false;
        }
    } else{
        setting.style.left = '140%';
        stats.style.left = '-40%';
        shop.style.top = '100%';
        inSetting = false;
        inStats = false;
        inShop = false;
    }
}

shopbutton.addEventListener('click', () => openpage('shop'));
settingbutton.addEventListener('click', () => openpage('setting'));
statsbutton.addEventListener('click', () => openpage('stats'));
document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => openpage('close'));
});

function changeboxcolor(color){
    const clicksfx = new Audio('cookieclickerpress.wav');
    clicksfx.volume = soundVolume;
    clicksfx.play();
    if (color!='rainbow'){
        box.style.animation = 'none';
        box.style.backgroundColor = `${color}`;
    } else{
        box.style.animation = 'rainbow 10s infinite linear'
    }
}

rainbow.addEventListener('click', () => changeboxcolor('rainbow'));
red.addEventListener('click', () => changeboxcolor('red'));
blue.addEventListener('click', () => changeboxcolor('blue'));
green.addEventListener('click', () => changeboxcolor('green'));
yellow.addEventListener('click', () => changeboxcolor('yellow'));
purple.addEventListener('click', () => changeboxcolor('purple'));
white.addEventListener('click', () => changeboxcolor('white'));
colorInput.addEventListener('input', function(event) {
    const newColor = event.target.value;
    box.style.backgroundColor = newColor;
    box.style.animation = 'none';
});


volumeInput.addEventListener('input', function(event){
    volume.innerText = `${event.target.value}%`;
    soundVolume = event.target.value/100
    const clicksfx = new Audio('cookieclickerpress.wav');
    clicksfx.volume = soundVolume;
    clicksfx.play();
});

function toggletransition(){
    const clicksfx = new Audio('cookieclickerpress.wav');
    clicksfx.volume = soundVolume;
    clicksfx.play();
    if (transitionOn===true){
        boxtransition.innerHTML = 'Transition <span class="on-off">OFF</span>'
        boxtransitiontoggle.style.backgroundColor = '#4c4d4c';
        boxtransitiontoggle.style.boxShadow = 'none';
        transitionOn = false;
        box.style.transition = 'none';
    }else{
        boxtransition.innerHTML = 'Transition <span class="on-off">ON</span>'
        boxtransitiontoggle.style.backgroundColor = 'lightcyan';
        boxtransitiontoggle.style.boxShadow = '0px 0px 10px 10px rgba(224, 255, 255, 0.137)';
        transitionOn = true;
        box.style.transition = 'top 0.2s, left 0.2s';
    }
}

boxtransitionsetting.addEventListener('click', toggletransition);