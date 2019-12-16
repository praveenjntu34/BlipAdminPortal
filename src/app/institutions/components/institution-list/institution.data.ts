import { on } from 'cluster';

export class Institutions {

    public name:string;
    public online_status: string;
    public address: string;
    public logo: string;
    public students_count: number
    constructor(name:string,online_status:string, address: string, logo:string, students_count:number){
        this.name = name;
        this.online_status = online_status;
        this.address = address;
        this.logo = logo;
        this.students_count = students_count;
    }
}

