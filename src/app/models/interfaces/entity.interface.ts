import { Category } from "./category.interface";
import { Product } from "./product.interface";

export interface Entity{
    id?: string;
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    urlImage: string;
    urlWiki: string;
    productList : Array<Product>;
    tagList: Array<Category>;
}