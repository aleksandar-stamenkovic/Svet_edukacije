// pri ucitavanju strane podaci morajju da budu vec ucitani u polja
function otvoriInputPolja() {
	let inputPolja = document.querySelectorAll('.profile-infoCont');

	inputPolja.forEach((el) => {
		el.disabled = false;
	});

	dugme = document.querySelector('.profile-sacuvaj-button');
	dugme.style.visibility = 'visible';
	dugme = document.querySelector('.profile-odustani-button');
	dugme.style.visibility = 'visible';
	dugme = document.querySelector('.profile-izmeni-button');
	dugme.disabled = true;
}

function zakljucajInputPolja() {
	//resetuje uneseno,jer smo odustali od izmene

	let inputPolja = document.querySelectorAll('.profile-infoCont');

	inputPolja.forEach((el) => {
		el.disabled = true;
	});
	dugme = document.querySelector('.profile-sacuvaj-button');
	dugme.style.visibility = 'hidden';
	dugme = document.querySelector('.profile-odustani-button');
	dugme.style.visibility = 'hidden';
	dugme = document.querySelector('.profile-izmeni-button');
	dugme.disabled = false;
}

function editUcenikaSacuvajIzmene() {
	let id = sessionStorage.getItem('id'); //ovo tek treba da se implementira u landing page procesu logovanja
	let ime = document.querySelector('.profile-ime').value;
	let prezime = document.querySelector('.profile-prezime').value;
	let username = document.querySelector('.profile-username').value;
	let password = document.querySelector('.profile-password').value;
	let email = document.querySelector('.profile-email').value;
	let brtel = document.querySelector('.profile-brtel').value;

	console.log('kliknuto confrm');

	fetch('https://localhost:44393/api/Ucenik/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id,
			ime: ime,
			prezime: prezime,
			username: username,
			password: password,
			email: email,
			brtel: brtel
		})
	}).then((p) => {
		if (p.ok) {
			console.log('Uspesna izmena ucenika');
			disableProfileInfoForm();
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
	zakljucajInputPolja();
}

/*---------------------------------------------------
	PROCES LOGOVANJA
----------------------------------------------------*/
