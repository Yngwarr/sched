let times = [
    ['08:30', '10:00'],
    ['10:15', '11:45'],
    ['12:00', '13:30'],
    ['14:00', '15:30'],
    ['15:45', '17:15'],
    ['17:30', '19:00'],
    ['19:15', '20:45'],
];

let week = [
    'ПоНедельник',
    'ВТорник',
    'СРеда',
    'ЧеТверг',
    'ПяТница',
    'СуБбота',
];

function week_day(n, short = false) {
    if (n <= 0 || n >= 7) return '';
    let d = week[n-1];
    if (short) {
        return _.filter(d, ch => ch === ch.toUpperCase()).join('');
    }
    return `${d[0]}${_.rest(d).join('').toLowerCase()}`;
}

/******** [ACTUAL DATA] ********/

let proff = [
    /* 0 */ 'Фаддеенков Андрей Владимирович',
    /* 1 */ 'Хабаров Валерий Иванович',
    /* 2 */ 'Кобылянский Валерий Григорьевич',
    /* 3 */ 'Карманов Виталий Сергеевич',
    /* 4 */ 'Авдеенко Татьяна Владимировна',
    /* 5 */ 'Зайцев Михаил Георгиевич',
    /* 6 */ '',
    /* 7 */ '',
	/* 8 */ '',
];

let course = [
    /* 0 */ ['Методы искусственного интелекта', 'ИИ'],
    /* 1 */ ['Проектирование систем реального времени', 'СРВ'],
    /* 2 */ ['Информационные технологии на современном предприятии', '1С'],
    /* 3 */ ['Программные средства защиты информации', 'ЗИ'],
    /* 4 */ ['Математические методы в экономике', 'ММЭ'],
    /* 5 */ ['Сетевые информационные технологии', 'СИТ'],
    /* 6 */ ['Метрология, качество и тестирование программного обеспечения', 'ТПО'],
];

let sched = {
    '1': [
        [1, 1, 0, 'нл', '1-327'],
        [2, 0, 0, 'н', '1-327'],
        [3, 0, 0, 'н', '1-212'],
    ],
    '2': [
        [0, 2, 1, 'н', '1-307'],
        [1, 2, 1, 'н', '1-307'],
    ],
    '3': [
        [0, 3, 2, '', '1-310'],
        [1, 3, 2, '', '1-310'],
    ],
    '4': [
        [2, 4, 3, 'ч', '1-327'],
        [3, 4, 3, 'ч', '1-310'],
        [4, 4, 3, 'ч', '1-310'],
    ],
    '5': [
        [0, 2, 5, 'ч', '1-307'],
        [0, 5, 6, 'н', '1-307'],
        [1, 2, 5, 'ч', '1-307'],
        [1, 5, 6, 'н', '1-307'],
        [1, 2, 5, 'ч', '1-426'],
    ],
};

function short_p(name) {
    let names = name.split(' ');
    for (let i = 1; i < names.length; ++i) {
        names[i] = `${names[i][0]}.`;
    }
    return names.join(' ');
}

/******** [/ACTUAL DATA] ********/

function show_sched(data) {
    let m = document.querySelector('main');
    for (let d in data) {
        d = parseInt(d);
        let div = document.createElement('div');
        let h = document.createElement('h1');
        h.textContent = week_day(d);
        if (d === (new Date()).getDay()) {
            h.classList.add('today');
        }
        let ul = document.createElement('ul');
        for (let i = 0; i < data[d].length; ++i) {
            let datum = data[d][i];
            let li = document.createElement('li');
            if (datum[3]) {
                if (datum[3].includes('ч')) li.classList.add('even');
                if (datum[3].includes('н')) li.classList.add('odd');
                if (datum[3].includes('л')) li.classList.add('lecture');
            }

            let time = document.createElement('span');
            let [from, to] = times[datum[0]];
            time.classList.add('time');
            time.innerHTML = `${from} <span class='dash'>&ndash;</span> ${to}`;

            let aud = document.createElement('span');
            aud.classList.add('aud');
            aud.textContent = datum[4];

            let c = document.createElement('span');
            c.classList.add('course', 'full');
            c.dataset.num = datum[2];
            c.textContent = course[datum[2]][0];
            let sc = document.createElement('span');
            sc.classList.add('course', 'short');
            sc.dataset.num = datum[2];
            sc.textContent = course[datum[2]][1];

            let p = document.createElement('span');
            p.classList.add('proff', 'full');
            p.dataset.num = datum[1];
            p.textContent = proff[datum[1]];
            let sp = document.createElement('span');
            sp.classList.add('proff', 'short');
            sp.dataset.num = datum[1];
            sp.textContent = short_p(proff[datum[1]]);

            li.appendChild(time);
            li.appendChild(document.createTextNode(': '))
            li.appendChild(aud);
            li.appendChild(document.createTextNode(' '))
            li.appendChild(c);
            li.appendChild(sc);
            li.appendChild(document.createTextNode(' ('))
            li.appendChild(p);
            li.appendChild(sp);
            li.appendChild(document.createTextNode(')'))
            ul.appendChild(li);
        }
        div.appendChild(h);
        div.appendChild(ul);
        m.appendChild(div);
    }
}

function hide_week(even) {
    if (even) {
        document.querySelectorAll('.even').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.odd').forEach(el => el.classList.add('hidden'));
    } else {
        document.querySelectorAll('.odd').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.even').forEach(el => el.classList.add('hidden'));
    }
}

function toggle_week(checked) {
    let even = week_num % 2 === 0;
    hide_week(even && !checked || !even && checked);
}

function shorten(what) {
    let lc = document.getElementById('full-course').checked;
    let lp = document.getElementById('full-proff').checked;
    if (!what || what.includes('c')) {
        document.querySelectorAll('.course.short').forEach(el => {
            if (lc) el.classList.add('hidden');
            else el.classList.remove('hidden');
        });
        document.querySelectorAll('.course.full').forEach(el => {
            if (lc) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    }
    if (!what || what.includes('p')) {
        document.querySelectorAll('.proff.short').forEach(el => {
            if (lp) el.classList.add('hidden');
            else el.classList.remove('hidden');
        });
        document.querySelectorAll('.proff.full').forEach(el => {
            if (lp) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    }
    localStorage.sh = `${!lc ? 'c' : ''}${!lp ? 'p' : ''}`;
}

function up_date() {
    document.getElementById('date').textContent = (new Date()).toLocaleDateString();
}

let week_num;

function init() {
    week_num = (new Date()).getWeek() - 35;
    document.getElementById('week-num').textContent = week_num.toString();
    up_date();
    show_sched(sched);
    hide_week(week_num % 2 === 0);
    // TODO read and store flags in localStorage
    if (!localStorage.sh) localStorage.sh = '';
    if (localStorage.sh.includes('c')) {
        document.getElementById('full-course').checked = false;
    }
    if (localStorage.sh.includes('p')) {
        document.getElementById('full-proff').checked = false;
    }
    shorten();
}
