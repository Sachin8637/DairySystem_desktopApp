//myStorage = window.localStorage;
//localStorage.setItem('myCat', 'Tom');

$("#login-Form").submit(async function(e) {
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

    console.log(loginData)
  
    // let first_name =  form['val-username'].value;
    // let last_name =  form['val-userlastname'].value;
    // let email =  form['val-email'].value;
    // let password =  form['val-password'].value;
    // let phone =  form['val-phone'].value;
    // let referral =  form['referral'].value;
    // let dairy_name =  (form['dairy_name'].value) || "NA";
    // let terms =  form['val-terms'].value;
   
    //   let userinfo  = { user : {email, first_name ,last_name,  password , phone, referral ,dairy_name,terms } }
       
     sendAPIRequest("POST" , "users/login",loginData,{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{
      let {data, message } = responseJson;
      setToken("x-access-token",data.token);
      showToster("Success",message);

      setTimeout(()=>{document.location.href = 'index.html'},2000)
      
      return
  
  
  }).catch(e =>{
       showToster("Error",e.message)
       $('button[type="submit"]').removeAttr('disabled');
    
    console.log(e)})
     
  });