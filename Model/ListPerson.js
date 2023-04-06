export class ListPerson { 
    constructor(){
        this.ListPerson = [];
    }

    addPerson = (person) => {
        this.ListPerson.push(person);
    }

    findIndexSV = (inpuId) => {
        let indexFind = -1;
        indexFind = this.ListPerson.findIndex ((person) => {
            return person.id == inpuId;
        })
        return indexFind;
    }

    deleteUser = (inputId) => { 
        let index = this.findIndexSV(inputId);
        if (index != -1) {
            this.ListPerson.splice(index, 1);
        }
    }

    
    updateUser = (user) => {
        var index = this.findIndexSV(user.id);
        if (index != -1) {
            this.ListPerson[index] = user;
        }
    }


    searchName = () => {
        let altArray = [];
        this.ListPerson.map((person) => {
            altArray.push(person);
            
        })
        return altArray;

    }
    

}
