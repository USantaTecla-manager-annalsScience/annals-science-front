import { Category } from "./category.interface";
import { Person } from "./person.interface";
import { Product } from "./product.interface";

export interface Entity{
    id?: string;
    name: string;
    creationDate?: string;
    deathDate?: string;
    description?: string;
    imageUrl: string;
    wikiUrl: string;
    personList : Array<Person>;
    categoryList: Array<Category>;
}