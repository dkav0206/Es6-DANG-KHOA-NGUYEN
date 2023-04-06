import { Person } from "./Person.js";

export class Employee extends Person{ 
    constructor(dayWork, daySalary, ...restInfo){
        super(...restInfo);
        this.dayWork = dayWork;
        this.daySalary = daySalary;
        this.type = "Employee";
        this.totalSalary = 0;
    }

    calSalary = () => { 
        return this.totalSalary = Number(this.daySalary) * Number(this.dayWork);
    }
}