import { Predmet } from './predmet.js';
import { Predavac } from './predavac.js';
import { Ucenik } from './ucenik.js';
import { Admin } from './admin.js';

function preuzmiUcenike() {
	fetch('https://localhost:5001/Kontroler/PreuzmiUcenike', {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			data.forEach((d) => {
				const ucenik = new Ucenik(d['id'], d['ime'], d['prezime'], d['username'], d['brtel']);

				ucenik.prikaziUcenika();
			});
		})
	);
}

function preuzmiAdmine() {
	fetch('https://localhost:5001/Kontroler/PreuzmiAdmine', {
		method: 'GET'
	}).then((p) =>
		p.json().then((data) => {
			data.forEach((d) => {
				const admin = new Admin(d['id'], d['ime'], d['prezime'], d['username'], d['brtel']);

				admin.prikaziAdmina();
			});
		})
	);
}

function preuzmiPredavace() {
	//potrebno je preuzeti predavace i za svakog predavaca
	//preuzeti sve predmete koje je predaje
}
