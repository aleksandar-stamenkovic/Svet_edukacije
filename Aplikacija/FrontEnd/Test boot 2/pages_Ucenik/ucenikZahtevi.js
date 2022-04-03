//pritiskom na odjavi se, prebacuje na pocetnu stranu portala
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
	console.log('asdasdasdas');
	LoadZahtevi();
}

function generisiZahtevKolapser(
	idZahteva,
	textPoruke,
	username,
	imePosiljaoca,
	idPredavaca,
	timestamp,
	validnost,
	glasanost
) {
	var karticaPredmeta = $(
		'<div class="card card-colapser indi-card' +
		idZahteva +
		'">' +
		'<label hidden class="status-idPredavaca">' +
		idPredavaca +
		'</label>' +
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
		//'<label class="btn btn-secondary accept-btn" onclick="acceptZahtev(this)">' +
		//'<i class="fas fa-check"></i>' +
		'</label>' +
		'<label hidden class="idZahtevaThis">' +
		idZahteva +
		'</label>' +
		'<label class="btn btn-secondary decline-btn" active onclick="obrisiZahtev(this)">' +
		'<i class="fas fa-times"></i>' +
		'</label>' +
		'</div>' +
		'</h2>' +
		'</div>' +
		'<div id="collapse' +
		idZahteva +
		'" class="collapse" aria-labelledby="heading' +
		idZahteva +
		'" data-parent="#accordionExample">' +
		ocenjivanjeElement(validnost, glasanost) +
		'<div class="card-body">' +
		'<p class="colapser-body-text">' +
		textPoruke + //ovo je tekst isto ce biti dinamicki parametar
			'</p>' +
			'<footer class="blockquote-footer">from ' +
			imePosiljaoca +
			' <cite title="Source Title" class="cite-timestamp-datum">' +
			timestamp +
			'</cite>' +
			'<label class="btn btn-secondary reply-btn btn-group" onclick="replyZahtev(this)">' +
			'<i class="fas fa-reply"></i>' +
			'</label>' +
			'</footer>' +
			'<div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
	);
	$('#id-card-colapser').append(karticaPredmeta);

	setValidColor(idZahteva);
}

function LoadZahtevi() {
	let idsesije = sessionStorage.getItem('id');
	console.log(idsesije);
	fetch('https://localhost:44393/api/Zahtev/ucenik/' + idsesije, {
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
					element['vreme'],
					element['glasano']
				];

				let predavac = nizPodataka[1];
				let text = nizPodataka[3];
				let validan = nizPodataka[4];
				let vreme = nizPodataka[5];
				let glasano = nizPodataka[6];
				console.log(predavac['username'], predavac['ime'] + ' ' + predavac['prezime']);
				console.log(glasano);
				generisiZahtevKolapser(
					nizPodataka[0],
					text,
					predavac.ime + ' ' + predavac.prezime,
					predavac.username,
					predavac.id,
					vreme,
					validan,
					glasano
				);
			});
		})
	);

	/*for (let i = 0; i < 5; i++) {
		generisiZahtevKolapser(i + 1, 'neki random tekst', 'Ana', 'Ana Nikolic', 'today 00:00');
	}*/
}

//f-ja odgovora na pristigli zahtev
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
			console.log('Uspesna izmena predavaca');
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
		}
	});
}

function obrisiZahtev(evcaller) {
	console.log('fake delete');
	let id = evcaller.parentNode.querySelector('.idZahtevaThis').innerHTML;

	fetch('https://localhost:44393/api/zahtev/' + id, {
		method: 'DELETE'
	}).then((p) => {
		if (p.ok) {
			console.log('zahtev obrisan'); //OVAJ ALERT TREBA ZAMENITI NEKOM NOTIFIKACIJOM SA BOOTSTRAPA
			$('.obrisanZahtevSuccessful').fadeIn();
				setTimeout(() => {
					$('.obrisanZahtevSuccessful').fadeOut();
				}, 2500);
		} else {
			console.log('doslo je do greske prilikom brisanja'); //OVAJ ALERT TREBA ZAMENITI NEKOM NOTIFIKACIJOM SA BOOTSTRAPA
		}
	});
	removeColapseCard(id);
	console.log('fec za brisanje proso');
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

	//console.log(datetime);
	return datetime;
}

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
	//console.log(el);
}

function removeColapseCard(parentid) {
	let el = document.querySelector('.indi-card' + parentid);
	let par = el.parentNode;
	par.removeChild(el);
}

function ocenjivanjeElement(option, option2) {
	//console.log('usosssss');

	let elementOcena;
	console.log(option2);
	if (option == 1 && option2 == 0) {
		elementOcena =
			'<div class="btn-group-oceni">' +
			'<div class="btn-group">' +
			'<label class="btn btn-secondary btn-label-ocena" >' +
			'Oceni: ' +
			'</label>' +
			'<label class="btn btn-secondary btn-pozitivna-ocena"  onclick="oceniPredavaca(this, true)">' +
			'<i class="fas fa-thumbs-up"></i>' +
			'</label>' +
			'<label class="btn btn-secondary btn-negativna-ocena" active onclick="oceniPredavaca(this, false)">' +
			'<i class="fas fa-thumbs-down"></i>' +
			'</label>' +
			'</div>' +
			'</div>';
	} else {
		elementOcena = '';
	}
	//console.log(elementOcena);
	return elementOcena;
}

function oceniPredavaca(parentid, option) {
	//option ima vrednost true ili false
	let root = parentid.parentNode.parentNode.parentNode.parentNode;
	let idPredavaca = root.querySelector('.status-idPredavaca').innerHTML;
	let datumAcepta = root.querySelector('.cite-timestamp-datum').innerHTML;
	let idZahteva = root.querySelector('.idZahtevaThis').innerHTML;
	let danasnjiDatum = getCurrDate();
	fetch('https://localhost:44393/api/Predavac/' + idPredavaca + '/' + option + '/' + idZahteva, {
		method: 'PUT'
	}).then((p) => {
		if (p.ok) {
			console.log('Uspesno ocenjivanje predavaca');
			$('.ocenjenPredavacSuccessful').fadeIn();
				setTimeout(() => {
					$('.ocenjenPredavacSuccessful').fadeOut();
				}, 2500);
		} else {
			console.log('greska prilikom izmene ili prilikom post fetcha');
			$('.ocenjenPredavacFailed').fadeIn();
				setTimeout(() => {
					$('.ocenjenPredavacFailed').fadeOut();
				}, 3500);
		}
	});
	//console.log(idZahteva);
	//console.log(datumAcepta);
	//console.log(danasnjiDatum);
	//console.log('Predavac: ' + idPredavaca + ' ocenjen sa: ' + option);
}

//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
/*<div class="input-group pos-neg-points">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                  <i class="fas fa-thumbs-up" style="color:#035949"></i><div class="positivePoints"><strong class="positivePoint-num"></strong></div>
                                </div>                                
                            </div>
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="fas fa-thumbs-down" style="color:#b2002d"></i><div class="negativePoints"><strong class="negativePoint-num"></strong></div>
                                  </div>                                
                            </div>
                        </div>


*/
/*function acceptZahtev(parentCaller) {
	let parent = parentCaller.parentNode;
	let idZahteva = parent.querySelector('.idZahtevaThis').innerHTML;
	//let idPosiljaoca = parent.querySelector('.idPosiljaocaThis').innerHTML;
	let parent2 = parent.parentNode.parentNode;
	let textZahteva = parent2.querySelector('.colapser-body-text').innerHTML;
	console.log(idZahteva);
	//console.log(idPosiljaoca);
	console.log(textZahteva);
}*/

//treba dodati za brisanje pojedinacnog zahteva koji pita da li smo sigurni za brisanje
/*function obrisiZahtev()
{

	'<div class="btn-group">' +
		'<label class="btn btn-secondary accept-btn"  onclick="oceniPredavaca(this, true)">' +
		'<i class="fas fa-thumbs-up></i>' +
		'</label>' +
		'<label hidden>' +
		'</label>' +
		'<label class="btn btn-secondary decline-btn" active onclick="oceniPredavaca(this, false)">' +
		'<i class="fas fa-thumbs-down"></i>' +
		'</label>' +
		'</div>';
  
}*/

//f-ja koja kada se u serach unosi ime pretrazuje zahteve--nedovrsena!
/*function izlistajPoImenu(){
    // Deklarisanje varijabli
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    //treba da uzima ime od:
    li = ul.getElementsByTagName('li');

    // Pregledaj sve stavke u listi i sakriti one koje se ne poklapaju sa upitom za pretragu
    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
    } else {
       li[i].style.display = "none";
    }
}
}*/
