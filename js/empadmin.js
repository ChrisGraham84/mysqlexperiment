console.log("Script Routed");

btnAddEmployee = document.getElementById("btnAddEmployee");
inputEmployeeName = document.getElementById("employeename");
inputEmployeeDesignation = document.getElementById("employeedesignation");

function createEmployee(name, designation){
    console.log("creating emp")
    let param = `name=${name}&designation=${designation}`
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/createemployee', true);
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.responseText);
        }
    }

    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(param);
    console.log("done")
}

btnAddEmployee.addEventListener('click', () => {
    //console.log(inputEmployeeName.value + ' ' + inputEmployeeDesignation.value)
    var name = inputEmployeeName.value;
    var designation = inputEmployeeDesignation.value;
    if(name && designation){
        createEmployee(name, designation);
    }
    else{
        console.log("Empty field detected")
    }
   
})

