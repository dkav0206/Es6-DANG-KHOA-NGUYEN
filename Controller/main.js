import {Customer} from "../Model/Customer.js";
import {Employee} from "../Model/Employee.js";
import {Student} from "../Model/Student.js";
import {ListPerson} from "../Model/ListPerson.js";
import {Validation} from "./Validation.js";
const listPerson = new ListPerson(); 
const validation = new Validation();

const getType = (user) => {
    const types = {};
    for (let item of user){
        types[item.type] = true;
    }
    const rs = Object.keys(types) ;
    return ['all', ...rs]; 

}

let type = 'all';


const renderType = (user) => {
    const types = getType(user);
    const domType = document.getElementById('category-tab')


    const html = types.map((item) => {
        return `
             <li onclick="setCategory('${item}')" class="nav-item mx-2" role="presentation">
                <button style="text-transform: capitalize" class="nav-link ${item == 'all' ? 'active' : ''}"
                        data-bs-target="#category-home"
                        data-bs-toggle="pill" id="category-home-tab" type="button">${item}
                </button>
            </li>
        `
    }).join(''); // join la method cua array: bien array -> string
    // hien tai dang array;
    domType.innerHTML = html;// mong muon la string
}


renderType(listPerson.ListPerson);

const getListFoodByType = (menu, typeCategory) => {
    const newMenu = menu.filter((item) => {
        if (typeCategory === 'all') return true;

        return item.type == typeCategory;
    })

    return newMenu
};

const setCategory = (typed) => {
    type = typed;

    showTable(listPerson.ListPerson);
};

window.setCategory = setCategory;


const showTable = (arrayData) => { 
    renderType(listPerson.ListPerson);
    const listFoodType = getListFoodByType(arrayData, type);
    const html = listFoodType.map((object) => {
        const {id, name, address, type, email} = object;
        return `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${type}</td>
            <td>
                <button onclick="deleteUser('${id}')"   class="btn btn-danger"  >Xóa</button>
                <button data-toggle="modal" data-target="#myModal" onclick="showUserDetail('${id}')" class="btn btn-info" >Xem</button>
            </td>
        </tr>`

    }).join('');

    document.querySelector("#tableDanhSach").innerHTML = html;
}

window.showTable = showTable;



























function setLocalStorage(mang) {
    localStorage.setItem("DSDT", JSON.stringify(mang));

}

function getLocalStorage() {
    if (localStorage.getItem("DSDT") != null) {
        listPerson.ListPerson = JSON.parse(localStorage.getItem("DSDT"));
        showTable(listPerson.ListPerson);
    }


}
getLocalStorage();//gọi khi load trang


const addUser = () => { 
    let id = document.querySelector("#maID").value;
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let address = document.querySelector("#address").value;
    let newUser;
    let type = document.querySelector("#type").value;

    let isValid = true;
    isValid &= validation.checkEmpty(id, "tbID", "ID không để trống!") && validation.checkID(id, "tbID", "Mã không được trùng", listPerson.ListPerson);;
    isValid &= validation.checkEmpty(name, "tbName", "Họ và tên không để trống!");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không để trống!");
    isValid &= validation.checkEmpty(address, "tbAddress", "Địa chỉ không để trống!");
    isValid &= validation.checkSelect("type", "tbType", "Đối tượng không hợp lệ");

    if (type === "Customer"){
        let company = document.querySelector("#company").value;
        let receipt = document.querySelector("#receipt").value;
        let rating = document.querySelector("#Rating").value;

        isValid &= validation.checkEmpty(company, "tbCompany", "Tên công ty không để trống!");
        isValid &= validation.checkEmpty(receipt, "tbReceipt", "Hóa đơn không để trống!");
        isValid &= validation.checkEmpty(rating, "tbRating", "Đánh giá không để trống!") && validation.checkRate(rating, "tbRating", "Đánh giá phải từ 0 đến 5");

        newUser = new Customer(company, receipt, rating, id, name, address, email);

    }else if (type === "Employee"){
        let dayWork = document.querySelector("#dayWork").value;
        let daySalary = document.querySelector("#daySalary").value;

        isValid &= validation.checkEmpty(dayWork, "tbDayWork", "Ngày làm không để trống!") && validation.checkNumber(dayWork, "tbDayWork", "Phải lớn hơn 0");
        isValid &= validation.checkEmpty(daySalary, "tbDaySalary", "Ngày lương không để trống!") && validation.checkNumber(daySalary, "tbDaySalary","Phải lớn hơn 0");
        newUser = new Employee(dayWork, daySalary, id, name, address, email);
        newUser.calSalary();

    }else if (type === "Student"){
        let toan = document.querySelector("#toan").value;
        let ly = document.querySelector("#ly").value;
        let hoa = document.querySelector("#hoa").value;
        isValid &= validation.checkEmpty(toan, "tbToan", "Điểm không để trống!") && validation.checkScore(toan, "tbToan", "Phải lớn hơn 0 dưới 10");
        isValid &= validation.checkEmpty(ly, "tbLy", "Điểm không để trống!") && validation.checkScore(ly, "tbLy","Phải lớn hơn 0 dưới 10");
        isValid &= validation.checkEmpty(hoa, "tbHoa", "Điểm không để trống!") && validation.checkScore(hoa, "tbHoa","Phải lớn hơn 0 dưới 10");
        newUser = new Student(toan, ly, hoa, id, name, address, email);
        newUser.calDTB();
    }

    if (isValid){        
        listPerson.addPerson(newUser);
        showTable(listPerson.ListPerson);
        setLocalStorage(listPerson.ListPerson);
        $('#myModal').modal('hide');
        renderType(listPerson.ListPerson);
        alert("thêm thành công");
    }

}

window.addUser = addUser;

document.querySelector("#btnThem").addEventListener("click", () => {
    document.querySelector("#myModal .modal-footer").innerHTML = `
    <button class="btn btn-success" onClick="addUser()">Tạo đối tượng</button>
    <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal" >Đóng</button>
    `;
    document.querySelector("#formProduct").reset();
    document.getElementById("maID").disabled = false;
    document.getElementById("type").disabled = false;
    generateType();
    document.getElementById("result").innerHTML = "";
});

const generateType = () => {
    let type = document.querySelector("#type").value;
    let content = (type === "Customer") ? `
    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="text" name="company" id="company" class="form-control input-sm"
                placeholder="Công ty">
        </div>
        <span class="sp-thongbao" id="tbCompany"></span>
    </div>

    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="text" name="receipt" id="receipt" class="form-control input-sm"
                placeholder="Hóa đơn">
        </div>
        <span class="sp-thongbao" id="tbReceipt"></span>
    </div>

    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="text" name="Rating" id="Rating" class="form-control input-sm"
                placeholder="Đánh giá">
        </div>
        <span class="sp-thongbao" id="tbRating"></span>
    </div>
    `
    : (type === "Student") ? 
    `
    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="number" name="toan" id="toan" class="form-control input-sm"
                placeholder="Toán">
        </div>
        <span class="sp-thongbao" id="tbToan"></span>
    </div>

    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="text" name="ly" id="ly" class="form-control input-sm"
                placeholder="Lý">
        </div>
        <span class="sp-thongbao" id="tbLy"></span>
    </div>

    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="text" name="hoa" id="hoa" class="form-control input-sm"
                placeholder="Hóa">
        </div>
        <span class="sp-thongbao" id="tbHoa"></span>
    </div>
    `
    :(type === "Employee")?
    `
    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="number" name="dayWork" id="dayWork" class="form-control input-sm"
                placeholder="Số ngày làm việc">
        </div>
        <span class="sp-thongbao" id="tbDayWork"></span>
    </div>

    <div class="form-group">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="text" name="daySalary" id="daySalary" class="form-control input-sm"
                placeholder="Lương theo ngày">
        </div>
        <span class="sp-thongbao" id="tbDaySalary"></span>
    </div>
    `:"";
    document.querySelector("#formType").innerHTML = content;
}

document.querySelector("#type").onchange = () => {
    generateType();
}


const deleteUser = (id) => {
    listPerson.deleteUser(id);
    showTable(listPerson.ListPerson);
    setLocalStorage(listPerson.ListPerson);
    getLocalStorage()
    alert("xóa thành công");
    renderType(listPerson.ListPerson);
}
window.deleteUser = deleteUser;


const showUserDetail = (id) => {

    var index = listPerson.findIndexSV(id);
    if (index != -1) {        
        document.getElementById("maID").value = listPerson.ListPerson[index].id;
        document.getElementById("maID").disabled = true;
        document.getElementById("name").value = listPerson.ListPerson[index].name;
        document.getElementById("address").value = listPerson.ListPerson[index].address;
        document.getElementById("email").value = listPerson.ListPerson[index].email;
        document.getElementById("type").value = listPerson.ListPerson[index].type;
        document.getElementById("type").disabled = true;
        generateType();
        if (listPerson.ListPerson[index].type === "Customer"){
            console.log("sadasd")
            document.getElementById("company").value = listPerson.ListPerson[index].company;
            document.getElementById("receipt").value = listPerson.ListPerson[index].receipt;
            document.getElementById("Rating").value = listPerson.ListPerson[index].rating;
            document.getElementById("result").innerHTML = ""
        }else if (listPerson.ListPerson[index].type === "Employee"){
            document.getElementById("dayWork").value = listPerson.ListPerson[index].dayWork;
            document.getElementById("daySalary").value = listPerson.ListPerson[index].daySalary;
            document.getElementById("result").innerHTML = "Tổng lương: " + listPerson.ListPerson[index].totalSalary;
        }else if (listPerson.ListPerson[index].type === "Student"){
            document.getElementById("toan").value = listPerson.ListPerson[index].toan;
            document.getElementById("ly").value = listPerson.ListPerson[index].ly;
            document.getElementById("hoa").value = listPerson.ListPerson[index].hoa;
            document.getElementById("result").innerHTML = "Điểm trung bình: " + listPerson.ListPerson[index].dtb;
        }
    
        document.querySelector("#myModal .modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="updateUser('${index}')" >Update User</button>
            <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal" >Đóng</button>
            `
    }
}
window.showUserDetail = showUserDetail;

const updateUser = () => { 
    let id = document.querySelector("#maID").value;
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let address = document.querySelector("#address").value;
    let type = document.querySelector("#type").value;
    let newUser;

    let isValid = true;
    isValid &= validation.checkEmpty(name, "tbName", "Họ và tên không để trống!");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không để trống!");
    isValid &= validation.checkEmpty(address, "tbAddress", "Địa chỉ không để trống!");

    if (type === "Customer"){
        let company = document.querySelector("#company").value;
        let receipt = document.querySelector("#receipt").value;
        let rating = document.querySelector("#Rating").value;
        isValid &= validation.checkEmpty(company, "tbCompany", "Tên công ty không để trống!");
        isValid &= validation.checkEmpty(receipt, "tbReceipt", "Hóa đơn không để trống!");
        isValid &= validation.checkEmpty(rating, "tbRating", "Đánh giá không để trống!") && validation.checkRate(rating, "tbRating", "Đánh giá phải từ 0 đến 5");

        newUser = new Customer(company, receipt, rating, id, name, address, email);
    }else if (type === "Employee"){
        let dayWork = document.querySelector("#dayWork").value;
        let daySalary = document.querySelector("#daySalary").value;
        isValid &= validation.checkEmpty(dayWork, "tbDayWork", "Ngày làm không để trống!") && validation.checkNumber(dayWork, "tbDayWork", "Phải lớn hơn 0");
        isValid &= validation.checkEmpty(daySalary, "tbDaySalary", "Ngày lương không để trống!") && validation.checkNumber(daySalary, "tbDaySalary","Phải lớn hơn 0");

        newUser = new Employee(dayWork, daySalary, id, name, address, email);
        newUser.calSalary();
    }else if (type === "Student"){
        let toan = document.querySelector("#toan").value;
        let ly = document.querySelector("#ly").value;
        let hoa = document.querySelector("#hoa").value;
        isValid &= validation.checkEmpty(toan, "tbToan", "Điểm không để trống!") && validation.checkScore(toan, "tbToan", "Phải lớn hơn 0 dưới 10");
        isValid &= validation.checkEmpty(ly, "tbLy", "Điểm không để trống!") && validation.checkScore(ly, "tbLy","Phải lớn hơn 0 dưới 10");
        isValid &= validation.checkEmpty(hoa, "tbHoa", "Điểm không để trống!") && validation.checkScore(hoa, "tbHoa","Phải lớn hơn 0 dưới 10");

        newUser = new Student(toan, ly, hoa, id, name, address, email);
        newUser.calDTB();
    }

    if(isValid){
        listPerson.updateUser(newUser);

        showTable(listPerson.ListPerson);
        setLocalStorage(listPerson.ListPerson);
        getLocalStorage();
        alert("update thành công");
        $('#myModal').modal('hide');
    }
}

window.updateUser= updateUser;

document.querySelector("#SapXepTang").addEventListener("click", function(){
    var mangKQ = listPerson.searchName();
    mangKQ.sort((b, a) => a.name.localeCompare(b.name))
    showTable(mangKQ);
})

document.querySelector("#SapXepGiam").addEventListener("click", function(){
    var mangKQ = listPerson.searchName();
    mangKQ.sort((a, b) => a.name.localeCompare(b.name))
    showTable(mangKQ);
})