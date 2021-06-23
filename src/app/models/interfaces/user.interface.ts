
export interface User{
    name?: string;
    surname?: string;
    email: string;
    password: string;
    passwordRepeat?: string;
}

export interface UserInput{
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserLoginInput{
    email: string;
    password: string;
}

