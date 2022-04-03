export class Admin {
	constructor(id, ime, prezime, username /*password*/) {
		this.id = id;
		this.ime = ime;
		this.prezime = prezime;
		this.username = username;
		this.password;
	}

	prikaziAdmina() {
		//iscrtavanje podataka o adminu zavisi od toga kako cemo
		//implementirati tabelu
	}
}
