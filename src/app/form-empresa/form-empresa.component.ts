import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EnterpriseService } from '../+services/enterprise.service';
import { GooglePlaceService } from '../+services/google-place.service';
import { FcCheck } from '../+core/utils/fc-check';
import { IEnterprise } from '../+core/interfaces/enterprise.interface';
import { ChoiseModalComponent, ModalLocaisService } from '../micro-components/choise-modal/choise-modal.component';
import { AutenticacaoService } from '../+services/autenticacao.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.scss']
})
export class FormEmpresaComponent implements OnInit {
  _empresa: IEnterprise;
  @Output() formSubmitted = new EventEmitter();
  @Output() formSubmitError = new EventEmitter();
  @Input() set empresa(value: IEnterprise) {
    if (value && value != null) {
      this._empresa = value;
      this.name.setValue(this._empresa.name);
      this.cnpj.setValue(this._empresa.cnpj);
      this.website.setValue(this._empresa.website);
      this.number.setValue(this._empresa.number);
      this.city.setValue(this._empresa.city);
      this.state.setValue(this._empresa.state);
      this.type.setValue(this._empresa.type);
      this.description.setValue(this._empresa.description);
      this.phone.setValue(this._empresa.phone);
       this.country.setValue( this._empresa.country);
       this.zip_code.setValue( this._empresa.zip_code);
      this.street.setValue(this._empresa.street);
       this.neighbourhood.setValue( this._empresa.neighbourhood);
    }
  }
  get empresa(): IEnterprise {
    return this._empresa;
  }

  //@ViewChild('modalPlaces') modalPlaces: ChoiseModalComponent;
  public places = [];

  public form: FormGroup;
  public name: FormControl;
  public cnpj: FormControl;
  public website: FormControl;
  public number: FormControl;
  public city: FormControl;
  public state: FormControl;
  public type: FormControl;
  public description: FormControl;
  public phone: FormControl;
  public country: FormControl;
  public zip_code: FormControl;
  public street: FormControl;
  public neighbourhood: FormControl;

  constructor(private enterpriseService: EnterpriseService,
    private placesApi: GooglePlaceService,
    private fb: FormBuilder,
    private modalLocaisService: ModalLocaisService,
    private auth: AutenticacaoService) {
    this.name = new FormControl(null, [FcCheck.required()]);
    this.cnpj = new FormControl(null, [FcCheck.required()]);
    this.website = new FormControl(null, [FcCheck.required()]);
    this.number = new FormControl(null, [FcCheck.required()]);
    this.city = new FormControl(null, [FcCheck.required()]);
    this.state = new FormControl(null, [FcCheck.required()]);
    this.type = new FormControl(null, [FcCheck.required()]);
    this.description = new FormControl(null, [FcCheck.required()]);
    this.phone = new FormControl(null, [FcCheck.required()]);
    this.country = new FormControl(null, [FcCheck.required()]);
    this.zip_code = new FormControl(null, [FcCheck.required()]);
    this.street = new FormControl(null, [FcCheck.required()]);
    this.neighbourhood = new FormControl(null, [FcCheck.required()]);
  }

  ngOnInit() {

    this.modalLocaisService.itemChoosed.subscribe(
      item => this.placeChoosed(item)
    );

    this.form = this.fb.group({
      name: this.name,
      cnpj: this.cnpj,
      website: this.website,
      number: this.number,
      city: this.city,
      state: this.state,
      type: this.type,
      description: this.description,
      phone: this.phone,
      country: this.country,
      zip_code: this.zip_code,
      street: this.street,
      neighbourhood: this.neighbourhood,
      image_base64: new FormControl('')
    });
  }

  // achar erros
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
        image_base64: myReader.result // base64
      });
    };
    myReader.readAsDataURL(file);
  }

  public submit(value: IEnterprise) {
    this.placesApi.getPlaces(value.name, value.number, value.city, value.state).subscribe(
      res => {
        this.places = res;
        this.modalLocaisService.openModal.emit(this.places);
      },
      err => {
        console.log(err);
        this.formSubmitError.emit(err);
      }
    );
  }

  placeChoosed(place) {

    this.auth.usuarioLogado.subscribe(
      user => {
        const value = this.form.value; // as IEnterprise;
        value.latitude = place.latitude;
        value.longitude = place.longitude;
        value.google_places_id = place.google_places_id;
        value.place_id = value.place_id;
        value.user = user.id;
        if (this._empresa == null) {
          this.enterpriseService.post(value).subscribe(
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
          this.auth.usuarioLogado.subscribe(
            usuario => {
              if (usuario != null) {
                value.user_id = usuario.id;
                this.enterpriseService.put(this._empresa.id, value).subscribe(
                  res => {
                    alert('Cadastrado');
                    this.formSubmitted.emit();
                  },
                  err => {
                    console.log(err);
                    this.formSubmitError.emit(err);
                  });
              }
            });
        }
      });

  }

}
