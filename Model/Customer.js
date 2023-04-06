import { Person } from "./Person.js";

export class Customer extends Person{ 
    constructor(company, receipt,rating , ...restInfo){
        super(...restInfo);
        this.company = company;
        this.receipt = receipt;
        this.rating = rating;
        this.type = "Customer";
    }
}