import { Category } from "./category.interface";

export interface Person{
    id?: number;
    name: string;
    surname?: string;
    birthDate?: string;
    deathDate?: string;
    description?: string;
    imageUrl?: string;
    wikiUrl?: string;
    categories?: Array<Category>;
}

export interface PersonInputMap{
    name: string;
    surname?: string;
    birthDate?: string;
    deathDate?: string;
    description?: string;
    imageUrl?: string;
    wikiUrl?: string;
    categoriesId?: Array<number>;
}
