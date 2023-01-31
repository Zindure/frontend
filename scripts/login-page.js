const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const hostURL = "http://localhost:3000/";
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    var bodyObj = {};
    bodyObj.username = username;
    bodyObj.password = password;
    var jsonBody = JSON.stringify(bodyObj);
    var loginRequest = new XMLHttpRequest();
    loginRequest.open("POST",hostURL + "users/login");
    loginRequest.setRequestHeader("Content-Type","application/json")
    loginRequest.send(jsonBody);
    //alert(loginRequest.status);

    loginRequest.onreadystatechange=(e)=>{
        console.log(loginRequest.response);
        alert("JWT: " + JSON.parse((loginRequest.responseText)).jwt);
    }

    // if (loginRequest.response !== null) {
    //     console.log(loginRequest.response);
    //     //alert("JWT: " + );
    //     //location.reload();
    // } else {
    //     loginErrorMsg.style.opacity = 1;
    // }
})