import { Category } from "./category.interface";
import { Person } from "./person.interface";
import { Product } from "./product.interface";

export interface Entity{
    id?: string;
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    imageUrl: string;
    wikiUrl: string;
    personsId : Array<Person>;
    categoriesId: Array<Category>;
}

export interface EntityInputMap{
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    imageUrl?: string;
    wikiUrl?: string;
    personsId? : Array<number>;
    categoriesId?: Array<number>;
}