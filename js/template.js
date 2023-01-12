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
            testdiv.innerHTML = data[0].name;
            
        }
    };
    xhhtp.open('GET', '/employee', true)
    xhhtp.send();
}

//create button
var btn = document.createElement('button');
btn.innerText = 'Click to Update'
btn.addEventListener('click', () => {
    getEmployee();
    //console.log('clicked');
});

main.appendChild(btn);