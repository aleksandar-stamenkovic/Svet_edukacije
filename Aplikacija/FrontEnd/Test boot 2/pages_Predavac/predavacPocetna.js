function odjava() {
	sessionStorage.removeItem('id');
	window.location.href = '../page_Landing/landing.html';
}

function onloadBody() {
	let idsesije = sessionStorage.getItem('id');
	console.log(idsesije);
	if (idsesije == 0 || idsesije == null) {
		window.location.href = './zabranjen_pristup';
	}
	//sessionStorage.removeItem('id');

	fetch('https://localhost:44393/api/predavac/' + idsesije, {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			let nizPodataka = [
				data['id'],
				data['ime'],
				data['prezime'],
				data['username'],
				data['password'],
				data['email'],
				data['brtel'],
				data['ocenePlus'],
				data['oceneMinus'],
				data['opis'],
				data['adresa']
			];

			// Podaci na sidebar-u
			let text = document.querySelector('#sidebar-imeiprezime');
			text.innerHTML = nizPodataka[1] + ' ' + nizPodataka[2];
			text = document.querySelector('#sidebar-username');
			text.innerHTML = nizPodataka[3];
			text = document.querySelector('#sidebar-password');
			text.innerHTML = nizPodataka[5];
			document.querySelector('.sidebar-profileimage').src =
				'https://localhost:44393/api/imageupload/' + nizPodataka[3] + '.jpg';
		})
	);
	calendarTodaySet();
}

// Kalendar
document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: [ 'interaction', 'dayGrid' ],
		defaultDate: '2020-02-12',
		editable: false,
		eventLimit: true, // allow "more" link when too many events
		events: []
	});

	calendar.render();
	/*calendar.addEvent({title:'TEST',
                       start:'2020-02-15'});*/

	//Fetch za pribavljanje prihvacenih zahteva gde je idPredavaca u sessionStorage-u
	fetch('https://localhost:44393/api/zahtev/Kalendar/' + sessionStorage.getItem('id'), {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			data.forEach((element) => {
				let d = element['datum'];
				calendar.addEvent({
					title: element['usernameUcenika'] + '\n' + element['predmet'],
					start: d
				});
			});
		})
	);
});

function calendarTodaySet() {
	document.querySelector('.fc-today-button').click();
}
