export class Ucenik {
	constructor(id, ime, prezime, username, password, email, brtel) {
		this.id = id;
		this.ime = ime;
		this.prezime = prezime;
		this.username = username;
		this.password = password;
		this.email = email;
		this.brtel = brtel;
	}

	onloadLoginUcenik() {
		let idsesije = sessionStorage.getItem('id');
		console.log(idsesije);
		if (idsesije == 0 || idsesije == null) {
			window.location.href = './zabranjen_pristup';
		}
		//sessionStorage.removeItem('id');

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

				let formControls = document.querySelectorAll('.profile-infoCont ');

				this.ime = formControls[0].value = nizPodataka[1];
				this.prezime = formControls[1].value = nizPodataka[2];
				this.username = formControls[2].value = nizPodataka[3];
				this.password = formControls[3].value = nizPodataka[4];
				this.email = formControls[4].value = nizPodataka[5];
				this.brtel = formControls[5].value = nizPodataka[6];
				document.querySelector('.card-img').src =
					'https://localhost:44393/api/imageupload/' + nizPodataka[3] + '.jpg';

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
}
