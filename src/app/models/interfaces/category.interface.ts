export interface Category{
    id:number;
    name: string;
    parent?: CategoryResponse;
    children: CategoryResponse[];

}

export interface CategoryInputMap{
    name: string;
    parentId?: number;
}


export interface CategoryResponse{
    id: number;
    name: string;
}
