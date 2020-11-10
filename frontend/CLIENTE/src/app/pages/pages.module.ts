import { AuthService } from './../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";


import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { FooterBarComponent } from './page-parts/footer-bar/footer-bar.component';
import { NavBarComponent } from './page-parts/nav-bar/nav-bar.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { VerProductoComponent } from './productos/ver-producto/ver-producto.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { LoginComponent } from './admin/login/login.component';
import { CrearCategoriaComponent } from './admin/crear-categoria/crear-categoria.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { DenunciasComponent } from './admin/denuncias/denuncias.component';
import { AdminNavComponent } from './page-parts/admin-nav/admin-nav.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    FooterBarComponent,
    NavBarComponent,
    CrearProductoComponent,
    VerProductoComponent,
    PerfilComponent,
    LoginComponent,
    CrearCategoriaComponent,
    ReportesComponent,
    DenunciasComponent,
    AdminNavComponent,

  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    CrearProductoComponent,
    VerProductoComponent
  ],
  providers: [AuthService]
})
export class PagesModule {}
