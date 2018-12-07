import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  date: Date;

  constructor() { }
 
  ngOnInit() {
    this.getYear();
  }

  getYear(): number {
    let date = new Date();
    let year: number = date.getFullYear();
    return year;
  }

  public equipe: any[] = [
    { img: "http://via.placeholder.com/350x350", title: "André", github: "" },
    { img: "http://via.placeholder.com/350x350", title: "Luan", github: "" },
    { img: "http://via.placeholder.com/350x350", title: "Marcos", github: "" },
    { img: "http://via.placeholder.com/350x350", title: "Rafael", github: "" },
    { img: "http://via.placeholder.com/350x350", title: "Wender", github: "" },
    { img: "http://via.placeholder.com/350x350", title: "Felipe", github: "" },
  ]
  public tecnologia: any[] = [
    { img: "../../../assets/imgs/logos/angular-logo.png", title: "Angular", site: "https://angular.io/" },
    { img: "../../../assets/imgs/logos/python-logo.png", title: "Python-3.6", site: "https://www.python.org/" },
    { img: "../../../assets/imgs/logos/bootstrap-4-logo.png", title: "Bootstrap", site: "https://getbootstrap.com/" },
    { img: "../../../assets/imgs/logos/django-logo.png", title: "Django", site: "https://www.djangoproject.com/" },
    { img: "../../../assets/imgs/logos/postgresql-logo.png", title: "PostgreSQL", site: "https://www.postgresql.org/" },
    { img: "../../../assets/imgs/logos/nodejs-logo.png", title: "NodeJS", site: "https://nodejs.org/en/" },
  ]

}
