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
	'Игонина Галина Викторовна',
	'Лисицин Даниил Валерьевич',
	'Филосов Аркадий Константинович',
	'Хабаров Валерий Иванович',
	'Аврунёв Олег Евгеньевич',
	'Кобылянский Валерий Григорьевич',
	'Чубич Владимир Михайлович',
];

let course = [
	'Иностранный язык',
	'Объектно-ориентированные технологии разработки ПО',
	'Философия',
	'Основы теории машинного обучения',
	'Современные технологии баз данных',
	'Методы активной идентификации динамических систем',
	'Модели временных рядов',
];

let sched = {
	'1': [
		[2, 0, 0, 'ч'],
		[3, 2, 1, 'л'],
	],
	'3': [
		[4, 4, 4, ''],
		[5, 4, 4, 'нл'],
	],
};

/******** [/ACTUAL DATA] ********/

function show(data) {
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

			let time = document.createElement('span');
			let [from, to] = times[datum[0]];
			time.classList.add('time');
			time.innerHTML = `${from} <span class='dash'>-</span> ${to}`;

			let c = document.createElement('span');
			c.classList.add('course');
			c.dataset.num = datum[2];
			c.textContent = course[datum[2]];

			let p = document.createElement('span');
			p.classList.add('proff');
			p.dataset.num = datum[1];
			p.textContent = proff[datum[1]];

			li.appendChild(time);
			li.appendChild(document.createTextNode(': '))
			li.appendChild(c);
			li.appendChild(document.createTextNode(' ('))
			li.appendChild(p);
			li.appendChild(document.createTextNode(')'))
			ul.appendChild(li);
		}
		div.appendChild(h);
		div.appendChild(ul);
		m.appendChild(div);
	}
}

function init() {
	show(sched);
}
