import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
declare var $: any;


@Injectable()
export class ModalLocaisService {
  openModal = new EventEmitter()
  itemChoosed = new EventEmitter()
}

@Component({
  selector: 'app-choise-modal',
  templateUrl: './choise-modal.component.html',
  styleUrls: ['./choise-modal.component.scss']
})
export class ChoiseModalComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() onItemChoose = new EventEmitter();

  constructor(private modalLocaisService: ModalLocaisService) { }

  ngOnInit() {
    this.modalLocaisService.openModal.subscribe(
      items => {
        this.items = items;
        this.open()
      }
    );
  }

  public open() {
    $('#choiceModal').modal('toggle')
  }

  itemChoosed(value) {
    this.onItemChoose.emit(value);
    this.modalLocaisService.itemChoosed.emit(value);
    $('#choiceModal').modal('toggle')
  }

}
