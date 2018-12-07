import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToasterModule, ToasterService } from 'angular2-toaster';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader-interceptor.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandPageComponent } from './land-page/land-page.component';
import { SobreComponent } from './sobre/sobre.component';
import { ErrorComponent } from './error/error.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { DashboardComponent } from './dashboard/dashboard.component';


// micro components
import { NavBarComponent } from './micro-components/nav-bar/nav-bar.component';
import { FooterComponent } from './micro-components/footer/footer.component';

// services
import { AutenticacaoService } from './+services/autenticacao.service';
import { GooglePlaceService } from './+services/google-place.service';
import { ProdutoService } from './+services/produto.service';
import { ChoiseModalComponent, ModalLocaisService } from './micro-components/choise-modal/choise-modal.component';
import { AuthGuard } from './+services/auth.guard.service';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';
import { ModalProdutoComponent } from './micro-components/modal-produto/modal-produto.component';
import { LoaderComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandPageComponent,
    SobreComponent,
    ErrorComponent,
    FooterComponent,
    EmpresasComponent,
    DashboardComponent,
    ChoiseModalComponent,
    CadastroProdutoComponent,
    PerfilEmpresaComponent,
    ListaProdutoComponent,
    FormEmpresaComponent,
    ModalProdutoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
  ],
  providers: [
    ToasterService,
    AutenticacaoService,
    GooglePlaceService,
    ProdutoService,
    AuthGuard,
    ModalLocaisService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
