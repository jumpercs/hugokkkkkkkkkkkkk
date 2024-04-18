import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RastreamentoComponent } from './views/rastreamento/rastreamento.component';
import { AboutUsComponentComponent } from './views/home/components/about-us-component/about-us-component.component';
import { ContactComponentComponent } from './views/home/components/contact-component/contact-component.component';
import { ServiceComponentComponent } from './views/home/components/service-component/service-component.component';
import { AuthGuard } from './core/controllers/guards/auth.guard';
import { GerenciarServicosComponent } from './views/gerenciar-servicos/gerenciar-servicos.component';
import { ServiceFormComponent } from './views/home/components/service-form/service-form.component';
import { VisualizacaoDadosFormularioComponent } from './views/visualizacao-dados-formulario/visualizacao-dados-formulario.component';
import { GerenciarParceirosComponent } from './views/gerenciar-parceiros/gerenciar-parceiros.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', component: , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'formularios', component: RastreamentoComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-formularios', component: VisualizacaoDadosFormularioComponent, canActivate: [AuthGuard] },
  { path: 'quem-somos', component: AboutUsComponentComponent },
  { path: 'servicos', component: ServiceComponentComponent },
  { path: 'gerenciar-servicos', component: GerenciarServicosComponent, canActivate: [AuthGuard] },
  { path: 'gerenciar-parceiros', component: GerenciarParceirosComponent, canActivate: [AuthGuard] },
  { path: 'service-form', component: ServiceFormComponent },
  { path: 'rastreamento', component: RastreamentoComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
