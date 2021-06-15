import { Category } from "./category.interface";
import { Entity } from "./entity.interface";
import { Person } from "./person.interface";

export interface Product{
    id?: string;
    name: string;
    creationDate: string;
    endDate?: string;
    description?: string;
    urlImage: string;
    urlWiki: string;
    entityList: Array<Entity>;
    personList: Array<Person>;
    categoryList: Array<Category>;
}