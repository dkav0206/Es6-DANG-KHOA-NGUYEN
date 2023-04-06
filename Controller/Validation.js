// function checkID(params) {
//     fdsghjd
// }

export class Validation {
    //phương thức kiểm tra
    //input: valueInput , spanID , message
    //output: đúng true , sai false
    checkEmpty = (valueInput, spanID, message) => {
        if (valueInput == "") {
            //không hợp lệ
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }

        //hợp lệ
        document.getElementById(spanID).style.display = "none";
        document.getElementById(spanID).innerHTML = "";
        return true
    }

    checkID = (valueInput, spanID, message, mang) => {
        // some(): trả về true / false (kiểm tra điều kiện nào đó trong mảng)
        var isExist = false; //? giả sử chưa có mã

        //? kiểm chứng mã có trong mảng chưa
        isExist = mang.some(function (sp) {
            return valueInput === sp.id
        });

        if (isExist) {
            //! đã tồn tại mã sinh viên => không hợp lệ
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false

        } else {
            //? mã không trùng => hợp lệ
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

    }

    checkSelect = (selectID, spanID, message) => {
        var indexOption = document.getElementById(selectID).value;


        if (indexOption !== "0") {
            //hợp lệ
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }


        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false

    }

    checkScore = (valueInput, spanID, message) => {
        var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;

        if (valueInput.match(pattern) && valueInput >= 0 && valueInput <= 10) {
            //hợp lệ

            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false


    }

    checkRate =  (valueInput, spanID, message) => {
        //var pattern = /^(\d{1,2}(\.\d{1,2})?)$/;

        if (valueInput >= 0 && valueInput <= 5) {
            //hợp lệ

            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false


    }

    checkNumber =  (valueInput, spanID, message) => {

        if (valueInput >= 0 ) {
            //hợp lệ

            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

        //không hợp lệ
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false


    }

}

