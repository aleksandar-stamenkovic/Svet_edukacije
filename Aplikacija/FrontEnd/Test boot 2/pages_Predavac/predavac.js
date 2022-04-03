export class Predavac {
	constructor(id, ime, prezime, username, password, email, brtel, opis, ocenePlus, oceneMinus, adresa) {
		this.id = id;
		this.ime = ime;
		this.prezime = prezime;
		this.username = username;
		this.password = password;
		this.email = email;
		this.brtel = brtel;
		this.opis = opis;
		this.ocenePlus = ocenePlus;
		this.oceneMinus = oceneMinus;
		this.adresa = adresa;

		this.predmeti = [];
	}

	onloadLogin() {
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
					data['adresa'],
					data['predmeti']
				];

				let formControls = document.querySelectorAll('.profile-infoCont ');

				this.ime = formControls[0].value = nizPodataka[1];
				this.prezime = formControls[1].value = nizPodataka[2];
				this.username = formControls[2].value = nizPodataka[3];
				this.password = formControls[3].value = nizPodataka[4];
				this.email = formControls[4].value = nizPodataka[5];
				this.brtel = formControls[5].value = nizPodataka[6];
				this.adresa = formControls[6].value = nizPodataka[10];
				this.opis = formControls[7].value = nizPodataka[9];

				this.predmeti = nizPodataka[11];
				this.predmeti.forEach((d) => {
					this.generisiPredmetKarticu(d['id'], d['ime']);
				});

				console.log(nizPodataka[7] + '  ' + nizPodataka[8]);
				document.querySelector('.positivePoint-num').innerHTML = nizPodataka[7];
				document.querySelector('.negativePoint-num').innerHTML = nizPodataka[8];
				// Podaci na sidebar-u
				let text = document.querySelector('#sidebar-imeiprezime');
				text.innerHTML = nizPodataka[1] + ' ' + nizPodataka[2];
				text = document.querySelector('#sidebar-username');
				text.innerHTML = nizPodataka[3];
				text = document.querySelector('#sidebar-password');
				text.innerHTML = nizPodataka[5];
				document.querySelector('.sidebar-profileimage').src =
					'https://localhost:44393/api/imageupload/' + nizPodataka[3] + '.jpg';

				let profImageDiv = document.querySelector('.div-profile-image');
				let profImage = profImageDiv.querySelector('.card-img-top');
				profImage.src = 'https://localhost:44393/api/imageupload/' + nizPodataka[3] + '.jpg';
			})
		);
	}
	generisiPredmetKarticu(idPredmeta, imePredmeta) {
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
}

//------------------------------------------------------------------
/*
 dodajNoviProzivod()
    {
        const proizvod = new Proizvod();
        proizvod.ime = this.kontejner.querySelector(".Naziv").value;
        proizvod.sifra = this.kontejner.querySelector(".Sifra").value;
        proizvod.cena = parseInt(this.kontejner.querySelector(".Cena").value);
        proizvod.kolicina =parseInt(this.kontejner.querySelector(".Kolicina").value);

        // I POST metoda
        fetch("https://localhost:5001/Prodavnica/DodajProizvod/" + this.id, {
            method: "POST",
            // Neophodno je reći serveru koji je tip podataka koji se šalje, u ovom slučaju json
            // headers ima Content-Type = application/json
            headers: {
                "Content-Type": "application/json"
            },
            // I u body se smešta string reprezentacija objekta koji se šalje
            body: JSON.stringify({ "ime": proizvod.ime, "sifra": proizvod.sifra,
                    "cena": proizvod.cena, "kolicina": proizvod.kolicina })
        }).then(p => {
            if (p.ok) {
                this.dodajProizvod(proizvod);
                const r =proizvod.crtajRed(this.kontejner.querySelector("tbody"));
                this.dodajDeleteDugme(r,proizvod,this.proizvodi.length-1);
            }
        });
            
    }
*/
