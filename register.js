let baseUrl = "http://dairysystem.in";

let sendAPIRequest = async function(method="GET",URL="NA",body ={}, ...otherInfo){
 // users/register/client
  const rawResponse = await fetch(`${baseUrl}/${URL}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...otherInfo
    },
    body: JSON.stringify(body)
  });
 
    return  rawResponse;

}

$("#Contact-Form").submit(async function(e) {
  e.stopImmediatePropagation();
  e.preventDefault();
  $('button[type="submit"]').attr('disabled','disabled');

  let formData = $(this).serializeArray();
  let emptyFeild = false;
  let form = this;
  formData.forEach(function(info) {
        if(info.value =="" && !["dairy_name","referral"].includes(info.name) ){
            emptyFeild = true;
        }
      
    }); 

  if(emptyFeild== true){
    $('button[type="submit"]').removeAttr('disabled');
    return
  }

  let first_name =  form['val-username'].value;
  let last_name =  form['val-userlastname'].value;
  let email =  form['val-email'].value;
  let password =  form['val-password'].value;
  let phone =  form['val-phone'].value;
  let referral =  form['referral'].value;
  let dairy_name =  (form['dairy_name'].value) || "NA";
  let terms =  form['val-terms'].value;
 
    let userinfo  = { user : {email, first_name ,last_name,  password , phone, referral ,dairy_name,terms } }
     
   sendAPIRequest("POST" , "users/register/client",userinfo,{}).then(response => {
    if (response.ok) return response.json();
    return response.json().then(response => { 
        
      throw new Error(response.message)})
}).then((responseJson)=>{

    toastr.success("Success",`${responseJson.message}`,{positionClass:"toast-top-full-width",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
    setTimeout(()=>{document.location.href = 'page-login.html'},2000)
    
  
    return


}).catch(e =>{
  toastr.error("error Message",`${e.message}`,{positionClass:"toast-top-full-width",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
    $('button[type="submit"]').removeAttr('disabled');
  
  console.log(e)})
   
});


