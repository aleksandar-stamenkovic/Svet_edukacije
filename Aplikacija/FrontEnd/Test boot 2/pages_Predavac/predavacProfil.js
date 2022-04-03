/*---------------------------------------------------
	ONLOAD BODY FUNKCIJA
----------------------------------------------------*/
function onloadBody2() {
	//izlistajListuPredmeta();
	console.log('onloadBody2 treagered');
}

/*---------------------------------------------------
	RAD SA PODACIMA KORISNIKA EDIT ADD SAVE ODJAVA
----------------------------------------------------*/

function enableProfileInfoForm() {
	let formControls = document.querySelectorAll('.profile-infoCont ');

	formControls.forEach((el) => {
		el.disabled = false;
		el.style.border = '1px solid lightgray';
	});

	let dugme = document.querySelector('.profile-izmeni-button');
	dugme.disabled = true;

	dugme = document.querySelector('.profile-sacuvaj-button');
	dugme.style.visibility = 'visible';
	dugme = document.querySelector('.profile-odustani-button');
	dugme.style.visibility = 'visible';
}

function disableProfileInfoForm() {
	resetInfoForm();
	let formControls = document.querySelectorAll('.profile-infoCont ');

	formControls.forEach((el) => {
		el.disabled = true;
		el.style.border = 'none';
	});

	let dugme = document.querySelector('.profile-sacuvaj-button');
	dugme.style.visibility = 'hidden';
	dugme = document.querySelector('.profile-odustani-button');
	dugme.style.visibility = 'hidden';
	dugme = document.querySelector('.profile-izmeni-button');
	dugme.disabled = false;
}
function resetInfoForm() {}

function onloadBody() {
	let dugme = document.querySelector('.profile-sacuvaj-button');
	dugme.style.visibility = 'hidden';
	dugme = document.querySelector('.profile-odustani-button');
	dugme.style.visibility = 'hidden';
}

function odjava() {
	sessionStorage.removeItem('id');
	window.location.href = '../page_Landing/landing.html';
}

function editPredavacaSacuvajIzmene() {
	let id = sessionStorage.getItem('id');
	let ime = document.querySelector('.profile-ime').value;
	let prezime = document.querySelector('.profile-prezime').value;
	let username = document.querySelector('.profile-username').value;
	let password = document.querySelector('.profile-password').value;
	let email = document.querySelector('.profile-email').value;
	let brtel = document.querySelector('.profile-brtel').value;
	let opis = document.querySelector('.profile-opis').value;
	let adresa = document.querySelector('.profile-adresa').value;
	let ocenaPlus = document.querySelector('.positivePoint-num').innerHTML;
	let ocenaMinus = document.querySelector('.negativePoint-num').innerHTML;

	console.log('kliknuto confrm');

	fetch('https://localhost:44393/api/Predavac/' + id, {
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
			brtel: brtel,
			opis: opis,
			adresa: adresa,
			ocenePlus: ocenaPlus,
			oceneMinus: ocenaMinus
		})
	}).then((p) => {
		if (p.ok) {
			console.log('Uspesna izmena predavaca');
			disableProfileInfoForm();
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
}

/*---------------------------------------------------
	RAD SA PREDMETIMA KORISNIKA
----------------------------------------------------*/
function dodajNoviPredmet() {
	let idsesije = sessionStorage.getItem('id');
	let imeNovogPredmeta = document.querySelector('.addPredmet-ime').value;
	let radio = document.querySelectorAll('.custom-control-input');
	let ustanova;
	for (let i = 0; i < 3; i++) {
		if (radio[0].checked == true) ustanova = 1;
		if (radio[1].checked == true) ustanova = 2;
		if (radio[2].checked == true) ustanova = 3;
	}
	fetch('https://localhost:44393/api/Predmet/' + idsesije, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ime: imeNovogPredmeta,
			skola: ustanova
		})
	}).then((p) => {
		if (p.ok) {
			generisiPredmetKarticu(idsesije, imeNovogPredmeta);
			console.log('Uspesna dodavanje predmeta');
			$('#addPredmetModal').modal('hide');
			document.querySelector('.addPredmet-ime').value = null;
		} else {
			console.log('greska prilikom dodavanja predmeta');
		}
	});
	console.log(idsesije, imeNovogPredmeta, ustanova);
}

function obrisiPredmet(evcaller) {
	//ovo radi
	$('#obrisiPredmetModal').modal('toggle');
	$('#confirm-deleting').unbind().click(function() {
		console.log(evcaller.parentNode.parentNode);
		let idLabelaContainer = evcaller.parentNode.parentNode;
		let idLabelaHidden = idLabelaContainer.querySelector('.labela-id-kartica-predmet').innerHTML;
		console.log('id kartice predmeta koji se brise:- ' + idLabelaHidden);

		fetch('https://localhost:44393/api/predmet/' + idLabelaHidden, {
			method: 'DELETE'
		}).then((p) => {
			if (p.ok) {
				$('#obrisiPredmetModal').modal('hide');
				$('.obrisanPredmetSuccessful').fadeIn();
				setTimeout(() => {
					$('.obrisanPredmetSuccessful').fadeOut();
				}, 2500);
			}
		});
		let parentKartica = evcaller.parentNode.parentNode.parentNode;
		parentKartica.remove();
		console.log('pozvano brisanje');
		$('#obrisiPredmetModal').modal('hide');
	});
}

function generisiPredmetKarticu(idPredmeta, imePredmeta) {
	var karticaPredmeta = $(
		'<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">' +
			' <div class="toast-header">' +
			'<img src="/Images/icons/ico2x134x134.png" class="rounded mr-2 predmet-ikonica" alt="">' +
			'<strong class="mr-auto">' +
			imePredmeta +
			'</strong>' +
			'<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
			'<span aria-hidden="true" onclick="obrisiPredmet(this)">&times;</span>' +
			'</button>' +
			'<label hidden class="labela-id-kartica-predmet">' +
			idPredmeta +
			'</label>' +
			'</div>' +
			'<div class="toast-body">' +
			'</div>' +
			'</div>'
	);
	$('#profile-predmet-cards').append(karticaPredmeta);
}

/*----TEST FUNKCIJE----*/
function izlistajListuPredmeta() {
	//test funkcija
	for (let i = 0; i < 5; i++) {
		generisiPredmetKarticu(i * i, i, 'ime' + i);
	}
}
