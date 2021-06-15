import { Category } from "./category.interface";

export interface Person{
    id?: string;
    name: string;
    surname: string;
    birthDate?: string;
    deadthDate?: string;
    description?: string;
    urlImage: string;
    urlWiki: string;
    categoryList: Array<Category>;
}