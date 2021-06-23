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
import { ProductViewComponent } from "./pages/product/product-view.component";


const routes: Routes = [
    { path: 'home', component: HomeViewComponent },
    { path: 'entity', component: EntityViewComponent },
    { path: 'entity-create', component: EntityCreateEditComponent },
    { path: 'entity-edit/:id', component: EntityCreateEditComponent },
    { path: 'cat', component: CategoryViewComponent },
    { path: 'cat-create', component: CategoryCreateComponent },
    { path: 'create-person', component: PersonCreateEditComponent },
    { path: 'product', component: ProductViewComponent },
    { path: 'product-create', component: ProductCreateEditComponent },
    { path: 'product-edit/:id', component: ProductCreateEditComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
