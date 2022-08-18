


$("#password-edit").submit(async function(e) {
  e.stopImmediatePropagation();
  e.preventDefault();
  $('button[type="submit"]').attr('disabled','disabled');

  let formData = $(this).serializeArray();
  let emptyFeild = false;
  let form = this;
  let loginData = {};
  formData.forEach(function(info) {
        if(info.value ==""){
            emptyFeild = true;
        }
        loginData = {...loginData , [info.name] :info.value }
    }); 

  if(emptyFeild == true){
    $('button[type="submit"]').removeAttr('disabled');
    return
  }

  let token = getToken('x-access-token');
    console.log({token})  
   sendAPIRequest("POST" , "users/forgot_password",loginData,{}).then(response => {
    if (response.ok) return response.json();
    return response.json().then(response => { 
        
      throw new Error(response.message)})
}).then((responseJson)=>{
  //   let {data, message } = responseJson;
  //   setToken("x-access-token",data.token);
    showToster("Success",responseJson.message);

    setTimeout(()=>{document.location.href = 'page-login.html'},2000)
    
    return


}).catch(e =>{
     showToster("Error",e.message)
     $('button[type="submit"]').removeAttr('disabled');
  
  console.log(e)})
   
});

