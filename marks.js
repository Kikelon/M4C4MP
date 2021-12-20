console.clear();

function transformarFecha(fechaString){
    return fechaString.substring(8,10) + fechaString.substring(4,8) + fechaString.substring(0,4);
};

function getMark(){
    let url ="http://localhost:3000/marks";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        method : "GET"
    };
    if (document.getElementById("marks_id").value != ''){url += '?marks_id=' + document.getElementById("marks_id").value};
    console.log(url);
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(function (res){
        console.log(res);
        if (res.length == 0){
            document.getElementById("table-marks").className = "table table-sm d-none";
            document.getElementById("marks_id").value = '';
            document.getElementById("student_id").value = '';
            document.getElementById("subject_id").value = '';
            document.getElementById("date").value = '';
            document.getElementById("marks").value = '';
        }
        if (res.length == 1) {
            document.getElementById("table-marks").className = "table table-sm d-none";
            document.getElementById("marks_id").value = res[0].marks_id;
            document.getElementById("student_id").value = res[0].student_id;
            document.getElementById("subject_id").value = res[0].subject_id;
            document.getElementById("date").value = res[0].date.substring(0,10);
            document.getElementById("marks").value = res[0].marks;
        }
        else if (res.length > 1)
        {
            document.getElementById("table-marks").className = "table table-striped table-responsive";
            document.getElementById("table-body").innerHTML = '';
            document.getElementById("marks_id").value = '';
            document.getElementById("student_id").value = '';
            document.getElementById("subject_id").value = '';
            document.getElementById("date").value = '';
            document.getElementById("marks").value = '';
             for (let i = 0; i < res.length; i++){
                let marked = '';
                const htmlString = '<tr>'+
                                    '<th scope=\"row\">' + (i+1) + '</th>' +
                                    '<td>' + res[i].marks_id + '</td>' +
                                    '<td>' + res[i].student_id + '</td>' +
                                    '<td>' + res[i].subject_id + '</td>' +
                                    '<td>' + transformarFecha(res[i].date.substring(0,10)) + '</td>' +
                                    '<td>' + res[i].marks + '</td>' +
                                     '</tr>';
                document.getElementById("table-body").innerHTML += htmlString;
            }
        }
    })
    .catch (err => {console.log(err);});
};

function postMark(){
    const student = {
        "student_id" : document.getElementById("student_id").value,
        "subject_id" : document.getElementById("subject_id").value,
        "date" : document.getElementById("date").value,
        "marks" : document.getElementById("marks").value
    };

    const url ="http://localhost:3000/marks";
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

function putMark(){
    const student = {
        "marks_id" : document.getElementById("marks_id").value,
        "student_id" : document.getElementById("student_id").value,
        "subject_id" : document.getElementById("subject_id").value,
        "date" : document.getElementById("date").value,
        "marks" : document.getElementById("marks").value
    };
    const url ="http://localhost:3000/marks";
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

function delMark(){
    const url ="http://localhost:3000/marks";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify({"marks_id" : document.getElementById("marks_id").value}),
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
