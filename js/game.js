document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        menu: document.getElementById('main-menu'),
        vn: document.getElementById('vn-screen'),
        racing: document.getElementById('racing-screen'),
        combat: document.getElementById('combat-screen')
    };

    // AUDIO SYSTEM
    const bgmMain = new Audio('123456.mp3');
    bgmMain.loop = true;
    bgmMain.volume = 0.4;

    const bgmCombat = new Audio('26373.mp3');
    bgmCombat.loop = true;
    bgmCombat.volume = 0.4;

    let isMusicPlaying = false;

    // RESPONSIVE SCALING SYSTEM
    function resizeGame() {
        const container = document.getElementById('game-container');
        const targetRatio = 1280 / 720;
        const windowRatio = window.innerWidth / window.innerHeight;
        let scale = 1;

        if (windowRatio < targetRatio) {
            scale = window.innerWidth / 1280;
        } else {
            scale = window.innerHeight / 720;
        }

        container.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', resizeGame);
    resizeGame();

    function playMusic(track) {
        if (!isMusicPlaying) return;
        bgmMain.pause();
        bgmCombat.pause();
        if (track === 'main') {
            bgmMain.play().catch(e => console.log("Audio play prevented:", e));
        } else if (track === 'combat') {
            bgmCombat.play().catch(e => console.log("Audio play prevented:", e));
        }
    }

    document.getElementById('btn-music').addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        document.getElementById('btn-music').innerText = isMusicPlaying ? '🔊' : '🎵';
        if (isMusicPlaying) {
            if (screens.combat.classList.contains('active') || screens.racing.classList.contains('active')) {
                playMusic('combat');
            } else {
                playMusic('main');
            }
        } else {
            bgmMain.pause();
            bgmCombat.pause();
        }
    });

    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        if (screens[name]) {
            screens[name].classList.add('active');
        }

        // Show inventory button only outside of main menu
        if (name === 'menu') {
            document.getElementById('btn-inventory').style.display = 'none';
            document.getElementById('btn-music').style.display = 'none';
        } else {
            document.getElementById('btn-inventory').style.display = 'block';
            document.getElementById('btn-music').style.display = 'block';
        }

        // Hide modal when changing screens
        document.getElementById('inventory-modal').style.display = 'none';
    }

    // MAIN MENU
    document.getElementById('btn-start').addEventListener('click', () => {
        isMusicPlaying = true;
        document.getElementById('btn-music').innerText = '🔊';
        playMusic('main');
        startVN('start');
    });

    // VN SYSTEM
    const vnBg = document.getElementById('vn-background');
    const speakerName = document.getElementById('speaker-name');
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');

    let isTyping = false;
    let typingTimeout;

    function typeWriter(text, element, speed = 30, callback) {
        element.innerHTML = '';
        let i = 0;
        isTyping = true;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }
        type();
    }

    function startVN(nodeId) {
        showScreen('vn');
        loadStoryNode(nodeId);
    }

    function loadStoryNode(nodeId) {
        if (nodeId === 'return_to_menu') {
            bgmMain.pause();
            bgmMain.currentTime = 0;
            bgmCombat.pause();
            bgmCombat.currentTime = 0;
            isMusicPlaying = false;
            document.getElementById('btn-music').innerText = '🎵';
            showScreen('menu');
            return;
        }
        if (nodeId === 'start_racing') {
            startRacing();
            return;
        }
        if (nodeId === 'start_combat') {
            startCombat('raider');
            return;
        }
        if (nodeId === 'start_final_combat') {
            startCombat('matriarch');
            return;
        }

        const node = storyNodes[nodeId];

        vnBg.style.background = node.bg;
        speakerName.textContent = node.speaker;

        const spriteEl = document.getElementById('character-sprite');
        if (node.sprite) {
            spriteEl.style.backgroundImage = `url('${node.sprite}')`;
            spriteEl.style.opacity = '1';
        } else {
            spriteEl.style.backgroundImage = 'none';
            spriteEl.style.opacity = '0';
        }

        choicesContainer.innerHTML = '';

        clearTimeout(typingTimeout);
        typeWriter(node.text, dialogueText, 30, () => {
            if (node.choices) {
                node.choices.forEach(choice => {
                    const btn = document.createElement('button');
                    btn.className = 'choice-btn';
                    btn.textContent = choice.text;
                    btn.onclick = () => loadStoryNode(choice.next);
                    choicesContainer.appendChild(btn);
                });
            }
        });
    }

    // RACING SYSTEM
    const canvas = document.getElementById('racing-canvas');
    const ctx = canvas.getContext('2d');
    let racingObj = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function startRacing() {
        showScreen('racing');
        playMusic('combat');

        // Let's create a simple pseudo-3d out-run style view with rectangles
        let speed = 0;
        let pX = 0;
        let score = 0;
        let frameCount = 0;

        const keys = {};
        const onKeyDown = e => { keys[e.code] = true; };
        const onKeyUp = e => { keys[e.code] = false; };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        function drawRoad() {
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Horizon
            ctx.fillStyle = '#050a1f'; // dark sky
            ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

            // Grid ground
            for (let i = 1; i < 20; i++) {
                let y = (canvas.height / 2) + Math.pow(i + (score % 1), 2) * 2;
                if (y > canvas.height) break;
                ctx.fillStyle = (i % 2 === 0) ? '#ff2a6d' : '#05d9e8';
                ctx.fillRect(0, y, canvas.width, 2);
            }

            // Perspective lines
            ctx.strokeStyle = '#9000ff';
            ctx.lineWidth = 2;
            for (let i = -5; i <= 5; i++) {
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2, canvas.height / 2);
                ctx.lineTo(canvas.width / 2 + i * 200 - pX * speed * 2, canvas.height);
                ctx.stroke();
            }
        }

        function drawCar() {
            const cx = canvas.width / 2 + pX;
            const cy = canvas.height - 150;
            // Car shadow
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(cx - 50, cy + 80, 100, 20);
            // Car body
            ctx.fillStyle = '#fff';
            ctx.fillRect(cx - 40, cy, 80, 80);
            ctx.fillStyle = '#ff2a6d';
            ctx.fillRect(cx - 45, cy + 40, 90, 40);
            ctx.fillStyle = '#05d9e8';
            ctx.fillRect(cx - 30, cy + 10, 60, 30);

            // Taillights
            ctx.fillStyle = '#f00';
            ctx.fillRect(cx - 40, cy + 50, 20, 10);
            ctx.fillRect(cx + 20, cy + 50, 20, 10);
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#f00';
            ctx.fillRect(cx - 40, cy + 50, 20, 10);
            ctx.fillRect(cx + 20, cy + 50, 20, 10);
            ctx.shadowBlur = 0;
        }

        function loop() {
            frameCount++;
            if (keys['ArrowUp'] || keys['KeyW']) speed += 0.05;
            else speed -= 0.1;

            if (speed > 5) speed = 5;
            if (speed < 0) speed = 0;

            if (keys['ArrowLeft'] || keys['KeyA']) pX -= 10;
            if (keys['ArrowRight'] || keys['KeyD']) pX += 10;

            pX = Math.max(-canvas.width / 2 + 50, Math.min(canvas.width / 2 - 50, pX));

            score += speed;
            document.getElementById('speed-val').innerText = Math.floor(speed * 40);

            drawRoad();
            drawCar();

            if (frameCount > 600) { // 10 seconds at 60fps
                window.removeEventListener('keydown', onKeyDown);
                window.removeEventListener('keyup', onKeyUp);
                playMusic('main');
                startVN('after_race');
                return;
            }

            racingObj = requestAnimationFrame(loop);
        }

        loop();
    }

    let currentBoss = '';

    // COMBAT SYSTEM
    function startCombat(bossType = 'raider') {
        showScreen('combat');
        playMusic('combat');
        currentBoss = bossType;

        const enemyImg = document.getElementById('enemy-img');
        const enemyName = document.querySelector('.enemy-stats .name');

        if (bossType === 'matriarch') {
            enemyImg.src = 'sprite_matriarch.png';
            enemyName.textContent = 'Верховная Матриарх';
            logInfo("Финальная Битва начинается!");
        } else {
            enemyImg.src = 'sprite_raider.png';
            enemyName.textContent = 'Ненавидящая Рейдерша';
            logInfo("Битва начинается!");
        }

        document.querySelector('.enemy-hp-bar .fill').style.width = '100%';
        document.querySelector('.hp-bar .fill').style.width = '100%';
    }

    function logInfo(text) {
        const log = document.getElementById('combat-log');
        const p = document.createElement('p');
        p.textContent = '> ' + text;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    function triggerAnim(selector, animClass, duration = 500) {
        const el = document.querySelector(selector);
        if (!el) return;
        el.classList.add(animClass);
        setTimeout(() => el.classList.remove(animClass), duration);
    }

    document.getElementById('btn-attack').onclick = () => {
        if (currentBoss === 'matriarch') {
            logInfo("Отаку-панч отскакивает от силового поля Матриарха! -0 HP.");
        } else {
            logInfo("Вы применили Отаку-панч! -1 HP Рейдерше.");
        }

        triggerAnim('.player-sprite', 'anim-player-attack', 500);

        setTimeout(() => {
            triggerAnim('.enemy-sprite', 'anim-damage', 300);
        }, 250);

        setTimeout(() => {
            if (currentBoss === 'matriarch') {
                logInfo("Матриарх стреляет лазером из скипетра! -50 HP.");
            } else {
                logInfo("Рейдерша бьёт вас монтировкой! -20 HP.");
            }
            triggerAnim('.enemy-sprite', 'anim-enemy-attack', 500);
            setTimeout(() => {
                triggerAnim('.player-sprite', 'anim-damage', 300);
            }, 250);
            document.querySelector('.hp-bar .fill').style.width = currentBoss === 'matriarch' ? '30%' : '80%';
        }, 1500);
    };

    document.getElementById('btn-skill').onclick = () => {
        logInfo("Активирован Sharingan-взгляд! Вы уклоняетесь от следующей атаки.");
        document.querySelector('.sp-bar .fill').style.width = '60%';
    };

    document.getElementById('btn-talk').onclick = () => {
        if (currentBoss === 'matriarch') {
            logInfo("Вы пытаетесь вразумить Матриарха фактами из аниме-истории. Но она не слушает!");
            triggerAnim('.player-sprite', 'anim-player-attack', 500);

            setTimeout(() => {
                logInfo("Сила вашей чистой Отаку-воли разрушает её защитное поле! Босс побеждён силой сюжета!");
                setTimeout(() => {
                    playMusic('main');
                    startVN('final_win');
                }, 3000);
            }, 1000);
        } else {
            logInfo("Вы заговорили о красоте 2D мира. Рейдерша покраснела! Tsundere-индекс растёт.");
            document.querySelector('.enemy-hp-bar .fill').style.width = '50%';

            // Let player move forward slightly when talking
            triggerAnim('.player-sprite', 'anim-player-attack', 500);

            setTimeout(() => {
                logInfo("Рейдерша: 'Б-Бака! Не то чтобы ты мне нравился...'. Враг отступает. ПОБЕДА!");
                setTimeout(() => {
                    playMusic('main');
                    startVN('chapter2_start');
                }, 2000);
            }, 2000);
        }
    };

    document.getElementById('btn-item').onclick = () => {
        if (inventory.includes('MNT DEW')) {
            logInfo("Вы выпили банку MNT DEW. Восстановлено 10 HP!");
            document.querySelector('.hp-bar .fill').style.width = '90%';
            inventory = inventory.filter(i => i !== 'MNT DEW'); // Consume item
        } else {
            logInfo("У вас нет энергетика!");
        }
    };

    // INVENTORY SYSTEM
    let inventory = ['Рамен', 'MNT DEW', 'Ключи от Skyline'];
    const btnInventory = document.getElementById('btn-inventory');
    const modalInventory = document.getElementById('inventory-modal');
    const listInventory = document.getElementById('inventory-list');

    function toggleInventory() {
        if (modalInventory.style.display === 'none' || modalInventory.style.display === '') {
            modalInventory.style.display = 'block';
            listInventory.innerHTML = '';
            if (inventory.length === 0) {
                listInventory.innerHTML = '<span style="color:var(--neon-cyan)">Инвентарь пуст.</span>';
            } else {
                inventory.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'inventory-item';
                    div.textContent = item;
                    listInventory.appendChild(div);
                });
            }
        } else {
            modalInventory.style.display = 'none';
        }
    }

    btnInventory.addEventListener('click', toggleInventory);
    document.getElementById('btn-close-inventory').addEventListener('click', () => {
        modalInventory.style.display = 'none';
    });
});
