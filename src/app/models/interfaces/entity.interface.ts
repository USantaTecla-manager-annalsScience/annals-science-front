import { Category, CategoryOutpuMap } from "./category.interface";
import { Person, PersonOutputMap } from "./person.interface";
import { Product } from "./product.interface";

export interface Entity{
    id?: string;
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    imageUrl: string;
    wikiUrl: string;
    persons : Array<Person>;
    categories: Array<Category>;
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

export interface EntityOutPutMap{
    id: string;
    name: string;
    creationDate: string;
    endDate: string;
    description: string;
    imageUrl: string;
    wikiUrl: string;
    persons : Array<PersonOutputMap>;
    categories: Array<CategoryOutpuMap>;
    isEntity?: boolean;
}