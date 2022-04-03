function odjava() {
	sessionStorage.removeItem('id');
	window.location.href = '../page_Landing/landing.html';
}

function onloadBody() {
	let idsesije = sessionStorage.getItem('id');
	console.log(idsesije);
	if (idsesije == 0 || idsesije == null) {
		window.location.href = './zabranjen_pristup'; //DISABLED DURING DEVELOPMENT
	}
	getCurrDate();

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
	LoadZahtevi();
}

function generisiZahtevKolapser(idZahteva, textPoruke, username, imePosiljaoca, timestamp, validnost) {
	var karticaPredmeta = $(
		'<div class="card card-colapser indi-card' +
		idZahteva +
		'">' +
		'<label hidden class="status-labela">' +
		validnost +
		'</label>' +
		'<div class="card-header" id="heading' +
		idZahteva +
		'>' +
		'<h2 class="mb-0">' +
		'<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse' +
		idZahteva +
		'" aria-expanded="false" aria-controls="collapse' +
		idZahteva +
		'">' +
		' <strong class="zahtev-headline">od: ' +
		username +
		'</strong>' +
		'' + //ovde je naslov poruke verovatno ce bini neki dinamicki parametar
		'</button>' +
		'<div class="btn-group">' +
		'<label class="btn btn-secondary accept-btn"  onclick="acceptZahtev(this)">' +
		'<i class="fas fa-check"></i>' +
		'</label>' +
		'<label hidden class="idZahtevaThis">' +
		idZahteva +
		'</label>' +
		'<label class="btn btn-secondary decline-btn" active onclick="declineZahtev(this)">' +
		'<i class="fas fa-times"></i>' +
		'</label>' +
		'</div>' +
		'</h2>' +
		'<div>' +
		dateTimePickerELement() +
		'</div>' +
		'</div>' +
		'<div id="collapse' +
		idZahteva +
		'" class="collapse" aria-labelledby="heading' +
		idZahteva +
		'" data-parent="#accordionExample">' +
		'<div class="card-body">' +
		'<p class="colapser-body-text">' +
		/*'<strong class="chatlike-header">' +
		imePosiljaoca +
		' : ' +
		'</strong>' +*/
		textPoruke + //ovo je tekst isto ce biti dinamicki parametar
			'</p>' +
			'<footer class="blockquote-footer">from ' +
			imePosiljaoca +
			' <cite title="Source Title">' +
			timestamp +
			'</cite>' +
			'<label class="btn btn-secondary reply-btn btn-group" onclick="replyZahtev(this)">' +
			'<i class="fas fa-reply"></i>' +
			'</label>' +
			'</footer>' +
			'</div>' +
			'</div>' +
			'</div>'
	);
	$('#id-card-colapser').append(karticaPredmeta);

	document.querySelectorAll('.date-time-picker').forEach((el) => {
		el.style.display = 'none';
	});

	document.querySelectorAll('.confirm-acc-btn').forEach((el) => {
		el.style.display = 'none';
	});

	setValidColor(idZahteva);
}

function LoadZahtevi() {
	let idsesije = sessionStorage.getItem('id');
	fetch('https://localhost:44393/api/Zahtev/' + idsesije, {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			data.forEach((element) => {
				let nizPodataka = [
					element['id'],
					element['predavac'],
					element['ucenik'],
					element['tekst'],
					element['prihvacen'],
					element['vreme']
				];

				let ucenik = nizPodataka[2];
				let text = nizPodataka[3];
				let validan = nizPodataka[4];
				let vreme = nizPodataka[5];
				//console.log(ucenik['username'], ucenik['ime'] + ' ' + ucenik['prezime']);
				//console.log(vreme);
				generisiZahtevKolapser(
					nizPodataka[0],
					text,
					ucenik.ime + ' ' + ucenik.prezime,
					ucenik.username,
					vreme,
					validan
				);
			});
		})
	);
	/*for (let i = 0; i < 5; i++) {//ovo je fake data load za zahteve
		generisiZahtevKolapser(i + 1, textDinamik, 'mixerr', 'Mitar Miric', '20.03.2020 11:45');
	}*/
}

function editZahtev(idZahteva, prihvacenostZahteva, textZahteva) {
	//PUT api/zahtev/{id}/{tekst}/{prihvacen}
	fetch('https://localhost:44393/api/Zahtev/' + idZahteva + '/' + textZahteva + '/' + prihvacenostZahteva, {
		method: 'PUT'
	}).then((p) => {
		if (p.ok) {
			console.log('Uspesna izmena zahteva');
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
}

function editTextZahtev(idZahteva, textZahteva) {
	const text = textZahteva;
	fetch('https://localhost:44393/api/Zahtev/reply/' + idZahteva, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(text)
	}).then((p) => {
		if (p.ok) {
			console.log('Uspesna izmena zahteva');
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
}

function acceptZahtev(parentCaller) {
	let parent = parentCaller.parentNode;
	let datetimePicker = parent.parentNode.querySelector('.date-time-picker');
	let dugmeconfirm = parent.parentNode.querySelector('#confirm-acc-btn');
	let idZahteva = parent.querySelector('.idZahtevaThis').innerHTML;
	let parent2 = parent.parentNode.parentNode;
	let textZahteva = parent2.querySelector('.colapser-body-text').innerHTML;
	console.log(datetimePicker);
	console.log(idZahteva);
	datetimePicker.style.display = 'block';
	dugmeconfirm.style.display = 'block';
	//console.log(textZahteva);
	//editZahtev(idZahteva, true, textZahteva);
	$('.confirm-acc-btn').unbind().click(function() {
		console.log('simulacija slanja zahteva id:' + idZahteva);
		const datum = datetimePicker.value;
		fetch('https://localhost:44393/api/Zahtev/zakazi/' + idZahteva, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(datum)
		}).then((p) => {
			if (p.ok) {
				console.log('Uspesna izmena datuma zahteva za zakazivanje');
				forceSetValidColor(idZahteva, true);
				//$(".porukaSuccessful").removeAttr("hidden");
				$('.porukaSuccessful').fadeIn();
				setTimeout(() => {
					//$(".porukaSuccessful").attr('hidden', true);
					$('.porukaSuccessful').fadeOut();
				}, 2500);
			} else {
				console.log('greska prilikom izmene ili prilikom post fetcha');
				$('.porukaDanger').fadeIn();
				setTimeout(() => {
					$('.porukaDanger').fadeOut();
				}, 2500);
			}
		});
		console.log(datum);
		datetimePicker.style.display = 'none';
		dugmeconfirm.style.display = 'none';
	});
}

function declineZahtev(parentCaller) {
	let parent = parentCaller.parentNode;
	let idZahteva = parent.querySelector('.idZahtevaThis').innerHTML;
	let parent2 = parent.parentNode.parentNode;
	let textZahteva = parent2.querySelector('.colapser-body-text').innerHTML;
	console.log(idZahteva); //id zahteva u bazi
	console.log(textZahteva); //text zahteva prvobitni
	editZahtev(idZahteva, false, null);
	forceSetValidColor(idZahteva, false);
	$('.porukaDeclined').fadeIn();
	setTimeout(() => {
		$('.porukaDeclined').fadeOut();
	}, 2500);
}

function replyZahtev(parentCaller) {
	$('#replyZahtevModal').modal('toggle');
	$('#confirm-reply').unbind().click(function() {
		let parent = parentCaller.parentNode.parentNode.parentNode.parentNode;
		let idZahteva = parent.querySelector('.idZahtevaThis').innerHTML;
		let textZahteva = parent.querySelector('.colapser-body-text').innerHTML;
		console.log(idZahteva); //id zahteva u bazi
		console.log(textZahteva); //text zahteva prvobitni
		let textareaModal = document.querySelector('.textarea-reply-modal').value;
		console.log(textareaModal);
		console.log(textZahteva + '\n\n' + '' + textareaModal);

		let myUsername = document.querySelector('#sidebar-username').innerHTML;
		console.log(myUsername);

		let currTime = getCurrDate();
		let textForSend =
			'<small>' +
			currTime +
			'</small><strong class="chatlike-header">' +
			myUsername +
			':</strong>\n' +
			textareaModal +
			'<br>' +
			textZahteva;
		parent.querySelector('.colapser-body-text').innerHTML = textForSend;
		editTextZahtev(idZahteva, textForSend); //ovde bi trebalo da se salje html tag al za to treba post request
		$('#replyZahtevModal').modal('hide');
	});
}

function getCurrDate() {
	var currentdate = new Date();
	if (currentdate.getMinutes() < 10) var min = '0' + currentdate.getMinutes();
	else var min = currentdate.getMinutes();
	var datetime =
		currentdate.getDate() +
		'/' +
		(currentdate.getMonth() + 1) +
		'/' +
		currentdate.getFullYear() +
		' ' +
		currentdate.getHours() +
		':' +
		min +
		' ';

	console.log(datetime);
	return datetime;
}

function dateTimePickerELement() {
	let pickercode =
		'<div class="input-group mb-3">' +
		'<input type="datetime-local" class="form-control date-time-picker" aria-describedby="basic-addon2">' +
		'<div class="input-group-append">' +
		'<span><button class="input-group-text confirm-acc-btn" id="confirm-acc-btn">Potvridete termin</button></span>' +
		'</div>' +
		'</div>';

	return pickercode;
}

//function for auto color changing/rendering
function setValidColor(parentid) {
	let el = document.querySelector('.indi-card' + parentid);
	let status = el.querySelector('.status-labela').innerHTML;
	if (status == 'null') {
		el.style.border = '9px solid #343a40';
	} else if (status == 'true') {
		el.querySelector('.zahtev-headline').style.color = '#035949';
		el.style.border = '9px solid #035949';
	} else if ((status = 'false')) {
		el.querySelector('.zahtev-headline').style.color = '#b2002d';
		el.style.border = '9px solid #b2002d';
	}
	console.log(el);
}
//function for manual color changing/rendering
function forceSetValidColor(parentid, status) {
	let el = document.querySelector('.indi-card' + parentid);
	if (status == true) {
		el.querySelector('.zahtev-headline').style.color = '#035949';
		el.style.border = '9px solid #035949';
	} else {
		el.querySelector('.zahtev-headline').style.color = '#b2002d';
		el.style.border = '9px solid #b2002d';
	}
	//console.log(parentid);
}
