//grab main container
var main = document.getElementById('main');

//create child div
var testdiv = document.createElement('div')
testdiv.innerHTML = 'Importing From Template script'

main.appendChild(testdiv);

function getEmployee(){
    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            let data = JSON.parse(this.response);
            if(data === undefined || data.length === 0) return
            testdiv.innerHTML = data[0].name;
            
        }
    };
    xhhtp.open('GET', '/employee', true)
    xhhtp.send();
}

function createEmployeeTable(){
    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            //let data = JSON.parse(this.response);
            //testdiv.innerHTML = data[0].name;
            
        }
    };
    xhhtp.open('GET', '/createemployeetable', true)
    xhhtp.send();
}

var btnCreate = document.createElement('button');
btnCreate.innerText = 'Click to Create Table'
btnCreate.addEventListener('click', () => {
    createEmployeeTable();
    //console.log('clicked');
});

//create button
var btnGet = document.createElement('button');
btnGet.innerText = 'Click to Get Employees'
btnGet.addEventListener('click', () => {
    getEmployee();
    //console.log('clicked');
});

main.appendChild(btnCreate);
main.appendChild(btnGet);