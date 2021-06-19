import { Category } from "./category.interface";
import { Person } from "./person.interface";
import { Product } from "./product.interface";

export interface Entity{
    id?: string;
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    urlImage: string;
    urlWiki: string;
    personList : Array<Person>;
    categoryList: Array<Category>;
}