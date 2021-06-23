// {
//     "timestamp": "2021-06-20T12:40:06.945+00:00",
//     "status": 401,
//     "error": "Unauthorized",
//     "path": "/users/login"
// }

export interface GenericResponse {
    timestamp:string;
    status: string;
    error: string;
    path: string;
}
