import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public submited() {
    this.router.navigateByUrl('lo/dashboard');
  }

  public errorSubmited(error) {

  }

}
