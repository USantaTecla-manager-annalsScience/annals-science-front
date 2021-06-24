import { Category } from "./category.interface";
import { Person } from "./person.interface";

export interface Entity{
    id?: string;
    name: string;
    creationDate?: string;
    endDate?: string;
    description?: string;
    imageUrl?: string;
    wikiUrl?: string;
    persons? : Array<Person>;
    categories?: Array<Category>;
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
