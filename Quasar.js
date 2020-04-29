
// Sidebar
const body = document.getElementsByTagName("body")[0];
const sidebar = document.createElement('div');
const sidebarWrapper = document.createElement('div');
globalPlayer = ig.game.player;

options = {
    tweaks: {
        name: 'tweaks',
        description: 'General game modifications and scripts.',
        icon: 'http://pixelartmaker.com/art/ccf784203579330.png',
        iconWidth: '32px',
        iconHeight: '32px',
        clickMenu: () => { openTweaks(); }
    },

    others: {
        name: 'others',
        description: 'Scripts and modifications that target other players.',
        icon: 'http://pixelartmaker.com/art/27d98c601747cba.png',
        iconWidth: '32px',
        iconHeight: '42px',
        clickMenu: () => { openOthers(); }
    },

    items: {
        name: 'items',
        description: 'Items for the player to equip.',
        icon: 'http://pixelartmaker.com/art/7ff2b0c1caed355.png',
        iconWidth: '32px',
        iconHeight: '32px',
        clickMenu: () => { openItems(); }
    },

    console: {
        name: 'console',
        description: 'Gives the user an easier finer control over game elements.',
        icon: 'http://pixelartmaker.com/art/86f8d6510d1a1a5.png',
        iconWidth: '32px',
        iconHeight: '32px',
        clickMenu: () => { openConsole(); }
    },

    about: {
        name: 'about',
        description: 'What is this?',
        icon: 'http://pixelartmaker.com/art/ca072140d35d318.png',
        iconWidth: '32px',
        iconHeight: '32px',
        clickMenu: () => { openAbout(); }
    }



}

othersCommands = {
    teleport: {
        name: 'Teleport',
        risk: 'yellow',
        run: (player) => { ig.game.player.pos = player.pos; }
    },

    spy: {
        name: 'Spy',
        risk: 'green',
        run: (player) => { consoleref.log('ooooo'); spyOn(player) }
    },

    block: {
        name: 'Block',
        risk: 'green',
        run: (player) => { block(player) }
    },

    steal: {
        name: 'Steal',
        risk: 'red',
        run: (player) => { ig.game.equip.item(player.attachments.b.id); }
    }
}

items = {
    liner: {
        name: 'Liner',
        risk: 'blue',
        id: '55729e01d5f4c32627237ea5',
        type: 'Holdable',
        icon: 'http://pixelartmaker.com/art/597072c94ba4700.png'

    },
    copter: {
        name: 'Copter',
        risk: 'blue',
        id: '530cc760f7047b0f2e000034',
        type: 'Mountable',
        icon: 'http://pixelartmaker.com/art/6b818bdb4c35909.png'

    },
    piano: {
        name: 'Piano',
        risk: 'blue',
        id: '545881f01375b8d1096616a4',
        type: 'Instrument',
        icon: 'http://pixelartmaker.com/art/3eff2e7e3945aa6.png'

    },
    hook: {
        name: 'Hook',
        risk: 'blue',
        id: '53389a0c4664348368000604',
        type: 'Holdable',
        icon: 'http://pixelartmaker.com/art/597072c94ba4700.png'

    },
    bomb: {
        name: 'Bomb',
        risk: 'blue',
        id: '532a3256cc5dc50928000092',
        type: 'Holdable',
        icon: 'http://pixelartmaker.com/art/597072c94ba4700.png'

    },
    throwBack: {
        name: 'Janitor',
        risk: 'blue',
        id: '5af2564bad163f7cda81accb',
        type: 'Body',
        icon: 'http://pixelartmaker.com/art/d8893cb81d9632d.png'
    },
    trumpet: {
        name: 'Trumpet',
        risk: 'blue',
        id: '5a70f99c7ae3cb8713b64c56',
        type: 'Instrument',
        icon: 'http://pixelartmaker.com/art/3eff2e7e3945aa6.png'

    },

},

    tweaks = {
        ghostWalk: {
            name: 'Ghost Walk',
            risk: 'green',
            information: 'Allows user to move away from their current position while others stil percieve them as being in the same spot.',
            enabled: false,
            enable: () => { ghostWalk(true); },
            disable: () => { ghostWalk(false); },
            icon: 'http://pixelartmaker.com/art/114e5db579429d7.png'


        },
        godMode: {
            name: 'God Mode',
            risk: 'green',
            information: 'Makes the player invinceable to all damage types.',
            enabled: false,
            enable: () => { ig.game.player.kill = () => { }; },
            disable: () => { ig.game.player.kill = storedKill; },
            icon: 'http://pixelartmaker.com/art/90dc71b5a5c7293.png'


        },
        hide: {
            name: 'Hide',
            risk: 'green',
            information: 'Removes the users presence from the world when they are still there.',
            enabled: false,
            enable: () => { hide(true); },
            disable: () => { hide(false); },
            icon: 'http://pixelartmaker.com/art/07f36ec6e63cf2f.png'


        },
        clickTeleport: {
            name: 'Click Teleport',
            risk: 'yellow',
            information: 'Allows the user to click anywhere on the screen, and have the player teleport to that location. Ctrl + click',
            enabled: false,
            enable: () => { clickTeleport(true); },
            disable: () => { clickTeleport(false); },
            icon: 'http://pixelartmaker.com/art/c8493695c4f9340.png'


        },
        playerDrag: {
            name: 'Player Drag',
            risk: 'red',
            information: 'User is now able to drag the player across the screen, for best results use with godmode. Right click',
            enabled: false,
            enable: () => { setDrag = setInterval(playerDrag); },
            disable: () => { clearInterval(setDrag); },
            icon: 'http://pixelartmaker.com/art/a2c93d4ae8a66bb.png'


        },
        randomName: {
            name: 'Random Name',
            risk: 'yellow',
            information: 'Randomly changes the users name at a rapid rate.',
            enabled: false,
            enable: () => { randomizeName(true); },
            disable: () => { randomizeName(false); },
            icon: 'http://pixelartmaker.com/art/7415cf1bbb66159.png'


        }
    }
commandAbout = {
    cmds: 'Prints list of commands.',
    channel: 'Run a script that targets a player. channel [player] [script]',
    toggle: 'Toggle a script. toggle [script]',
    usage: 'Links to the command line and menus documentation.'

}



const commands = {
    cmds: (instance) => {
        for (i in commands) {
            instance.output(`<u>${commands[i].name}:</u> ${commandAbout[i]}\n`);
        }
    },
    channel: (instance, arguments) => {
        let targetedPlayer = null;
        let broken = false;
        if(typeof arguments[0] === 'undefined') {
            instance.output('Please specify a player...');
            return;
        }

        ig.game.players.forEach(target => {
            target.screenName.includes(' ') ? removedSpacesName = target.screenName.replace(/ /g, '') : removedSpacesName = target.screenName;
            if (removedSpacesName.includes(arguments[0])) {
                targetedPlayer = target;
            }
        })
        
        
        
        if (targetedPlayer == null) {
            instance.output('Player not found...');
            return;
        }

        if (arguments[1].toLowerCase() === 'spy') {
            instance.output('Using Spy via command line is currently unsupported...');
            return;
        }

        for (i in othersCommands) {
            if (arguments[1].toLowerCase() === othersCommands[i].name.toLowerCase()) {
                othersCommands[i].run(targetedPlayer);
                instance.output(`Ran ${othersCommands[i].name} on ${targetedPlayer.screenName}!`);
                broken = true;
                break;
            }
        }
        if (!broken) instance.output('Script not found...');
    },
    toggle: (instance, arguments) => {
        let command = null;
        if(typeof arguments[0] === 'undefined') {
            instance.output('Please specify a tweak...');
            return;
        }
        arguments[0].includes('-') ? command = arguments[0].replace(/-/g, ' ') : command = arguments[0];
        for (i in tweaks) {
            if (command.toLowerCase() === tweaks[i].name.toLowerCase()) {
                if (tweaks[i].enabled) {
                    tweaks[i].disable();
                    tweaks[i].enabled = false;
                    instance.output(`${tweaks[i].name} disabled!`);

                } else {
                    tweaks[i].enable();
                    tweaks[i].enabled = true;
                    instance.output(`${tweaks[i].name} enabled!`);
                }
                return;
            }
        }
        instance.output('Tweak not found...');
    },
    usage: (instance) => {
        instance.output('<a href = "https://github.com/ZoltarML/Quasar/">Documentation</a>.');
    }

}

// Parsing options into HTML
for (i in options) {
    let iterateOption = document.createElement('a');
    iterateOption.href = "#";
    iterateOption.innerHTML = `<img src="${options[i].icon}" width="${options[i].iconWidth}" height="${options[i].iconWidth}"></img><span class="tooltip">${options[i].description}</span>`;
    sidebarWrapper.appendChild(iterateOption);
    iterateOption.onclick = options[i].clickMenu;

    if (options[i].icon !== "http://pixelartmaker.com/art/86f8d6510d1a1a5.png") {
        eval(`${options[i].name}Menu = document.createElement("div"); body.appendChild(${options[i].name}Menu); ${options[i].name}Menu.classList.add('quasar-submenu')`);

    } else {
        term = document.createElement('div');
        term.id = "vanilla-terminal";
        body.appendChild(term);
        term.classList.add('quasar-submenu');
    }


}

// Getting CSS
async function loadCSS() {
    fetch('https://cdn.jsdelivr.net/gh/ZoltarML/Quasar@latest/Style.css').then(resp => resp.text()).then(css => {
        let style = document.createElement('style');
        style.innerHTML = css;
        $('head')[0].appendChild(style);
    })
}


// Getting Parses deobfuscator and Vanilla Terminal
!async function main() {
    if (typeof VanillaTerminal !== 'undefined')
        return

    await $.getScript('https://cdn.jsdelivr.net/gh/soyjavi/vanilla-terminal@latest/dist/vanilla-terminal.js');


    loadCSS().then(
        async () => {
            if (typeof Deobfuscator === 'undefined')
                // Parses deobf
                await $.getScript("https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js");

            startQuasar(); setInterval(updatePlayers, 0);

        }
    );
}()
let subMenuOpen = false;


altcam = function () {
    this[topCV] || (this[tempEval](),
        this[deviceCheck](),
        this[autoSpeedOffsetMath](),
        this[camSpeed]());
    var a = ig.game[compared] ? 100 : 0
        , b = ig.game.userMapDialog && ig.game.userMapDialog.isOpen ? ig.game.userMapDialog[mapAct] : 0
        , c = globalPlayer
    pFXM.isRunning && ("focusOnMe" == pFXM[fxMisc1] && pFXM[fxMisc2]) && (c = pFXM[fxMisc2]);
    this.screenTarget.x = c.pos.x + this.offset.x - b + this.autoSpeedOffset.x + a;
    this.screenTarget.y = c.pos.y + this.offset.y + this[offsetAdditive1] + this[offsetAdditive2] + this.autoSpeedOffset.y;
    this[cameraMath]();
    this[zoomPlayer]();
    ig.ua.mobile && (this.screenTarget.x += 3);
    ig.game.player && (ig.game.player[pC1] && ig.game[pC2]) && this[targetMath]();
    ig.game.screen.x += this.temporaryOffset.x;
    ig.game.screen.y += this.temporaryOffset.y;
    this[comparedOr] || (this[comparedOr] = !0,
        this[screenMath]())
}

function startQuasar() {

    // I don't wanna talk about it...
    topCV = Deobfuscator.keyBetween(ig.game.camera.update, `{this.`, `||`).split('||')[0];
    tempEval = Deobfuscator.keyBetween(ig.game.camera.update, `function(){this.${topCV}`, `());`).split(',')[0].split('this.')[1].split('()')[0]
    deviceCheck = Deobfuscator.keyBetween(ig.game.camera.update, `function(){this.${topCV}`, `());`).split(',')[1].split('this.')[1].split('()')[0]
    autoSpeedOffsetMath = Deobfuscator.keyBetween(ig.game.camera.update, `function(){this.${topCV}`, `());`).split(',')[2].split('this.')[1].split('()')[0]
    camSpeed = Deobfuscator.keyBetween(ig.game.camera.update, `function(){this.${topCV}`, `());`).split(',')[3].split('this.')[1]
    compared = Deobfuscator.keyBetween(ig.game.camera.update, 'var a=ig.game.', '?100:0'); ig.game[compared];
    pFXMKey = Deobfuscator.object(ig.game, 'isRunning', true); pFXM = Deobfuscator.object(ig.game, 'isRunning');
    mapAct = Deobfuscator.keyBetween(ig.game.camera.update, 'ig.game.userMapDialog.', ':0,c=');
    fxMisc1 = Deobfuscator.keyBetween(ig.game.camera.update, `==ig.game.${pFXMKey}.`, `&&ig.game.${pFXMKey}`);
    fxMisc2 = Deobfuscator.keyBetween(ig.game.camera.update, `&&ig.game.${pFXMKey}.`, `)&&(`);
    offsetAdditive1 = Deobfuscator.keyBetween(ig.game.camera.update, `.y+this.`, `+this.`).split('+')[0];
    offsetAdditive2 = Deobfuscator.keyBetween(ig.game.camera.update, `.y+this.`, `+this.`).split('+')[1].split('this.').join('');
    cameraMath = Deobfuscator.keyBetween(ig.game.camera.update, `this.autoSpeedOffset.y;this.`, `();this.`);
    zoomPlayer = Deobfuscator.keyBetween(ig.game.camera.update, `();this.`, `();ig.ua`);
    playerKey = Deobfuscator.keyBetween(ig.game.camera.update, ',c=ig.game.', `;ig.game.${pFXMKey}`);
    pC1 = Deobfuscator.keyBetween(ig.game.camera.update, `ig.game.${playerKey}.`, `&&ig`);
    pC2 = Deobfuscator.keyBetween(ig.game.camera.update, `&&ig.game.`, `)&&this.`);
    targetMath = Deobfuscator.keyBetween(ig.game.camera.update, `)&&this.`, `();`);
    comparedOr = Deobfuscator.keyBetween(ig.game.camera.update, `Offset.y;this.`, `||`);
    screenMath = Deobfuscator.keyBetween(ig.game.camera.update, `=!0,this.`, `()`);


    //~~~~~~~~~~~~~ variables for ghostWalk

    client = Deobfuscator.object(ig.game, "lastState");
    rgUpdate = client.update;
    switchCheck = 0;
    movementVar = Deobfuscator.function(ig.game.player, "var a={p", true);
    const originalDraw = ig.game.player.draw;
    const originalUpdate = client.update;
    originalMovement = ig.game.player[movementVar];
    ogD = originalDraw;
    ig.game.player.odM = originalMovement;
    ig.game.player.frameStack = ig.game.player[Deobfuscator.keyBetween(ig.game.player[movementVar], "&&this.", ".shift")];
    frameStackVar = Deobfuscator.keyBetween(ig.game.player[movementVar], "&&this.", ".shift");
    //~~~~~~~~~~~~
    originalCamera = ig.game.camera.update;
    myID = ig.game.player[id];
    storedKill = ig.game.player.kill;
    body.appendChild(sidebar);
    sidebar.appendChild(sidebarWrapper);
    sidebar.id = "quasarBar";
    sidebar.classList.add("quasar-bar");
    sidebarWrapper.classList.add('quasar-wrapper');

    const terminal = new VanillaTerminal({ commands });
    terminal.clear();
    terminal.output(`Type 'cmds' for a list of commands. Type 'clear' to clear console.`);
    terminal.setPrompt('Quasar ');
    tt = terminal;

}

function closeAllSubMenus() {
    for (i in options) {
        if (options[i].icon !== "http://pixelartmaker.com/art/86f8d6510d1a1a5.png") {
            eval(`setTimeout(()=>{${options[i].name}Menu.style.visibility = "hidden";}, 500); ${options[i].name}Menu.style.top = "-500px"; ${options[i].name}Menu.innerHTML = '';`);

        } else {
            setTimeout(() => { term.style.visibility = "hidden"; }, 500); term.style.top = "-500px";
        }
    }
}

function openConsole() {


    if (!subMenuOpen) {
        term.style.visibility = "visible";
        term.style.top = "-3px";
        subMenuOpen = true;

    } else {
        closeAllSubMenus();
        subMenuOpen = false;
    }

}

function openOthers() {
    // What makes the playerImage element look nice
    let playerImageHolder = document.createElement('section');
    playerImageHolder.classList.add('player-pictureframe');
    playerImageHolder.width = 100;
    let image = new Image();

    // Displaying Name and Rank
    let nameDisplay = document.createElement('h3');
    let rankDisplay = document.createElement('h3');
    nameDisplay.classList.add('others-information');
    rankDisplay.classList.add('others-information');
    nameDisplay.style.width = '215px';
    rankDisplay.style = 'left: 220px; top: -12px';

    // Allows user to select command to execute
    let playerCommandSelector = document.createElement('select');
    playerCommandSelector.classList.add('player-picker');
    playerCommandSelector.style = 'padding-right: 14px; top: 84px; visibility: hidden;';

    let commandExecute = document.createElement('button');
    commandExecute.classList.add('execute-button');
    commandExecute.style.padding = '20px';
    commandExecute.style.left = '430px'
    commandExecute.innerHTML = 'Run';


    // Initial command option.
    let commandInfo = document.createElement('option');
    commandInfo.innerHTML = '~Select Command~';
    commandInfo.value = 0;
    playerCommandSelector.appendChild(commandInfo);

    // Getting commands from command list
    for (let i in othersCommands) {
        let option = document.createElement('option');
        option.innerHTML = othersCommands[i].name;
        option.style.color = othersCommands[i].risk;
        option.value = i + 1;
        playerCommandSelector.appendChild(option);
    }

    // Where players Image is displayed
    let playerImage = document.createElement('canvas');
    playerImage.style = "position: absolute; left: 60px; top: 20px;";
    let context = playerImage.getContext('2d');

    // Allows User to select Players
    let playerSelector = document.createElement('select');
    playerSelector.classList.add('player-picker');

    // Adding option to initalize selectPlayer
    let optionInfo = document.createElement('option');
    optionInfo.innerHTML = '~Select Player~';
    optionInfo.value = 0;
    playerSelector.appendChild(optionInfo);

    // Updating playerSelector options
    setInterval(() => {
        if (!$("select").is(":focus")) {
            playerSelector.innerHTML = '';
            // Re-adding informant option
            let optionInfo = document.createElement('option');
            optionInfo.innerHTML = '~Select Player~';
            optionInfo.value = 0;
            playerSelector.appendChild(optionInfo);

            // Adding players in game to PLayerSelector
            ig.game.players.forEach((player, i) => {
                let option = document.createElement('option');
                option.innerHTML = player.screenName;
                option.value = i + 1;
                playerSelector.appendChild(option);
            })
        }
    })

    previousSelected = "";
    image.src = 'http://pixelartmaker.com/art/0ab0f0cadd7cf2d.png';

    function othersMain() {
        requestAnimationFrame(othersMain);

        // Setting risk color in selector
        playerCommandSelector.options[0].style.color = 'white';
        if (playerCommandSelector.selectedOptions[0].label !== '~Select Command~') {
            for (let i in othersCommands) {
                if (othersCommands[i].name == playerCommandSelector.selectedOptions[0].label) {
                    playerCommandSelector.style.color = othersCommands[i].risk;
                    break;
                }
            }
        } else {
            playerCommandSelector.style.color = 'white';
        }


        if (playerSelector.selectedOptions[0].label == '~Select Player~') return;
        let selectedPlayer = null;

        for (i in ig.game.players) {
            target = ig.game.players[i];
            fixedSelectedPlayer = playerSelector.selectedOptions[0].label.replace(/ /g, '');
            removedSpacesName = target.screenName.replace(/ /g, '');
            if (removedSpacesName.includes(fixedSelectedPlayer)) {
                selectedPlayer = target;
                break;
            }
        }

        // Getting the first cell of the selected players body

        playerImage.width = (selectedPlayer.attachments.b.animSheet.image.width * 3) / 9;
        playerImage.height = selectedPlayer.attachments.b.animSheet.image.height * 3;
       

        context.clearRect(playerImage.x, playerImage.y, playerImage.width, playerImage.height);


        image.src = `http://images3.manyland.netdna-cdn.com/${selectedPlayer.attachments.b.id}`;
        context.drawImage(image, 0, 0, selectedPlayer.attachments.b.animSheet.image.width * 3, selectedPlayer.attachments.b.animSheet.image.height * 3);

        if (selectedPlayer !== previousSelected) {
            setTimeout(() => { $("select").blur() }, 500);
        }

        if (image.src !== 'http://pixelartmaker.com/art/0ab0f0cadd7cf2d.png') {
            nameDisplay.style.visibility = 'visible';
            rankDisplay.style.visibility = 'visible';
            playerCommandSelector.style.visibility = 'visible';
            commandExecute.style.visibility = 'visible';

            nameDisplay.innerHTML = `NAME: ${selectedPlayer.screenName}`;
            rankDisplay.innerHTML = `RANK: ${selectedPlayer.rank}`;
            nameDisplay.appendChild(rankDisplay);

            commandExecute.onclick = () => {
                for (let i in othersCommands) {
                    if (othersCommands[i].name == playerCommandSelector.selectedOptions[0].label) {
                        othersCommands[i].run(selectedPlayer);
                        break;
                    }
                }

            }

        }

        previousSelected = selectedPlayer;


    }

    if (!subMenuOpen) {
        othersMenu.style.visibility = "visible";
        othersMenu.style.height = "160px";
        othersMenu.style.width = "520px";
        othersMenu.appendChild(playerImageHolder);
        playerImageHolder.appendChild(playerImage);
        othersMenu.appendChild(playerSelector);
        othersMenu.appendChild(nameDisplay);
        othersMenu.appendChild(playerCommandSelector);
        othersMenu.appendChild(commandExecute);

        othersMain();

        othersMenu.style.top = "-3px";
        subMenuOpen = true;
    } else {
        closeAllSubMenus();
        subMenuOpen = false;
    }
}

function openItems() {
    // What makes the itemImage element look nice
    let itemImageHolder = document.createElement('section');
    itemImageHolder.classList.add('player-pictureframe');
    itemImageHolder.width = 100;
    let itemImage = document.createElement('img');
    itemImage.src = 'http://pixelartmaker.com/art/0ab0f0cadd7cf2d.png';
    itemImage.width = 120;
    itemImage.height = 120;
    itemImage.style.position = 'absolute';
    itemImage.style.top = '10px';
    itemImage.style.left = '40px';

    // Displaying type
    let typeDisplay = document.createElement('h2');
    typeDisplay.classList.add('others-information');
    typeDisplay.style = 'left: 230px; top: 30px; width: 240px; padding: 20px; text-align: center; font-size: 10px; visibility: hidden; border: 5px solid black; background-color: rgb(30, 30 ,30); ';



    // Allows user to select item to equip
    let itemSelector = document.createElement('select');
    itemSelector.classList.add('player-picker');

    let itemEquip = document.createElement('button');
    itemEquip.classList.add('execute-button');
    itemEquip.innerHTML = 'Equip';
    itemEquip.style = 'left: 210px; top: 110px; padding 4px; width: 270px; visibility: hidden';


    // Initial command option.
    let itemInfo = document.createElement('option');
    itemInfo.innerHTML = '~Select Item~';
    itemInfo.value = 0;
    itemSelector.appendChild(itemInfo);

    // Getting commands from command list
    for (let i in items) {
        let option = document.createElement('option');
        option.innerHTML = items[i].name;
        option.style.color = items[i].risk;
        option.value = i + 1;
        itemSelector.appendChild(option);
    }

    previousSelected = "";

    function itemsMain() {
        requestAnimationFrame(itemsMain);

        if (itemImage.src !== 'http://pixelartmaker.com/art/0ab0f0cadd7cf2d.png') {
            itemEquip.style.visibility = 'visible';
            typeDisplay.style.visibility = 'visible';
        }

        // Setting risk color in selector
        itemSelector.options[0].style.color = 'white';
        if (itemSelector.selectedOptions[0].label !== '~Select Item~') {
            for (let i in items) {
                if (items[i].name == itemSelector.selectedOptions[0].label) {
                    itemSelector.style.color = items[i].risk;
                    break;
                }
            }
        } else {
            itemSelector.style.color = 'white';
        }

        for (i in items) {
            if (items[i].name == itemSelector.selectedOptions[0].label) {
                itemImage.src = items[i].icon;
                typeDisplay.innerHTML = items[i].type;

                itemEquip.onclick = () => {
                    ig.game.equip.item(items[i].id);
                }

                break;
            }
        }


    }

    if (!subMenuOpen) {
        itemsMenu.style.visibility = "visible";
        itemsMenu.style.height = "160px";
        itemsMenu.style.width = "500px";
        itemsMenu.appendChild(itemImageHolder);
        itemImageHolder.appendChild(itemImage);
        itemsMenu.appendChild(itemSelector);
        itemsMenu.appendChild(itemEquip);
        itemsMenu.appendChild(typeDisplay);

        itemsMain();

        itemsMenu.style.top = "-3px";
        subMenuOpen = true;
    } else {

        closeAllSubMenus();
        subMenuOpen = false;
    }
}

function openTweaks() {
    // What makes the tweakImage element look nice
    let tweakImageHolder = document.createElement('section');
    tweakImageHolder.classList.add('player-pictureframe');
    tweakImageHolder.width = 100;
    let tweakImage = document.createElement('img');
    tweakImage.src = 'http://pixelartmaker.com/art/0ab0f0cadd7cf2d.png';
    tweakImage.width = 120;
    tweakImage.height = 120;
    tweakImage.style.position = 'absolute';
    tweakImage.style.top = '10px';
    tweakImage.style.left = '40px';

    // Displaying script info
    let infoDisplay = document.createElement('textarea');
    infoDisplay.classList.add('tweak-information');
    infoDisplay.setAttribute('readonly', true);
    infoDisplay.rows = 6;
    infoDisplay.cols = 24;



    // Allows user to select script to execute
    let tweakSelector = document.createElement('select');
    tweakSelector.classList.add('player-picker');

    // Toggle Box
    let label = document.createElement('label');
    let tweakToggle = document.createElement('input');
    let slideBar = document.createElement('span');
    label.classList.add('toggle');
    tweakToggle.type = 'checkbox';
    slideBar.classList.add('slider');
    label.appendChild(tweakToggle);
    label.appendChild(slideBar);

    // Initial command option.
    let tweakInfo = document.createElement('option');
    tweakInfo.innerHTML = '~Select Tweak~';
    tweakInfo.value = 0;
    tweakSelector.appendChild(tweakInfo);

    // Getting commands from command list
    for (let i in tweaks) {
        let option = document.createElement('option');
        option.innerHTML = tweaks[i].name;
        option.style.color = tweaks[i].risk;
        option.value = i + 1;
        tweakSelector.appendChild(option);
    }

    let previousSelected = "";
    let previousToggle = null;

    function tweaksMain() {
        requestAnimationFrame(tweaksMain);

        if (tweakImage.src !== 'http://pixelartmaker.com/art/0ab0f0cadd7cf2d.png') {
            label.style.visibility = 'visible';
            infoDisplay.style.visibility = 'visible';
        }

        // Setting risk color in selector
        tweakSelector.options[0].style.color = 'white';
        if (tweakSelector.selectedOptions[0].label !== '~Select Tweak~') {
            for (let i in tweaks) {
                if (tweaks[i].name == tweakSelector.selectedOptions[0].label) {
                    tweakSelector.style.color = tweaks[i].risk;
                    break;
                }
            }
        } else {
            tweakSelector.style.color = 'white';
        }

        for (i in tweaks) {
            if (tweaks[i].name == tweakSelector.selectedOptions[0].label) {
                tweakImage.src = tweaks[i].icon;
                infoDisplay.innerHTML = tweaks[i].information;

                if (previousSelected !== tweakSelector.selectedOptions[0].label) tweakToggle.checked = tweaks[i].enabled;

                tweaks[i].enabled = tweakToggle.checked;

                if (previousSelected == tweakSelector.selectedOptions[0].label && previousToggle !== tweakToggle.checked) {
                    if (tweakToggle.checked) {
                        tweaks[i].enable();

                    } else {
                        tweaks[i].disable();
                    }
                }

                break;
            }
        }

        previousToggle = tweakToggle.checked;
        previousSelected = tweakSelector.selectedOptions[0].label;

    }

    if (!subMenuOpen) {
        tweaksMenu.style.visibility = "visible";
        tweaksMenu.style.height = "160px";
        tweaksMenu.style.width = "510px";
        tweaksMenu.appendChild(tweakImageHolder);
        tweakImageHolder.appendChild(tweakImage);
        tweaksMenu.appendChild(tweakSelector);
        tweaksMenu.appendChild(infoDisplay);
        tweaksMenu.appendChild(label);

        tweaksMain();

        tweaksMenu.style.top = "-5px";
        subMenuOpen = true;
    } else {

        closeAllSubMenus();
        subMenuOpen = false;
    }
}


function openAbout() {
    let aboutHeader = document.createElement('h2');
    let list = document.createElement('ul');
    let topics = ['<p>All the scripts you know and love all wrapped in a sexy GUI.</p>', '<p>Click and icon to open/close that menu, menus can also be closed with <span style="color: blue">Escape.</span></p>', '<p>Source code and documentation can be found <a href="https://github.com/ZoltarML/Quasar/">here.</a></p>', '<p>Created by Zoltar.</p>'];

    for (let i = 0; i < topics.length; i++) {
        let topic = document.createElement('li');
        topic.innerHTML = topics[i];
        list.appendChild(topic);
    }

    aboutHeader.innerHTML = '<a href="#" style="color: white">Quasar:</a>';
    aboutHeader.style.letterSpacing = "8px";
    aboutHeader.style.textAlign = 'left';
    aboutHeader.style.paddingLeft = '30px';



    if (!subMenuOpen) {
        aboutMenu.appendChild(aboutHeader);
        aboutMenu.appendChild(list);
        aboutMenu.style.visibility = "visible";
        aboutMenu.style.top = "-3px";
        subMenuOpen = true;
    } else {

        closeAllSubMenus();
        subMenuOpen = false;
    }
}

function spyOn(player) {
    globalPlayer = player;

    ig.game.camera.update = altcam;

    window.addEventListener('keydown', returnCamera);

    function returnCamera() {

        ig.game.camera.update = originalCamera;
        window.removeEventListener('keydown', returnCamera);

    }


}

function block(player) {
    let playerChat = Deobfuscator.object(ig.game.player, 'player', true);
    player[playerChat].addItem = () => { };
}

function clickTeleport(enabled) {
    if (enabled) {
        window.addEventListener('click', clickTeleport);
        if (ig.input.state("ctrl")) {
            var dx = ig.game.screen.x;
            var h = ig.game.screen.y;
            ig.game.screen.x = dx;
            ig.game.screen.y = h;
            var x = ig.input.mouse.x;
            var y = ig.input.mouse.y;
            ig.game.player.pos.x = x + dx;
            ig.game.player.pos.y = y + h;
            dx = x;
            h = y;
        }
    } else {
        window.removeEventListener('click', clickTeleport)
    }
}

function playerDrag() {
    if (ig.input.state("rightclick")) {
        ig.game.gravity = 0;
        var dx = ig.game.screen.x;
        var h = ig.game.screen.y;
        ig.game.screen.x = dx;
        ig.game.screen.y = h;
        var x = ig.input.mouse.x;
        var y = ig.input.mouse.y;
        ig.game.player.pos.x = x + dx;
        ig.game.player.pos.y = y + h;
        dx = x;
        h = y;
    } else {
        ig.game.gravity = 800;
    }
}

function hide(isOn) {
    if (isOn) {
        ig.game.player[id] = null;
        deathLoop = setInterval(() => {
            ig.game.websocket.wssend(ig.game.websocket.ws, 'ud', { dt: 'fc' });
        }, 250);

    } else {
        clearInterval(deathLoop);
        ig.game.player[id] = myID;
    }
}

// For ghostWalk
function back() {
    requestAnimationFrame(back);
    ig.system.context.fillStyle = "black";
    ig.system.context.globalAlpha = 0.4;
    ig.system.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
}
originalBack = back;

function ghostWalk(enabled) {
    if (enabled) {
        //keeps state where player activated
        eval(`ig.game.player.${movementVar} = function() {requestAnimationFrame(ig.game.player.${movementVar});` + ig.game.player[movementVar].toString().split('function(){')[1].split("};").join(`};for(i = 0; i < ${ig.game.player[movementVar].toString().split('b=')[1].split(',')[0]}; i++) {if(i !== 0 && i !== ${ig.game.player[movementVar].toString().split('b=')[1].split(',')[0]} - 1) {${ig.game.player[movementVar].toString().split('b=')[1].split(',')[0].split('.length')[0]}.splice(i, ${ig.game.player[movementVar].toString().split('b=')[1].split(',')[0]} - 2);}}`).split('(d+1)/100/7.5').join('0.6').split('this').join('ig.game.player'));

        eval("data = {" + ig.game.player[movementVar].toString().split('a={')[1].split('}')[0] + "}")
        ig.game.player.frameStack.push(data);

        ig.game.player[movementVar]();
        client.update = () => { };
        back = originalBack;
        back();

    } else {
        ig.game.player.draw = ogD;
        client.update = rgUpdate;
        //reseting movement pushing function
        eval(`ig.game.player.${movementVar} = function(){` + ig.game.player.odM.toString().split('function(){')[1].split('this').join('ig.game.player'));
        ig.game.player[frameStackVar] = [];
        back = () => { };

    }
}

function randomizeName(enabled) {
    if(enabled) {
        randomNameInterval = setInterval(()=> {
            ig.game.player.changeName(Math.random().toString(36).slice(2));
        }, 2000)
        

    } else {
        clearInterval(randomNameInterval);
    }
}

// Escape to close menus
addEventListener('keydown', () => {
    if (event.key == 'Escape' && subMenuOpen) {
        closeAllSubMenus();
        subMenuOpen = false;
    }
})
