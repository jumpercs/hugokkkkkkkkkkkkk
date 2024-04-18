import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// http 
import { HttpClientModule } from '@angular/common/http';

// jwt 
import { JwtHelperService } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponentComponent } from './views/home/components/header-component/header-component.component';
import { BannerHeroComponentComponent } from './views/home/components/banner-hero-component/banner-hero-component.component';
import { AboutUsComponentComponent } from './views/home/components/about-us-component/about-us-component.component';
import { ServiceComponentComponent } from './views/home/components/service-component/service-component.component';
import { BannerComponentComponent } from './views/home/components/banner-component/banner-component.component';
import { ContactComponentComponent } from './views/home/components/contact-component/contact-component.component';
import { FooterComponentComponent } from './views/home/components/footer-component/footer-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RastreamentoComponent } from './views/rastreamento/rastreamento.component';
import { ChatbotComponent } from './views/home/components/chatbot/chatbot.component';
import { GerenciarServicosComponent } from './views/gerenciar-servicos/gerenciar-servicos.component';
import { HeaderSecondaryComponent } from './views/home/components/header-secondary/header-secondary.component';
import { ServiceFormComponent } from './views/home/components/service-form/service-form.component';
import { VisualizacaoDadosFormularioComponent } from './views/visualizacao-dados-formulario/visualizacao-dados-formulario.component';
import { GerenciarParceirosComponent } from './views/gerenciar-parceiros/gerenciar-parceiros.component';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [
    HeaderComponentComponent,
    AppComponent,
    BannerHeroComponentComponent,
    AboutUsComponentComponent,
    ServiceComponentComponent,
    BannerComponentComponent,
    ContactComponentComponent,
    FooterComponentComponent,
    HomeComponent,
    LoginComponent,
    RastreamentoComponent,
    ChatbotComponent,
    GerenciarServicosComponent,
    HeaderSecondaryComponent,
    ServiceFormComponent,
    VisualizacaoDadosFormularioComponent,
    GerenciarParceirosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MultiSelectModule
  ],

  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
