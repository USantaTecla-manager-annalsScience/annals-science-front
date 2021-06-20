import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryCreateEditComponent } from "./pages/category/category-create-edit/category-create-edit.component";
import { EntityCreateEditComponent } from "./pages/entity/entity-create-edit/entity-create-edit.component";
import { HomeViewComponent } from "./pages/home/home.component";
import { PersonCreateEditComponent } from "./pages/person/person-create-edit/person-create-edit.component";


const routes: Routes = [
    { path: 'home', component: HomeViewComponent },
    {path:'create-entity', component: EntityCreateEditComponent},
    {path:'create-cat', component: CategoryCreateEditComponent},
    {path:'create-person', component: PersonCreateEditComponent},
    {path:'**', component: HomeViewComponent}
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}