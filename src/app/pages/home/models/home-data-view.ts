import { Entity } from "src/app/models/interfaces/entity.interface";

export const DATA_ENTITY: Entity[] = [{
    id: '1',
    name: 'Entidad1',
    creationDate: '01/05/2005',
    endDate: '20/01/2010',
    imageUrl: '',
    wikiUrl: '',
    description: 'Esto es una prueba de una entidad',
    persons: [],
    categories: []
}, {
    id: '2',
    name: 'Entidad2',
    creationDate: '14/05/2001',
    description: 'Esto es una prueba de una entidad',
    imageUrl: '',
    wikiUrl: '',
    persons: [],
    categories: []
}, {
    id: '3',
    name: 'Entidad3',
    creationDate: '20/07/1990',
    description: 'Esto es una prueba de una entidad',
    imageUrl: '',
    wikiUrl: '',
    persons: [],
    categories: []
}
];


export const HEADER_LOGIN: any[] = [
    { field: 'email', value: 'Email: ', isInput: true, type: 'text' },
    { field: 'password', value: 'Contraseña: ', isInput: true, type: 'password' }
];

export const HEADER_REGISTER: any[] = [
    { field: 'name', value: 'Nombre', isInput: true, type: 'text' },
    { field: 'surname', value: 'Apellido', isInput: true, type: 'text' },
    { field: 'email', value: 'Email: ', isInput: true, type: 'text' },
    { field: 'password', value: 'Contraseña: ', isInput: true, type: 'password' },
    { field: 'passwordRepeat', value: 'Repita contraseña', isInput: true, type: 'password' }
];