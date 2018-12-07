import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProdutoService } from '../+services/produto.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FcCheck } from '../+core/utils/fc-check';
import { AutenticacaoService } from '../+services/autenticacao.service';
import { Produto } from '../+core/interfaces/produto.interface';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
  private _produto: Produto
  @Input() set produto(value: Produto) {
    if (value && value != null) {
      this._produto = value;
      this.name.setValue(value.name);
      this.description.setValue(value.description);
      this.group_limit.setValue(value.group_limit);
      this.price.setValue(value.price);
      this.promo_code.setValue(value.promo_code);
    }
  }
  get produto(): Produto {
    return this._produto;
  }
  @Output() formSubmitted = new EventEmitter();
  @Output() formSubmitError = new EventEmitter();

  public form: FormGroup;
  public name: FormControl;
  public description: FormControl;
  public group_limit: FormControl;
  public price: FormControl;
  public promo_code: FormControl;
  public cover: FormControl;

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.name = new FormControl(null, [FcCheck.required()]);
    this.description = new FormControl(null, [FcCheck.required()]);
    this.group_limit = new FormControl(null, [FcCheck.required()]);
    this.price = new FormControl(null, [FcCheck.required()]);
    this.promo_code = new FormControl(null, [FcCheck.required()]);
    this.cover = new FormControl('');

    this.form = this.fb.group({
      name: this.name,
      description: this.description,
      group_limit: this.group_limit,
      price: this.price,
      promo_code: this.promo_code,
      cover: this.cover
    });
  }

  public getErrors(...controls: FormControl[]) {
    try {
      return controls
        .filter(f => !!f.errors && (!f.pristine || !!f.parent['submitted']))
        .map(m => m.errors === null ? [] : Object.values(m.errors))
        .reduce(r => [].concat(r, []));
    } catch (e) {
      return [];
    }
  }

  onFileChange($event) {
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.form.patchValue({
        cover: myReader.result // base64
      });
    };
    myReader.readAsDataURL(file);
  }

  public submit(value) {
    this.autenticacaoService.usuarioLogado.subscribe(
      usuario => {
        value.enterprise = usuario.data.id;
        if (this._produto == null) {
          this.produtoService.post(value.enterprise, value).subscribe(
            res => {
              alert('Cadastrado');
              this.formSubmitted.emit();
            },
            err => {
              console.log(err);
              this.formSubmitError.emit(err);
            }
          );
        } else {
          this.produtoService.put(this._produto.id, value.enterprise, value).subscribe(
            res => {
              alert('Cadastrado');
              this.formSubmitted.emit();
            },
            err => {
              console.log(err);
              this.formSubmitError.emit(err);
            }
          );
        }
      });
  }

}
