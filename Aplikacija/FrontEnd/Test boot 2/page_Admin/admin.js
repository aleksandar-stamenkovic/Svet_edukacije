function paginateEvents() {
	let array = document.querySelectorAll('.paginate_button');

	array.forEach((el) => {
		el.onclick = function() {
			$(
				'<td><div class="btn-group" role="group" aria-label="Basic example">' +
					'<button type="button" onclick="editUcenikaUcitajFormu(this)" class="btn btn-secondary table-crud-button">Edit</button>' +
					'<button type="button" onclick="deleteUcenika(this)" class="btn btn-secondary table-crud-button">Delete</button>' +
					'</div></td>'
			).appendTo('tbody>tr');
			console.log('asdasdasdasd paginacija');
		};
	});
}

/* --------------------------------------------------------------------------
	METODE ZA UCITAVANJE PREDAVACA I UCITAVANJE UCENIKA I RESET TABELE
-------------------------------------------------------------------------- */

function ucitajPredavace() {
	clearAllTable();
	const kolone = [ 'id', 'ime', 'prezime', 'korisničko_ime', 'šifra', 'email', 'options' ];

	$(document).ready(function() {
		let red = document.createElement('tr');
		document.querySelector('thead').appendChild(red);
		kolone.forEach((k) => {
			const kolona = document.createElement('th');
			kolona.innerHTML = k;
			red.appendChild(kolona);
		});
		$.ajax({
			method: 'get',
			url: 'https://localhost:44393/api/predavac',
			dataType: 'json',
			success: function(data) {
				$('#example').dataTable({
					data: data,
					columns: [
						{ data: 'id' },
						{ data: 'ime' },
						{ data: 'prezime' },
						{ data: 'username' },
						{ data: 'password' },
						{ data: 'email' },
						{
							data: null,
							defaultContent:
								'<td><div class="btn-group" role="group" aria-label="Basic example">' +
								'<button type="button" onclick="editPredavacaUcitajFormu(this)" class="btn btn-secondary table-crud-button">Edit</button>' +
								'<button type="button" onclick="deletePredavaca(this)" class="btn btn-secondary table-crud-button">Delete</button>' +
								'</div></td>'
						}
					]
				});
				//$('<td><button>Blabla</button></td>').appendTo('tbody>tr');
				/*$(
					'<td><div class="btn-group" role="group" aria-label="Basic example">' +
						'<button type="button" onclick="editPredavacaUcitajFormu(this)" class="btn btn-secondary table-crud-button">Edit</button>' +
						'<button type="button" onclick="deletePredavaca(this)" class="btn btn-secondary table-crud-button">Delete</button>' +
						'</div></td>'
				).appendTo('tbody>tr');*/
			}
		});
	});
}

function ucitajUcenike() {
	clearAllTable();
	const kolone = [ 'id', 'ime', 'prezime', 'korisničko_ime', 'šifra', 'email', 'options' ];

	$(document).ready(function() {
		let red = document.createElement('tr');
		document.querySelector('thead').appendChild(red);
		kolone.forEach((k) => {
			const kolona = document.createElement('th');
			kolona.innerHTML = k;
			red.appendChild(kolona);
		});
		$.ajax({
			method: 'get',
			url: 'https://localhost:44393/api/ucenik',
			dataType: 'json',
			success: function(data) {
				$('#example').dataTable({
					data: data,
					columns: [
						{ data: 'id' },
						{ data: 'ime' },
						{ data: 'prezime' },
						{ data: 'username' },
						{ data: 'password' },
						{ data: 'email' },
						{
							data: null,
							defaultContent:
								'<td><div class="btn-group" role="group" aria-label="Basic example">' +
								'<button type="button" onclick="editUcenikaUcitajFormu(this)" class="btn btn-secondary table-crud-button">Edit</button>' +
								'<button type="button" onclick="deleteUcenika(this)" class="btn btn-secondary table-crud-button">Delete</button>' +
								'</div></td>'
						}
					]
				});
				//$("<td><button>Blabla</button></td>").appendTo("tbody>tr");
				/*$(
					'<td><div class="btn-group" role="group" aria-label="Basic example">' +
						'<button type="button" onclick="editUcenikaUcitajFormu(this)" class="btn btn-secondary table-crud-button">Edit</button>' +
						'<button type="button" onclick="deleteUcenika(this)" class="btn btn-secondary table-crud-button">Delete</button>' +
						'</div></td>'
				).appendTo('tbody>tr');*/
			}
		});
	});
}

function clearAllTable() {
	let trs = document.querySelector('tr');
	if (trs != null) {
		$('#example').dataTable().fnClearTable();
		$('#example').dataTable().fnDestroy();
		//let trs = document.querySelector('tr');
		trs.remove();
	}
}
/* --------------------------------------------------------------------------
    METODE ZA BRISANJE PREDAVACA I POZIV MODALNOG DIJALOGA
-------------------------------------------------------------------------- */
function deletePredavaca(evcaller) {
	let parent = evcaller.parentNode.parentNode.parentNode;
	let id = parent.querySelector('td');
	console.log(id.innerHTML);

	$('#staticBackdrop').modal('toggle');

	$('#confirm-deleting').unbind().click(function() {
		fetch('https://localhost:44393/api/predavac/' + id.innerHTML, {
			method: 'DELETE'
		}).then((p) => {
			if (p.ok) {
				$('staticBackdrop').modal('hide');
				//alert('predavac obrisan'); //OVAJ ALERT TREBA ZAMENITI NEKOM NOTIFIKACIJOM SA BOOTSTRAPA
				$('.obrisanPredavacSuccessful').fadeIn();
				setTimeout(() => {
					$('.obrisanPredavacSuccessful').fadeOut();
				}, 2500);
				ucitajPredavace();
			}
		});
		console.log('fec pozvan za brisanje');
	});
}

/* --------------------------------------------------------------------------
    METODE ZA BRISANJE UCENIKA I POZIV MODALNOG DIJALOGA
-------------------------------------------------------------------------- */
function deleteUcenika(evcaller) {
	let parent = evcaller.parentNode.parentNode.parentNode;
	let id = parent.querySelector('td');
	console.log(id.innerHTML);

	$('#staticBackdrop').modal('toggle');

	$('#confirm-deleting').unbind().click(function() {
		fetch('https://localhost:44393/api/ucenik/' + id.innerHTML, {
			method: 'DELETE'
		}).then((p) => {
			if (p.ok) {
				$('staticBackdrop').modal('hide');
				//alert('ucenik obrisan'); //OVAJ ALERT TREBA ZAMENITI NEKOM NOTIFIKACIJOM SA BOOTSTRAPA
				$('.obrisanUcenikSuccessful').fadeIn();
				setTimeout(() => {
					$('.obrisanUcenikSuccessful').fadeOut();
				}, 2500);
				ucitajUcenike();
			}
		});
		console.log('fec pozvan za brisanje');
	});
}
/* --------------------------------------------------------------------------
    METODE ZA POZIV MODALNOG DIJALOGA I EDIT PREDAVACA
-------------------------------------------------------------------------- */
function editPredavacaUcitajFormu(evcaller) {
	let parent = evcaller.parentNode.parentNode.parentNode;
	let id = parent.querySelector('td');
	console.log(id.innerHTML);

	fetch('https://localhost:44393/api/predavac/' + id.innerHTML, {
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
				data['opis']
			];

			$('#editPredavacModal').modal('toggle');

			let editPredavacModal = document.querySelector('#editPredavacModal');

			let nizImputa = editPredavacModal.querySelectorAll('input');

			for (let i = 0; i < nizImputa.length; i++) {
				nizImputa[i].value = nizPodataka[i];
			}

			editPredavacModal.querySelector('textarea').value = nizPodataka[nizPodataka.length - 1];
		})
	);
}
function editPredavacaSacuvajIzmene() {
	let id = document.querySelector('.editPredavac-id');
	let ime = document.querySelector('.editPredavac-ime').value;
	let prezime = document.querySelector('.editPredavac-prezime').value;
	let username = document.querySelector('.editPredavac-username').value;
	let password = document.querySelector('.editPredavac-password').value;
	let email = document.querySelector('.editPredavac-email').value;
	let brtel = document.querySelector('.editPredavac-brtel').value;
	let opis = document.querySelector('.editPredavac-opis').value;
	let ocenaPlus = document.querySelector('.editPredavac-ocenaPlus').value;
	let ocenaMinus = document.querySelector('.editPredavac-ocenaMinus').value;

	console.log('kliknuto confrm');

	fetch('https://localhost:44393/api/Predavac/' + id.value, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id.value,
			ime: ime,
			prezime: prezime,
			username: username,
			password: password,
			email: email,
			brtel: brtel,
			opis: opis,
			ocenePlus: ocenaPlus,
			oceneMinus: ocenaMinus
		})
	}).then((p) => {
		if (p.ok) {
			ucitajPredavace();
			$('#editPredavacModal').modal('hide');
			console.log('Uspesna izmena predavaca');
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
}

/* --------------------------------------------------------------------------
    METODE ZA POZIV MODALNOG DIJALOGA I EDIT UCENIKA
-------------------------------------------------------------------------- */
function editUcenikaUcitajFormu(evcaller) {
	let parent = evcaller.parentNode.parentNode.parentNode;
	let id = parent.querySelector('td');
	console.log(id.innerHTML);

	fetch('https://localhost:44393/api/ucenik/' + id.innerHTML, {
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

			$('#editUcenikModal').modal('toggle');

			let editUcenikModal = document.querySelector('#editUcenikModal');

			let nizImputa = editUcenikModal.querySelectorAll('input');

			for (let i = 0; i < nizImputa.length; i++) {
				nizImputa[i].value = nizPodataka[i];
			}
		})
	);
}
function editUcenikaSacuvajIzmene() {
	let id = document.querySelector('.editUcenik-id');
	let ime = document.querySelector('.editUcenik-ime').value;
	let prezime = document.querySelector('.editUcenik-prezime').value;
	let username = document.querySelector('.editUcenik-username').value;
	let password = document.querySelector('.editUcenik-password').value;
	let email = document.querySelector('.editUcenik-email').value;
	let brtel = document.querySelector('.editUcenik-brtel').value;

	console.log('kliknuto confrm');

	fetch('https://localhost:44393/api/ucenik/' + id.value, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id.value,
			ime: ime,
			prezime: prezime,
			username: username,
			password: password,
			email: email,
			brtel: brtel
		})
	}).then((p) => {
		if (p.ok) {
			ucitajUcenike();
			$('#editUcenikModal').modal('hide');
			console.log('Uspesna izmena ucenika');
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
}

/* --------------------------------------------------------------------------
    METODE ZA PREGLED PREDMETA U BAZI
-------------------------------------------------------------------------- */

function ucitajPredmete() {
	clearAllTable();
	const kolone = [ 'id', 'predmet', 'id_predavača', 'škola' ];

	$(document).ready(function() {
		let red = document.createElement('tr');
		document.querySelector('thead').appendChild(red);
		kolone.forEach((k) => {
			const kolona = document.createElement('th');
			kolona.innerHTML = k;
			red.appendChild(kolona);
		});
		$.ajax({
			method: 'get',
			url: 'https://localhost:44393/api/predmet',
			dataType: 'json',
			success: function(data) {
				$('#example').dataTable({
					data: data,
					columns: [ { data: 'id' }, { data: 'ime' }, { data: 'predavac.id' }, { data: 'skola' } ]
				});
				//$('<td><button>Blabla</button></td>').appendTo('tbody>tr');
				$().appendTo('tbody>tr');
			}
		});
	});
}

/* --------------------------------------------------------------------------
    METODE ZA PREGLED ZAHTEVA U BAZI
-------------------------------------------------------------------------- */

function ucitajZahteve() {
	clearAllTable();
	const kolone = [ 'id', 'id_predavača', 'id_učenika', 'prihvaćen', 'vreme', 'ocenjen' ];

	$(document).ready(function() {
		let red = document.createElement('tr');
		document.querySelector('thead').appendChild(red);
		kolone.forEach((k) => {
			const kolona = document.createElement('th');
			kolona.innerHTML = k;
			red.appendChild(kolona);
		});
		$.ajax({
			method: 'get',
			url: 'https://localhost:44393/api/zahtev',
			dataType: 'json',
			success: function(data) {
				$('#example').dataTable({
					data: data,
					columns: [
						{ data: 'id' },
						{ data: 'predavac.id' },
						{ data: 'ucenik.id' },
						{ data: 'prihvacen' },
						{ data: 'vreme' },
						{ data: 'glasano' }
					]
				});
				//$('<td><button>Blabla</button></td>').appendTo('tbody>tr');
				$().appendTo('tbody>tr');
			}
		});
	});
}

/* --------------------------------------------------------------------------
    FUNKCIJA ONLOAD BODY
-------------------------------------------------------------------------- */

function onloadBody() {
	ucitajPredavace();
	clearAllTable();
}
