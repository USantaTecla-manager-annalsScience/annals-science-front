export interface Category{
    id:number;
    name: string;
    parent?: Category[];
}

export interface CategoryInputMap{
    name: string;
    parentId?: number;
}

export interface CategoryOutpuMap{
    id: number;
    name: string;
    parent: Category;
    children: Category[]
    isCat?: boolean;
}
