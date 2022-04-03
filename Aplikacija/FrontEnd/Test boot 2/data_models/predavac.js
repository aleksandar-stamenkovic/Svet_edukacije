import { Predmet } from './predmet.js';
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

	dodajNoviPredmet() {}
}
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
