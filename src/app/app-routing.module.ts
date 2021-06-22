import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryCreateComponent } from "./pages/category/category-create/category-create.component";
import { CategoryViewComponent } from "./pages/category/category-view.component";
import { EntityCreateEditComponent } from "./pages/entity/entity-create-edit/entity-create-edit.component";
import { EntityViewComponent } from "./pages/entity/entity-view.component";
import { HomeViewComponent } from "./pages/home/home.component";
import { PersonCreateEditComponent } from "./pages/person/person-create-edit/person-create-edit.component";
import { ProductCreateEditComponent } from "./pages/product/product-create-edit/product-create-edit.component";


const routes: Routes = [
    { path: 'home', component: HomeViewComponent },
    {path: 'cat', component: CategoryViewComponent},
    {path: 'entity', component: EntityViewComponent},
    {path:'create-entity', component: EntityCreateEditComponent},
    {path:'create-cat', component: CategoryCreateComponent},
    {path:'create-person', component: PersonCreateEditComponent},
    {path:'create-product', component: ProductCreateEditComponent},
    { path: '**', redirectTo: 'home', pathMatch:'full' },
    { path: '', redirectTo: 'home', pathMatch:'full' },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
