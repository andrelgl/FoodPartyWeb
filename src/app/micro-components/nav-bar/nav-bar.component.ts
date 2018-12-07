import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { FcCheck } from '../../+core/utils/fc-check';
import { AutenticacaoService } from '../../+services/autenticacao.service';
import { IUser } from '../../+core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { IResponseError } from 'src/app/+core/interfaces/response-error.interface';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/+services/usuario.service';

declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title = 'Food Party';

  public form: FormGroup;
  public loginForm: FormGroup;
  public email: FormControl;
  public password1: FormControl;
  public password2: FormControl;
  public check: Observable<boolean>;
  emailLogin: FormControl;
  passwordLogin: FormControl;

  constructor(
    private fb: FormBuilder,
    public registro: AutenticacaoService,
    public usuarioService: UsuarioService,
    private toast: ToasterService,
    private router: Router
  ) {
    this.formBuild();
  }

  //validador de login
  ngOnInit() {
    this.check = this.registro.isLogado;
    this.registro.logCheck();
  }

  //testar requerimento
  private formBuild(): void {

    this.email = new FormControl(null, [FcCheck.required(), FcCheck.email()]);
    this.password1 = new FormControl(null, [FcCheck.required()]);
    this.password2 = new FormControl(null, [FcCheck.required(), FcCheck.match('password1', ['Senha', 'Confirme a Senha'])]);

    this.form = this.fb.group({
      email: this.email,
      password1: this.password1,
      password2: this.password2
    })

    this.emailLogin = new FormControl(null, [FcCheck.required(), FcCheck.email()]);
    this.passwordLogin = new FormControl(null, [FcCheck.required()]);

    this.loginForm = this.fb.group({
      emailLogin: this.emailLogin,
      passwordLogin: this.passwordLogin,
    })
  }

  //achar erros
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

  //fazer sumit
  public submit(value: IUser) {
    this.registro.submit(value).subscribe(
      res => {
        this.router.navigateByUrl('/lo/empresa');
      },
      (err: IResponseError) => {
        if (err.status === 400) {
          this.toast.pop('error', err.error['message']);
        } else if (err.status === 409) {
          this.toast.pop('error', 'O email informado já existe.');
        } else if (err.status >= 500) {
          this.toast.pop('error', 'Houve um erro de comunicação com o servidor. Por favor tente novamente mais tarde.');
        } else {
          this.toast.pop('error', 'Ocorreu um erro não identificado. Tente novamente mais tarde.')
        }
      });;
    $('#ModalCadastro').modal('toggle')
  }

  public login(value: any) {
    this.registro.login({ email: value.emailLogin, password: value.passwordLogin }).subscribe(
      res => {
        $('#ModalLogin').modal('toggle')
        this.router.navigateByUrl(this.usuarioService.isRegistroCompleto ? 'lo/dashboard' : '/lo/empresa');
      },
      err => alert("Usuário ou senha inválidos")
    );
  }

  //faz logout
  public logout() {
    this.registro.logout();
  }
}
