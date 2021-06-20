export interface Category{
    id:number;
    name: string;
    parentId?: number;
}

export interface categoryInputMap{
    name: string;
    parentId?: number;
}

export interface categoryOutpuMap{
    id: number;
    name: string;
    parent: string;
    children: any[]
}