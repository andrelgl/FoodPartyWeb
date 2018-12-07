import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

items = [
  {
    'name' : 'Casa da mãe Joanas',
    'number' : '1398',
    'street' : 'Rua Rio das Velhas',
    'city' : 'Santa Luzia',
    'state' : 'MG'
  },
  {
    'name' : 'Casa da mãe Joanas',
    'number' : '1398',
    'street' : 'Rua Rio das Velhas',
    'city' : 'Santa Luzia',
    'state' : 'MG'
  },
  {
    'name' : 'Casa da mãe Joanas',
    'number' : '1398',
    'street' : 'Rua Rio das Velhas',
    'city' : 'Santa Luzia',
    'state' : 'MG'
  }
];

  constructor() { }

  ngOnInit() {
  }

}
