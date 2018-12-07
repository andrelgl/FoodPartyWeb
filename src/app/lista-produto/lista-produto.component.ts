import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Produto } from '../+core/interfaces/produto.interface';
import { AutenticacaoService } from '../+services/autenticacao.service';
import { ProdutoService } from '../+services/produto.service';
import { ModalProdutoComponent } from '../micro-components/modal-produto/modal-produto.component';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss']
})
export class ListaProdutoComponent implements OnInit {
  @Output() onEditarProduto = new EventEmitter()
  produtosList: Array<Produto> = [];

  constructor(private autenticacaoService: AutenticacaoService,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.autenticacaoService.usuarioLogado.subscribe(
      usuario => {
        if (usuario != null) {
          this.produtoService.getAll(usuario.data.id).subscribe(
            (res: any) => this.produtosList = res.results as Array<Produto>
          );
        }
      }
    )
  }

  openModal(produto: Produto){
    this.onEditarProduto.emit(produto);
  }

}
