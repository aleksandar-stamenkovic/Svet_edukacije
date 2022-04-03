function registrujKorisnika() {
	// Prikazivanje Loader-a
	let loader = $(
		'<div class="register-loader d-flex justify-content-center">' +
			'<div class="spinner-border" role="status">' +
			'<span class="sr-only">Loading...</span>' +
			'</div>' +
			'</div>'
	);
	$('.registrovanje-modal-body').append(loader);

	console.log('pritisnuto register dugme');

	let ime = document.querySelector('.register-ime').value;
	let prezime = document.querySelector('.register-prezime').value;
	let username = document.querySelector('.register-username').value;
	let password = document.querySelector('.register-password').value;
	let email = document.querySelector('.register-email').value;
	let brtel = document.querySelector('.register-brtel').value;
	let opis = document.querySelector('.register-opis').value;
	let adresa = document.querySelector('.register-adresa').value;

	// I POST metoda
	if (document.getElementById('customRadioInline1').checked == true) {
		// VALIDACIJE
		if (!registerPredavacValidacija()){
			$('.register-loader').remove();
			$('#warning-text-registrovanje').text("Sva polja su obavezna");
			return;
		}
		if(!emailValidacija()){
			$('.register-loader').remove();
			$('#warning-text-registrovanje').text("Pogrešan email");
			return;
		}
		if($('#file').prop('files')[0] == undefined){
			$('.register-loader').remove();
			$('#warning-text-registrovanje').text("Molimo unesite sliku");
			return;
		}
		// END VALIDACIJE
		fetch('https://localhost:44393/api/Predavac', {
			method: 'POST',
			// Neophodno je reći serveru koji je tip podataka koji se šalje, u ovom slučaju json
			// headers ima Content-Type = application/json
			headers: {
				'Content-Type': 'application/json'
			},
			// I u body se smešta string reprezentacija objekta koji se šalje
			body: JSON.stringify({
				ime: ime,
				prezime: prezime,
				username: username,
				password: password,
				email: email,
				brtel: brtel,
				adresa: adresa,
				opis: opis,
				ocenePlus: 0,
				oceneMinus: 0
			})
		}).then((p) => {
			if (p.ok) {
				$('.register-loader').remove(); //brisemo loader da se ne bi nakupljali
				//window.location.href = '../pages_Predavac/predavacPocetna.html';
				console.log('Uspesna registracija');
				uploadujSliku(username); //poziv za upload slike
				$('#RegisterModal').modal('hide');
				$('.porukaSuccessfulRegistering').fadeIn();
				setTimeout(() => {
					//$(".porukaSuccessful").attr('hidden', true);
					$('.porukaSuccessfulRegistering').fadeOut();
				}, 3500);
			} else {
				$('.register-loader').remove(); //brisemo loader da se ne bi nakupljali
				console.log('greska prilikom registracije ili prilikom post fetcha');
				$('#warning-text-registrovanje').text("Korisničko ime već postoji");
			}
		});
	} else if (document.getElementById('customRadioInline2').checked == true) {
		// VALIDACIJE
		if (!registerUcenikValidacija()){
			$('.register-loader').remove();
			$('#warning-text-registrovanje').text("Sva polja su obavezna");
			return;
		}
		if(!emailValidacija()){
			$('.register-loader').remove();
			$('#warning-text-registrovanje').text("Pogrešan email");
			return;
		}
		if($('#file').prop('files')[0] == undefined){
			$('.register-loader').remove();
			$('#warning-text-registrovanje').text("Molimo unesite sliku");
			return;
		}
		// END VALIDACIJE
		fetch('https://localhost:44393/api/Ucenik', {
			method: 'POST',
			// Neophodno je reći serveru koji je tip podataka koji se šalje, u ovom slučaju json
			// headers ima Content-Type = application/json
			headers: {
				'Content-Type': 'application/json'
			},
			// I u body se smešta string reprezentacija objekta koji se šalje
			body: JSON.stringify({
				ime: ime,
				prezime: prezime,
				username: username,
				password: password,
				email: email,
				brtel: brtel,
				ocenePlus: 0,
				oceneMinus: 0
			})
		}).then((p) => {
			if (p.ok) {
				$('.register-loader').remove(); //brisemo loader da se ne bi nakupljali
				//window.location.href = '../pages_Ucenik/ucenikPocenta.html';
				console.log('Uspesna registracija');
				uploadujSliku(username); //poziv za upload slike
				$('#RegisterModal').modal('hide');
				$('.porukaSuccessfulRegistering').fadeIn();
				setTimeout(() => {
					//$(".porukaSuccessful").attr('hidden', true);
					$('.porukaSuccessfulRegistering').fadeOut();
				}, 5000);
			} else {
				$('.register-loader').remove(); //brisemo loader da se ne bi nakupljali
				console.log('greska prilikom registracije ili prilikom post fetcha');
				$('#warning-text-registrovanje').text("Korisničko ime već postoji");
			}
		});
	}
}

function ukljuciOpis() {
	let opis = document.querySelector('.register-opis');
	let adresa = document.querySelector('.register-adresa');
	opis.hidden = false;
	adresa.hidden = false;
}
function iskljuciOpis() {
	let opis = document.querySelector('.register-opis');
	let adresa = document.querySelector('.register-adresa');

	adresa.hidden = true;
	opis.hidden = true;
	adresa.value = '';
	opis.value = '';
}

function logovanjeKorisnika() {
	// Prikazivanje Loader-a
	let loader = $(
		'<div class="login-loader d-flex justify-content-center">' +
			'<div class="spinner-border" role="status">' +
			'<span class="sr-only">Loading...</span>' +
			'</div>' +
			'</div>'
	);
	$('.logovanje-modal-body').append(loader);

	let username = document.querySelector('#login-ime').value;
	let password = document.querySelector('#login-prezime').value;
	console.log(username);
	console.log(password);

	fetch('https://localhost:44393/api/Predavac/Login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		// I u body se smešta string reprezentacija objekta koji se šalje
		body: JSON.stringify({
			username: username,
			password: password
		})
	}).then((p) => {
		if (p.ok) {
			p.json().then((t) => {
				console.log('Logovanje uspesno!');
				$('.login-loader').remove(); //brisemo loader da se ne bi nakupljali
				sessionStorage.removeItem('id'); //brisemo za svaki slucaj, ako je nesto pre toga ostalo u sesiju
				sessionStorage.setItem('id', t['id']); //ovako se stavljaju osnovni tipovi a ovo gore je za korisnicke objekte (klase)
				if (t['tip'] == 'predavac') window.location.href = '../pages_Predavac/predavacPocetna.html';
				else if (t['tip'] == 'ucenik') window.location.href = '../pages_Ucenik/ucenikPocetna.html';
				else if (t['tip'] == 'admin') window.location.href = '../page_Admin/admin.html';
			});
		} else {
			console.log('Logovanje neuspesno');
			$('.login-loader').remove(); //brisemo loader da se ne bi nakupljali
			$('#warning-text').text('Uneto korisničko ime ili lozinka nisu tačni');
		}
	});
}

function fakelogin() {
	//test fja
	sessionStorage.setItem('id', 1);
	console.log('Upisao id');
	window.location.href = '../pages_Predavac/predavacProfil.html';
}

function fakeLogin2() {
	sessionStorage.setItem('id', 1);
	console.log('Upisao id');
	window.location.href = '../pages_Ucenik/ucenikProfil.html';
}

function uploadujSliku(username) {
	var file_data = $('#file').prop('files')[0];
	var form_data = new FormData();
	form_data.append('files', file_data); //<-- OVO MORA OVAKO (nece bez 'files')
	$.ajax({
		url: 'https://localhost:44393/api/ImageUpload/' + username, // point to server-side controller method
		dataType: 'text', // what to expect back from the server
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function(response) {
			$('#msg').html(response); // display success response from the server
		},
		error: function(response) {
			$('#msg').html(response); // display error response from the server
		}
	});
}

function onloadBody() {
	//Loader
	let loader = $(
		'<div class="stat-loader d-flex justify-content-center">' +
			'<div class="spinner-border" role="status">' +
			'<span class="sr-only">Loading...</span>' +
			'</div>' +
			'</div>'
	);
	$(loader).appendTo('.icon-stat');
	setStatsData();
}

function setStatsData() {
	fetch('https://localhost:44393/api/predavac/statistika', {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			$('.stat-loader').remove();
			let nizPodataka = [ data['brPredavaca'], data['brUcenika'], data['brPredmeta'], data['brPrihvZahteva'] ];

			let titles = document.querySelectorAll('.card-stats-title');

			titles[0].innerHTML = nizPodataka[0];
			titles[1].innerHTML = nizPodataka[1];
			titles[2].innerHTML = nizPodataka[2];
			titles[3].innerHTML = nizPodataka[3];
		})
	);
}

// Validacija za registrovanje predavaca
function registerPredavacValidacija() {
	let ime = $('.register-ime').val();
	let prezime = $('.register-prezime').val();
	let username = $('.register-username').val();
	let password = $('.register-password').val();
	let email = $('.register-email').val();
	let brtel = $('.register-brtel').val();
	let adresa = $('.register-adresa').val();
	let opis = $('.register-opis').val();

	if(ime == "" || prezime == "" || username == "" || password == ""
		|| email == "" || brtel == "" || adresa == "" || opis == "")
		return false;
	else
		return true;
}

// Validacija za registrovnje ucenika
function registerUcenikValidacija() {
	let ime = $('.register-ime').val();
	let prezime = $('.register-prezime').val();
	let username = $('.register-username').val();
	let password = $('.register-password').val();
	let email = $('.register-email').val();
	let brtel = $('.register-brtel').val();

	if(ime == "" || prezime == "" || username == "" || password == ""
		|| email == "" || brtel == "")
		return false;
	else
		return true;
}

function emailValidacija() {
	let mail = $('.register-email').val();
	if(mail.indexOf('@') > 0 && mail.indexOf('.') >= 0 && mail.indexOf('@.') < 0)
		return true;
	else 
		return false;
}