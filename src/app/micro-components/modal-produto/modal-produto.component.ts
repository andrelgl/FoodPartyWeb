import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Produto } from 'src/app/+core/interfaces/produto.interface';
declare var $: any;

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent implements OnInit {
  @Output() onDone = new EventEmitter()
  produto: Produto;

  constructor() { }

  ngOnInit() {
  }

  public open(produto: Produto) {
    this.produto = produto;
    $('#modalProduto').modal('toggle')
  }

  submited() {
    this.onDone.emit()
    $('#modalProduto').modal('toggle')
  }

}
