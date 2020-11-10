import { LoginComponent } from './pages/admin/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { CrearProductoComponent } from './pages/productos/crear-producto/crear-producto.component';
import { VerProductoComponent } from './pages/productos/ver-producto/ver-producto.component';
import { CrearCategoriaComponent } from './pages/admin/crear-categoria/crear-categoria.component';

const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "home", component: IndexComponent ,canActivate: [AuthGuard]},
  { path: "profile", component: ProfilepageComponent, canActivate: [AuthGuard]},
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "ver-producto", component: VerProductoComponent, canActivate: [AuthGuard]},
  { path: "crear-producto", component: CrearProductoComponent, canActivate: [AuthGuard]},
  { path: "admin/login", component: LoginComponent},
  { path: "admin/crear-categoria", component: CrearCategoriaComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
