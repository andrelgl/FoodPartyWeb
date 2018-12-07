import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { IUser } from '../+core/interfaces/user.interface';
import { IEnterprise } from '../+core/interfaces/enterprise.interface';
import { IMenu } from '../+core/interfaces/menu.interface';
import { AutenticacaoService } from '../+services/autenticacao.service';
import { ModalProdutoComponent } from '../micro-components/modal-produto/modal-produto.component';
import { ListaProdutoComponent } from '../lista-produto/lista-produto.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalProduto') modalProduto: ModalProdutoComponent;

  public usuario: IUser;
  public mdWidth: boolean;
  public active: boolean;
  public tableMode: boolean;

  public user: IUser;
  public enterprise: IEnterprise;
  public menus: IMenu[];

  @HostListener('window:resize', [])
  public onResize() {
    this.mdWidth = window.innerWidth >= 768;
  }


  constructor(
    private _sanitizer: DomSanitizer,
    private autenticacaoService: AutenticacaoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.onResize();
    this.autenticacaoService.usuarioLogado.subscribe(
      usuario => {
        if (usuario != null) {
          this.usuario = usuario;
        }
      });
  }

  public onRouterOutletActivate(event: any) {
    if (event instanceof ListaProdutoComponent) {
      event.onEditarProduto.subscribe((produto) => {
        this.modalProduto.open(produto);
      });
    }
  }

  onRouterOutletDeactivate(event) {
    if (event instanceof ListaProdutoComponent) {
      event.onEditarProduto.unsubscribe();
    }
  }

  modalProdutoConcluido() {
    window.location.reload();
  }
}
