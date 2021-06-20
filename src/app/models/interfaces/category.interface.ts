export interface Category{
    id:number;
    name: string;
    parentId?: number;
}

export interface categoryInputMap{
    name: string;
    parentId?: number;
}