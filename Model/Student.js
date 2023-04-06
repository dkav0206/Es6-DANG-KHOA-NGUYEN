import { Person } from "./Person.js";

export class Student extends Person{ 
    constructor(toan, ly, hoa,...restInfo){
        super(...restInfo);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
        this.type = "Student";
        this.dtb = 0
    }

    calDTB = () => { 
        return this.dtb = (Number(this.toan) + Number(this.ly) + Number(this.hoa))/3;
    }
}