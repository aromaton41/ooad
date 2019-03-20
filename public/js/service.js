var btnEditId = '';
var btnDelateId = '';
function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var data = {
        username: username,
        password: password,
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/home/login",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (respones) {
            var result = JSON.stringify(respones);
            console.log(result);
            if (JSON.stringify(respones) == 'true') {
                alert("Login Successful!")
                window.location = 'manage-Home.html'
            } else {
                alert("Login Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: asdasd", e);
        }
    });

}



function insertTeacher() {
    var fname = $("#fn").val();
    var lname = $("#ln").val();
    var data = {
        firstname: fname,
        lastname: lname,
    }
    console.log(data)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/home/teacher/insert",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (respones) {
            var result = JSON.stringify(respones);
            console.log(result);
            if (JSON.stringify(respones) == 'true') {
                alert("insert Successful!")
                window.location.reload();

            } else {
                alert("insert Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}

function loadTableTeacher() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/home/teacher/get",
        data: JSON.stringify(""),
        dataType: 'json',
        success: function (respones) {
            var rowId = 'rowId_'
            for (var i = 0; i < respones.length; i++) {
            var teacher_data ='';
            teacher_data += "<tr>";
            teacher_data += "<td id=\"rowId"+i+"col"+"1\">"+ (i+1) + "</td>";
            teacher_data += "<td id=\"rowId>"+i+"col"+"2\">"+ respones[i].firstname + "</td>"
            teacher_data += "<td id=\"rowId>"+i+"col"+"3\">"+ respones[i].lastname + "</td>"
            teacher_data += "<td> <a href=\"#editEmployeeModal\" id=\"rowId"+i+"col"+"e\" class=\"edit\" data-toggle=\"modal\"><i class=\"material-icons\"" 
            + "data-toggle=\"tooltip\" title=\"Edit\">&#xE254;</i></a>"
            + "<a href=\"#deleteEmployeeModal\" id=\"rowId"+i+"col"+"d\" class=\"delete\" data-toggle=\"modal\"><i class=\"material-icons\"" 
            + "data-toggle=\"tooltip\" title=\"delate\">&#xE872;</i></a>"
            $("#tableTeacher").append(teacher_data);
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

}

function editTeacher() {
    var fname = $("#efname").val();
    var lname = $("#elname").val();
    var data = {
        firstname:fname,
        lastname:lname,
    }
    console.log(data)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/home/teacher/edit",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (customer) {
            var result = JSON.stringify(customer);
            console.log(result);
            if (JSON.stringify(customer) == 'true') {
                alert("edit Successful!")
                window.location.reload();

            } else {
                alert("edit Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

}
