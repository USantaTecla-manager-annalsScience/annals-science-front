import { Category } from "./category.interface";
import { Entity } from "./entity.interface";
import { Person } from "./person.interface";

export interface Product{
    id?: string;
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    imageUrl?: string;
    wikiUrl?: string;
    persons?: Array<Person>;
    categories?: Array<Category>;
    entities?: Array<Entity>;
}

export interface ProductInputMap{
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    imageUrl?: string;
    wikiUrl?: string;
    personsId?: Array<number>;
    categoriesId?: Array<number>;
    entitiesId?: Array<number>;
}
