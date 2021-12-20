console.clear();

function getAverage(){
    let id = 0;
    if (document.getElementById("id").value != ''){id = document.getElementById("id").value};
    let url ='http://localhost:3000/average?id=' + id;
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        method : "GET"
    };
    console.log(url);
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(function (res){
        console.log(res);
        document.getElementById("table-subjects").className = "table table-sm d-none";
        document.getElementById("div-average").className = "";
        document.getElementById("average").innerHTML = '';
        document.getElementById("id").value = '';
        if (res[0].average == null && res[0].nombre != null){
            document.getElementById("average").innerHTML = res[0].nombre + ' ' + res[0].apellido + ' no tiene notas para calcular una media.';
        }else if (res[0].nombre != null) {
            document.getElementById("average").innerHTML = 'La nota media de ' + res[0].nombre + ' ' + res[0].apellido + ' es un ' + res[0].average;
        };
    })
    .catch (err => {console.log(err);});
};

function getEnrolled(){
    let url ="http://localhost:3000/enrolled";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        method : "GET"
    };
    if (document.getElementById("id").value != ''){url += '?id=' + document.getElementById("id").value};
    console.log(url);
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(function (res){
        console.log(res);
        document.getElementById("id").value = '';
        if (res.length != [] && res[0].title == null){
            document.getElementById("table-subjects").className = "table table-sm d-none";
            document.getElementById("div-average").className = "";
            document.getElementById("average").innerHTML = res[0].nombre + ' ' + res[0].apellido + ' no está matriculado/a en ninguna asignatura.';
        } else if (res.length != [])        
        {
            document.getElementById("table-subjects").className = "table table-striped table-responsive";
            document.getElementById("div-average").className = "d-none";
            document.getElementById("table-body").innerHTML = '';
            document.getElementById("table_head").innerHTML = '<th scope=\"col\">#</th>'+
                                                              '<th scope=\"col\">Nombre</th>'+
                                                              '<th scope=\"col\">Apellido</th>'+
                                                              '<th scope=\"col\">Asignatura</th>';
             for (let i = 0; i < res.length; i++){
                const htmlString = '<tr>'+
                                    '<th scope=\"row\">' + (i+1) + '</th>' +
                                    '<td>' + res[i].nombre + '</td>' +
                                    '<td>' + res[i].apellido + '</td>' +
                                    '<td>' + res[i].title + '</td>' +
                                     '</tr>';
                document.getElementById("table-body").innerHTML += htmlString;
            }
        }
    })
    .catch (err => {console.log(err);});
};

function getTaught(){
    let url ="http://localhost:3000/taught";
    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        method : "GET"
    };
    if (document.getElementById("id").value != ''){url += '?id=' + document.getElementById("id").value};
    console.log(url);
    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(function (res){
        console.log(res);
        if (res.length == []){
            document.getElementById("table-subjects").className = "table table-sm d-none";
            document.getElementById("id").value = '';
            document.getElementById("div-average").className = "d-none";
        }
        if (res.length == 1 && res[0].title == null) {
            document.getElementById("table-subjects").className = "table table-sm d-none";
            document.getElementById("div-average").className = "";
            document.getElementById("id").value = '';
            document.getElementById("average").innerHTML = res[0].nombre + ' ' + res[0].apellido + ' no imparte ninguna asignatura.';
        }
        else if (res.length > 1)
        {
            document.getElementById("div-average").className = "d-none";
            document.getElementById("id").value = '';
            document.getElementById("average").innerHTML = '';
            document.getElementById("table-subjects").className = "table table-striped table-responsive";
            document.getElementById("table-body").innerHTML = '';
            document.getElementById("table_head").innerHTML = '<th scope=\"col\">#</th>'+
                                                              '<th scope=\"col\">Nombre</th>'+
                                                              '<th scope=\"col\">Apellido</th>'+
                                                              '<th scope=\"col\">Asignatura</th>'+
                                                              '<th scope=\"col\">Id Grupo</th>';

             for (let i = 0; i < res.length; i++){
                let marked = '';
                let htmlString = '<tr>'+
                                    '<th scope=\"row\">' + (i+1) + '</th>' +
                                    '<td>' + res[i].nombre + '</td>' +
                                    '<td>' + res[i].apellido + '</td>';
                if (res[i].title == null){
                    htmlString += '<td colspan=\"2\">No imparte ninguna asignatura</td></tr>';
                } else {
                    htmlString += '<td>' + res[i].title + '</td>' +
                                  '<td>' + res[i].group_id + '</td>' +
                                  '</tr>';
                }
                document.getElementById("table-body").innerHTML += htmlString;
            }
        }
    })
    .catch (err => {console.log(err);});
};
