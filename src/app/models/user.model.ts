export interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    enabled: boolean;
    lastPasswordResetDate: Date;
    usertel: string;
    userdate: Date;
    useradresse: string;
    authorities: any;
    disponibilite?: any;
    poste: string;
}
