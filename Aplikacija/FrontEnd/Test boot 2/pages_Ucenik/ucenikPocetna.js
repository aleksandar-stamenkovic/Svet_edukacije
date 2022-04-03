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
}

/* funkcije loadStrane*/
function obrisiStranuSaSlikama(val) {
	let kartice = document.querySelector('.card-deck');
	kartice.remove();
	//ucitava novu stranutj div tag
	let loadStranaDiv = document.querySelector('.loadStrana');
	loadStranaDiv.style.display = 'block';
	prikaziNjaboljeProfesore();
	setPredmetSearchVall(val);
}

function prikaziNjaboljeProfesore() {
	//kartice da se vidi biografija profesora // popunjava kartice sa podacima profesora koji su najbolji, mozda mozemo klikom na te
	fetch('https://localhost:44393/api/predavac', {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			let i, max;
			let predmeti = '';
			let ime;

			console.log('---------------------------------');
			console.log(data);
			let vel = data.length;

			console.log(vel);
			if (vel < 5) i = vel;
			else i = 5;
			console.log('i:' + i);
			let tr;

			let niz = new Array();
			let trmax = 0;

			for (let f = 0; f < data.length; f++) niz[f] = data[f];

			let pomocna;
			let brojac = 0;
			for (let i = 0; i < data.length - 1; i++) {
				for (let j = i + 1; j < data.length; j++) {
					if (niz[i]['ocenePlus'] < niz[j]['ocenePlus']) {
						pomocna = niz[i];
						niz[i] = niz[j];
						niz[j] = pomocna;
					}
				}
			}
			let velicina;
			if (data.length < 5) velicina = data.length;
			else velicina = 5;
			for (let e = 0; e < velicina; e++) {
				let pr = niz[e]['predmeti'];
				pr.forEach((m) => {
					predmeti = predmeti + m['ime'] + ' ';
				});
				ime = niz[e]['ime'] + ' ' + niz[e]['prezime'];
				console.log(e + ' ' + ime + ' ' + predmeti);
				iscrtajKarticuPredmetProfesor(
					niz[e]['ime'],
					niz[e]['ime'] + ' ' + niz[e]['prezime'],
					niz[e]['id'],
					niz[e]['username'],
					niz[e]['adresa'],
					niz[e]['ocenePlus'],
					niz[e]['oceneMinus']
				);
			}
		})
	);
}

function prikPredmNajboljPredavaca() {
	let telo = $('btn-link');
	telo.style.visibility = 'visible';
}

function iscrtajNajboljeProfesore(predmeti, imePrezime, idPredavaca, username, ocenePlus, oceneMinus) {
	let karticaPredmet = $(
		'<div class="media media-predmet-profesor" onclick="prikaziPodatkePredmetProfesor()">' +
		'  <div class="media-body predmet-profesor" > ' +
		'  <h5 class="mt-0">' +
		imePrezime +
		'</h5>' +
		'Profesor: ' +
		predmeti +
		'</div>' +
		'</div>'
	);

	$('#idlistaNajboljihPredavaca').append(karticaPredmet);
}

function iscrtajKarticuPredmetProfesor(predmet, profesor, idPredavaca, username, adresa, ocenePlus, oceneMinus) {
	let karticaPredmet = $(
		'<div class="media media-predmet-profesor" onclick="prikaziPodatkePredmetProfesor(this)">' +
		'<img src="https://localhost:44393/api/imageupload/' +
		username +
		'.jpg" class="mr-3 avatar-slika" alt="...">' +
		'<label hidden class="idPredavacaHidden">' +
		idPredavaca +
		'</label>' +
		'  <div class="media-body predmet-profesor" > ' +
		'  <h5 class="mt-0 imePredmet">' +
		predmet +
		'</h5>' +
		'<strong>Profesor: </strong>' +
		profesor +
		'<br><strong>Adresa: </strong>' +
		adresa +
		'</div>' +
		'<div class="btn-group-oceni">' +
		'<div class="btn-group">' +
		'<label class="btn btn-secondary btn-pozitivna-ocena">' +
		'<i class="fas fa-thumbs-up"></i>:' +
		'<strong style="margin-left: 10px">' +
		ocenePlus +
		'</strong>' +
		'</label>' +
		'<label class="btn btn-secondary btn-negativna-ocena">' +
		'<i class="fas fa-thumbs-down"></i>:' +
		'<strong style="margin-left: 10px">' +
		oceneMinus +
		'</strong>' +
		'</label>' +
		'</div>' +
		'</div>' +
		'</div>'
	);
	$('#predmeti-cards').append(karticaPredmet);
}

var predmetSearchVal = 0;

function setPredmetSearchVall(val) {
	predmetSearchVal = val;
}

function prikaziPredmetePretrage() {
	let predmetNaziv = document.querySelector('.inputPretrazi').value;

	$('#idlistaNajboljihPredavaca').remove();
	$('.media-predmet-profesor').remove();

	fetch('https://localhost:44393/api/predmet/pretraga/' + predmetNaziv + '/' + predmetSearchVal, {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			console.log(data);
			data.forEach((
				el //data=niz predmeta, el odredjeni predmet
			) => {
				let predavac = el['predavac'];
				iscrtajKarticuPredmetProfesor(
					el['ime'],
					predavac['ime'] + ' ' + predavac['prezime'],
					predavac['id'],
					predavac['username'],
					predavac['adresa'],
					predavac['ocenePlus'],
					predavac['oceneMinus']
				);
			});
		})
	);
}

function prikaziPredmetePretrageEnter(event) {
	// 13 je kod za Enter
	if (event.keyCode === 13) {
		let predmetNaziv = document.querySelector('.inputPretrazi').value;

		$('#idlistaNajboljihPredavaca').remove();
		$('.media-predmet-profesor').remove();

		fetch('https://localhost:44393/api/predmet/pretraga/' + predmetNaziv + '/' + predmetSearchVal, {
			method: 'GET'
		}).then((p) =>
			p.json().then((data) => {
				console.log(data);
				data.forEach((
					el //data=niz predmeta, el odredjeni predmet
				) => {
					let predavac = el['predavac'];
					iscrtajKarticuPredmetProfesor(
						el['ime'],
						predavac['ime'] + ' ' + predavac['prezime'],
						predavac['id'],
						predavac['username'],
						predavac['adresa'],
						predavac['ocenePlus'],
						predavac['oceneMinus']
					);
				});
			})
		);
	}
}

function prikaziPodatkePredmetProfesor(evcaller) {
	$('#sendZahtevModal').modal('toggle'); //ovo otvara modal dijaog

	console.log(evcaller.querySelector('.idPredavacaHidden').innerHTML);
	let idPredavaca = evcaller.querySelector('.idPredavacaHidden').innerHTML;
	fetch('https://localhost:44393/api/predavac/' + idPredavaca, {
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
				data['adresa'],
				data['predmeti']
			];

			let infoCont = document.querySelectorAll('.lbl-info');

			this.ime = infoCont[0].innerHTML = '<strong>Ime:</strong> ' + nizPodataka[1];
			this.prezime = infoCont[1].innerHTML = '<strong>Prezime:</strong> ' + nizPodataka[2];
			this.username = infoCont[2].innerHTML = '<strong>Username:</strong> ' + nizPodataka[3];

			this.email = infoCont[3].innerHTML = '<strong>Email:</strong> ' + nizPodataka[5];
			this.brtel = infoCont[4].innerHTML = '<strong>Broj telefona:</strong>  ' + nizPodataka[6];
			this.adresa = infoCont[5].innerHTML = '<strong>Adresa:</strong> ' + nizPodataka[10];
			this.opis = infoCont[6].innerHTML = '<strong>Opis:</strong> ' + nizPodataka[9];

			document.querySelector('.modal-img-info').src =
				'https://localhost:44393/api/imageupload/' + nizPodataka[3] + '.jpg';
			inicijalizujMapu();
			console.log('ovo je adresa na mapu:' + nizPodataka[10]);
			pronadji(nizPodataka[10]);
			infoCont[7].innerHTML = nizPodataka[7];
			infoCont[8].innerHTML = nizPodataka[8];
		})
	);
	$('#confirm-reply').unbind().click(function () {
		//slanje zahteva ------->>>>>>>> myUsername je hardkodiran, treba zameniti! <<<<<<<------------
		let textareaModal = $('#tekstZaSlanje').val();
		console.log(textareaModal);
		let currTime = getCurrDate();
		let myUsername = document.querySelector('#sidebar-username').innerHTML;
		const textForSend =
			'<small>' +
			currTime +
			'</small><strong class="chatlike-header">' +
			myUsername +
			':</strong>\n' +
			textareaModal;
		let idUcenika = sessionStorage.getItem('id');
		console.log(textForSend + '\n' + idPredavaca + '\n' + idUcenika);
		const imePredmet = evcaller.querySelector('.imePredmet').innerHTML;

		fetch('https://localhost:44393/api/Zahtev/' + idPredavaca + '/' + idUcenika, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				tekst: textForSend,
				predmet: imePredmet
			})
		}).then((p) => {
			if (p.ok) {
				console.log('Uspesno poslat zahtev');
				//$(".porukaSuccessful").removeAttr("hidden");
				$('.porukaSuccessful').fadeIn();
				setTimeout(() => {
					//$(".porukaSuccessful").attr('hidden', true);
					$('.porukaSuccessful').fadeOut();
				}, 2500);
			} else {
				console.log('Greska prilikom slanja zahteva');
			}
		});

		$('#sendZahtevModal').modal('hide'); //ovo zatvara modal
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

/*---------------------------------------------------------------------------------------------
				MAP INTEGRATION
---------------------------------------------------------------------------------------------*/
function inicijalizujMapu() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhYWNhYXMiLCJhIjoiY2s3NHhxbW11MDY2ZjNtbXJ2ZjQxZDZ4aiJ9.uah1H7VHTo7RPJLdpiCung';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [21.8957605, 43.320904], // starting position - Niš
		zoom: 12 // starting zoom
	});
}

function pronadji(grad) {
	var mapboxClient = mapboxSdk({
		accessToken: mapboxgl.accessToken
	});
	mapboxClient.geocoding
		.forwardGeocode({
			query: grad,
			autocomplete: false,
			limit: 1
		})
		.send()
		.then(function (response) {
			if (response && response.body && response.body.features && response.body.features.length) {
				var feature = response.body.features[0];

				var map = new mapboxgl.Map({
					container: 'map',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: feature.center,
					zoom: 12
				});
				new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
			}
		});
}
//---------------------------------?????
function locirajPredavaca(adresa) {
	pronadji(adresa);
	console.log('trazi se: ' + adresa);
}
/*document.getElementById('btnPretrazi').onclick = function() {
	//var grad = document.getElementById("grad").value;
	//console.log(grad);
	// HARDKODIRAN BEOGRAD, OVDE IDE ADRESA PREDAVACA
	pronadji('milojka lesjanina nis');
};*/