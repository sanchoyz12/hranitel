const storyNodes = {
    start: {
        bg: 'url(bg_room.png) center/cover no-repeat',
        sprite: '',
        speaker: 'Такаши',
        text: 'Год 2042. С тех пор как вирус "Y-Хромосома" стёр всех мужчин с лица Земли, я не выходил из своего подвала. Здесь безопасно. Здесь есть аниме, рамен и моя неоновая "ласточка" в гараже.',
        choices: [
            { text: 'Досмотреть серию Меха-Гандам', next: 'watch_anime' },
            { text: 'Пойти в гараж к Nissan Skyline', next: 'garage' }
        ]
    },
    watch_anime: {
        bg: 'url(bg_room.png) center/cover no-repeat',
        speaker: 'Такаши',
        text: 'Только я добрался до клиффхэнгера на 51-й серии, как дверь в подвал с грохотом слетела с петель!',
        choices: [
            { text: 'Спрятаться под стол!', next: 'raiders' }
        ]
    },
    garage: {
        bg: 'url(bg_garage.png) center/cover no-repeat',
        speaker: 'Такаши',
        text: 'Я любовно погладил капот своего Nissan Skyline GT-R. Огромная наклейка с вайфу блестела в свете неона. Внезапно наверху прогремел взрыв...',
        choices: [
            { text: 'Спрятаться в тачке!', next: 'raiders_garage' }
        ]
    },
    raiders: {
        bg: 'url(bg_room.png) center/cover no-repeat',
        sprite: 'sprite_raider.png',
        speaker: 'Рейдерша Нео-Амазонка',
        text: 'Эй, сестры, зацените! Тут чья-то берлога, полная доширака! Стоп... ЭТО КАКОЙ-ТО МУЖИК?! Они же вымерли!',
        choices: [
            { text: 'БЕЖАТЬ В ГАРАЖ!', next: 'run_to_garage' },
            { text: 'Попытаться заговорить', next: 'talk_to_raiders' }
        ]
    },
    talk_to_raiders: {
        bg: 'url(bg_room.png) center/cover no-repeat',
        sprite: 'sprite_raider.png',
        speaker: 'Такаши',
        text: 'К-конничива, прекрасные девы? Не составите ли компанию в просмотре 2D шедевров?',
        choices: [
            { text: 'Получить в лицо и бежать', next: 'run_to_garage' }
        ]
    },
    raiders_garage: {
        bg: 'url(bg_garage.png) center/cover no-repeat',
        sprite: 'sprite_raider.png',
        speaker: 'Рейдерша',
        text: 'Смотрите, подвал ведёт в гараж! Хватай его, за последнего самца дадут огромную награду в Цитадели Матриархов!',
        choices: [
            { text: 'Ударить по газам!', next: 'start_racing' }
        ]
    },
    run_to_garage: {
        bg: 'url(bg_garage.png) center/cover no-repeat',
        sprite: '',
        speaker: 'Такаши',
        text: 'Я запрыгнул в свою ласточку, повернул ключ зажигания, врубил Eurobeat на полную катушку и снёс ворота, вырвавшись на постапокалиптические пустоши!',
        choices: [
            { text: 'MUTEKI NO RACING!', next: 'start_racing' }
        ]
    },
    after_race: {
        bg: 'url(bg_wasteland.png) center/cover no-repeat',
        sprite: 'sprite_raider.png',
        speaker: 'Такаши',
        text: 'Машина заглохла. Радиатор пробит. Они догнали меня... Придётся использовать Отаку-навыки в реальном бою!',
        choices: [
            { text: 'К БОЮ!', next: 'start_combat' }
        ]
    },
    chapter2_start: {
        bg: 'url(bg_neotokyo.png) center/cover no-repeat',
        sprite: '',
        speaker: 'Такаши',
        text: 'Глава 2: Нео-Токио.<br>Рейдерши отступили, но Skyline безнадёжно сломан. Я дотолкал его до руин Нео-Токио, поросших неоном и кибер-лозами. Нужен механик.',
        choices: [
            { text: 'Искать детали в руинах', next: 'explore_ruins' },
            { text: 'Зайти в подозрительный гараж с голограммой', next: 'find_workshop' }
        ]
    },
    explore_ruins: {
        bg: 'url(bg_neotokyo.png) center/cover no-repeat',
        sprite: '',
        speaker: 'Такаши',
        text: 'Я нашел кучу ржавого хлама, но ничего для антигравитационного движка... К тому же, здесь бродят отряды Матриархата. Лучше проверить тот гараж.',
        choices: [
            { text: 'Идти в гараж', next: 'find_workshop' }
        ]
    },
    find_workshop: {
        bg: 'url(bg_workshop.png) center/cover no-repeat',
        sprite: 'sprite_tsundere.png',
        speaker: 'Девушка-механик',
        text: 'Эй, ты кто такой?! И что это за архаичная тарантайка? ...Погоди! Ты... МУЖЧИНА?!',
        choices: [
            { text: 'Я Хранитель Семени! И мне нужен ремонт', next: 'meet_tsundere' },
            { text: 'Сделать Jojo-позу', next: 'meet_tsundere_jojo' }
        ]
    },
    meet_tsundere: {
        bg: 'url(bg_workshop.png) center/cover no-repeat',
        sprite: 'sprite_tsundere.png',
        speaker: 'Мика (Цундере-механик)',
        text: '(Краснея) Хранитель? Да ты просто грязный извращенец! И зачем я только на тебя смотрю... Но эта машина... Она прекрасна! Я починю её, но только ради чертежей JDM-тьюнинга, понял?!',
        choices: [
            { text: 'Согласиться на сделку', next: 'chapter2_repaired' }
        ]
    },
    meet_tsundere_jojo: {
        bg: 'url(bg_workshop.png) center/cover no-repeat',
        sprite: 'sprite_tsundere.png',
        speaker: 'Мика (Цундере-механик)',
        text: 'Что ты выгибаешься как придурок?! Идиот! ...Но у тебя отличная мускулатура. ТЬФУ, о чем я думаю! Ладно, я починю тачку, но только из профессионального интереса!',
        choices: [
            { text: 'Yare yare daze...', next: 'chapter2_repaired' }
        ]
    },
    chapter2_repaired: {
        bg: 'url(bg_workshop.png) center/cover no-repeat',
        sprite: 'sprite_tsundere.png',
        speaker: 'Мика',
        text: 'Готово! Антигравитационный привод снова в строю. Но плохие новости: пока мы возились, мой сканер засёк сигнал... За тобой послали саму Верховную Матриарха! Она хочет твои гены для своего ИИ-клонатора!',
        choices: [
            { text: 'Я не сдамся! Вперёд, в Цитадель!', next: 'chapter3_citadel' },
            { text: 'Может, мы спрячемся тут? Вместе?', next: 'chapter2_romance' }
        ]
    },
    chapter2_romance: {
        bg: 'url(bg_workshop.png) center/cover no-repeat',
        sprite: 'sprite_tsundere.png',
        speaker: 'Мика',
        text: '(Густо краснеет) Б-бака! Думаешь, я буду прятать тут такого извращенца?! ...Хотя, у меня есть пара MRE со вкусом карри. НЕТ! Мы едем уничтожать ядро Цитадели. Хватай руль!',
        choices: [
            { text: 'Полный вперёд!', next: 'chapter3_citadel' }
        ]
    },
    chapter3_citadel: {
        bg: 'url(bg_citadel.png) center/cover no-repeat',
        sprite: '',
        speaker: 'Такаши',
        text: 'Глава 3: Утопия Матриархов.<br>Мы ворвались в белоснежный зал Цитадели. Голограммы идеальных женщин смотрели на нас с презрением. А на троне восседала она... Императрица Ненависти.',
        choices: [
            { text: 'Сразиться с Боссом!', next: 'meet_matriarch' }
        ]
    },
    meet_matriarch: {
        bg: 'url(bg_citadel.png) center/cover no-repeat',
        sprite: 'sprite_matriarch.png',
        speaker: 'Верховная Матриарх',
        text: 'Последний носитель Y-хромосомы. Ты жалок. Ты слаб. Ты — воплощение всего, от чего мы очистили этот мир. Но твой генетический код позволит нам создать идеальных андроидов. Сдайся, и твои дни закончатся в крио-капсуле с VR-шлемом.',
        choices: [
            { text: 'VR-шлем... Звучит неплохо (Плохая концовка)', next: 'bad_ending' },
            { text: 'Никогда! Семена свободы прорастут! (Финальный Бой)', next: 'start_final_combat' }
        ]
    },
    bad_ending: {
        bg: 'url(bg_citadel.png) center/cover no-repeat',
        sprite: 'sprite_matriarch.png',
        speaker: 'Верховная Матриарх',
        text: 'Разумное решение, мужчина. Ты погрузишься в вечный сон из аниме-иллюзий, пока мы выкачиваем твое семя.<br><br>[ ПЛОХАЯ КОНЦОВКА: Вечный Отаку-Сон ]',
        choices: [
            { text: 'Начать заново', next: 'return_to_menu' }
        ]
    },
    final_win: {
        bg: 'url(bg_citadel.png) center/cover no-repeat',
        sprite: 'sprite_tsundere.png',
        speaker: 'Мика',
        text: 'Ты сделал это! Центральный ИИ уничтожен. Матриархат пал. Знаешь... ты не такой уж и жалкий. Может быть, в новом мире для нас найдется место...',
        choices: [
            { text: 'Титры', next: 'return_to_menu' }
        ]
    }
};
