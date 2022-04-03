function render(data) {
	var html =
		"<div class='comentBox'><div class='leftPanelImg'><img src='' /></div><div class='rightPanel'><span>" +
		data.name +
		"</span><div class='date'>" +
		data.date +
		'</div><p>' +
		data.body +
		"</p></div><div class='clear'</div></div>";

	$('#container').append(html);
}

$(document).ready(function() {
	var coment = [ { name: 'Marija', date: '10 Apr 2020', body: 'Nastavik matematike Nikola iz Nisa je odlican.' } ];

	for (var i = 0; i < coment.length; i++) {
		render(coment[i]);
	}
	$('#addComent').click(function() {
		var addObj = {
			name: $('#name').val(),
			date: $('#date').val(),
			body: $('#bodyText').val()
		};
		console.log(addObj);
		coment.push(addObj);
		render(addObj);
	});
});

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
	fetch('https://localhost:44393/api/zahtev/Kalendar/Ucenik/' + sessionStorage.getItem('id'), {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			data.forEach((element) => {
				let d = element['datum'];
				calendar.addEvent({
					title: element['usernamePredavaca'] + '\n' + element['predmet'],
					start: d
				});
			});
		})
	);
});

function calendarTodaySet() {
	document.querySelector('.fc-today-button').click();
}

function onloadBody() {
	let idsesije = sessionStorage.getItem('id');
	console.log(idsesije);
	if (idsesije == 0 || idsesije == null) {
		window.location.href = './zabranjen_pristup'; //DISABLED DURING DEVELOPMENT
	}

	fetch('https://localhost:44393/api/ucenik/' + idsesije, {
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
				data['brtel']
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
