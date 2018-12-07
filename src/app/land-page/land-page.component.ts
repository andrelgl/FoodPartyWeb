import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../+services/autenticacao.service';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {
  public check: Observable<boolean>;

  constructor(public registro: AutenticacaoService) { }

  ngOnInit() {
    this.check = this.registro.isLogado;
  }

}
