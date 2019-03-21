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
    var id = $("#addId").val();
    var fname = $("#addFname").val();
    var lname = $("#addLname").val();
    var user = $("#addUser").val();
    var pass = $("#addPass").val();
    var data = {
        id : id,
        firstname: fname,
        lastname: lname,
        username:user,
        password:pass
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
            for (var i = 0; i < respones.length; i++) {
            var teacher_data ='';
            teacher_data += "<tr>";
            teacher_data += "<td>"+ (i+1) + "</td>";
            teacher_data += "<td id=\""+"rowId"+""+i+"col"+"1\">"+ respones[i].id + "</td>"
            teacher_data += "<td id=\""+"rowId"+""+i+"col"+"2\">"+ respones[i].firstname + "</td>"
            teacher_data += "<td id=\""+"rowId"+""+i+"col"+"3\">"+ respones[i].lastname + "</td>"
            teacher_data += "<td> <a href=\"#editEmployeeModal\" id=\""+"rowId"+""+i+"col\" onclick=\"showDataTeacher(this.id)\" class=\"edit\" data-toggle=\"modal\"><i class=\"material-icons\"" 
            + "data-toggle=\"tooltip\" title=\"Edit\">&#xE254;</i></a>"
            + "<a href=\"#deleteEmployeeModal\" id=\""+"rowId"+""+i+"col\" onclick=\"setData(this.id)\" class=\"delete\" data-toggle=\"modal\"><i class=\"material-icons\"" 
            + "data-toggle=\"tooltip\" title=\"delate\">&#xE872;</i></a>"
            teacher_data += "</tr>"
            $("#tableTeacher").append(teacher_data);
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

}

var btnEditId= "";
function showDataTeacher(idBtn) {
    var findId = idBtn;
    console.log(findId);
    console.log($('#' + findId + 1).html());
    btnEditId=$('#' + findId + 1).html();
    console.log(btnEditId);
    $('#editFname').val($('#' + findId + 2).html());
    $('#editLname').val($('#' + findId + 3).html());

}

function setData(idBtn){
    var findId =idBtn;
    btnEditId=$('#' + findId + 1).html();
    console.log(btnEditId);
}

function editTeacher() {
    var id = btnEditId;
    var fname = $("#editFname").val();
    var lname = $("#editLname").val();
    var data = {
        id: id,
        firstname:fname,
        lastname:lname,
    }
    console.log(data)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/home/teacher/edit",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (respones) {
            var result = JSON.stringify(respones);
            console.log(result);
            if (JSON.stringify(respones) == 'true') {
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


function deleteTeacher() {
    var id = btnEditId;
    var data = {
        id:id,
    }
    console.log(data)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/home/teacher/delete",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (respones) {
            var result = JSON.stringify(respones);
            console.log(result);
            if (JSON.stringify(respones) == 'true') {
                alert("delete Successful!")
                window.location.reload();

            } else {
                alert("delete Incorrect!");
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

    
}

