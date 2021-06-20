import { Category } from "./category.interface";
import { Entity } from "./entity.interface";
import { Person } from "./person.interface";

export interface Product{
    id?: string;
    name: string;
    creationDate: string;
    deathDate?: string;
    description?: string;
    imageUrl: string;
    wikiUrl: string;
    entityList: Array<Entity>;
    personList: Array<Person>;
    categoryList: Array<Category>;
}