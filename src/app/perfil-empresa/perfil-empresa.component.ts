import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../+services/usuario.service';
import { AutenticacaoService } from '../+services/autenticacao.service';
import { IEnterprise } from '../+core/interfaces/enterprise.interface';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {
  empresaAtual: IEnterprise;

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.autenticacaoService.usuarioLogado.subscribe(
      res => {
        if (res != null) {
          this.empresaAtual = res.data;
        }
      }
    );
  }

  public submited() {

  }

  public errorSubmited(error) {

  }
}
