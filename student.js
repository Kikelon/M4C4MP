console.clear();

function transformarFecha(fechaString){
    return fechaString.substring(8,10) + fechaString.substring(4,8) + fechaString.substring(0,4);
};

function getStudent(){
    let url ="http://localhost:3000/student";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        method : "GET"
    };
    if (document.getElementById("student_id").value != ''){url += '?student_id=' + document.getElementById("student_id").value};
    console.log(url);
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(function (res){
        console.log(res);
        if (res.length == 0){
            document.getElementById("table-student").className = "table table-sm d-none";
            document.getElementById("student_id").value = '';
            document.getElementById("nombre").value = '';
            document.getElementById("apellido").value = '';
            document.getElementById("edad").value = '';
            document.getElementById("group_id").value = '';
            document.getElementById("ingreso").value = '';
        }
        if (res.length == 1) {
            document.getElementById("table-student").className = "table table-sm d-none";
            document.getElementById("student_id").value = res[0].student_id;
            document.getElementById("nombre").value = res[0].nombre;
            document.getElementById("apellido").value = res[0].apellido;
            document.getElementById("edad").value = res[0].edad;
            document.getElementById("group_id").value = res[0].group_id;
            document.getElementById("ingreso").value = res[0].ingreso.substring(0,10);
        }
        else if (res.length > 1)
        {
            document.getElementById("table-student").className = "table table-striped table-responsive";
            document.getElementById("table-body").innerHTML = '';
            document.getElementById("nombre").value = '';
            document.getElementById("apellido").value = '';
            document.getElementById("edad").value = '';
            document.getElementById("group_id").value = '';
            document.getElementById("ingreso").value = '';
             for (let i = 0; i < res.length; i++){
                let marked = '';
                const htmlString = '<tr>'+
                                    '<th scope=\"row\">' + (i+1) + '</th>' +
                                    '<td>' + res[i].student_id + '</td>' +
                                    '<td>' + res[i].nombre + '</td>' +
                                    '<td>' + res[i].apellido + '</td>' +
                                    '<td>' + res[i].edad + '</td>' +
                                    '<td>' + res[i].group_id + '</td>' +
                                    '<td>' + transformarFecha(res[i].ingreso.substring(0,10)) + '</td>' +
                                     '</tr>';
                document.getElementById("table-body").innerHTML += htmlString;
            }
        }
    })
    .catch (err => {console.log(err);});
};

function postStudent(){
    const student = {
        "nombre" : document.getElementById("nombre").value,
        "apellido" : document.getElementById("apellido").value,
        "edad" : document.getElementById("edad").value,
        "group_id" : document.getElementById("group_id").value,
        "ingreso" : document.getElementById("ingreso").value
    };

    const url ="http://localhost:3000/student";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify(student),
        method : "POST"
    };
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(res => {
        console.log(res);
    })
    .catch (err => {console.log(err);
    });
};

function putStudent(){
    const student = {
        "student_id" : document.getElementById("student_id").value,
        "nombre" : document.getElementById("nombre").value,
        "apellido" : document.getElementById("apellido").value,
        "edad" : document.getElementById("edad").value,
        "group_id" : document.getElementById("group_id").value,
        "ingreso" : document.getElementById("ingreso").value
    };
    const url ="http://localhost:3000/student";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify(student),
        method : "PUT"
    };
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(res => {
        console.log(res);
    })
    .catch (err => {console.log(err);
    });
};

function delStudent(){
    const url ="http://localhost:3000/student";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify({"student_id" : document.getElementById("student_id").value}),
        method : "DELETE"
    };
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(res => {
        console.log(res);
    })
    .catch (err => {console.log(err);
    });
};
