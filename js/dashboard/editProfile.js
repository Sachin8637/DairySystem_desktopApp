


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

let userId = getUrlParameter('id');

let getAcountDetails =()=>{
  


   sendAPIRequest("GET" , "users/profile",{},{}).then(response => {
      if (response.ok) return response.json();
        return response.json().then(response => { 
           
          throw new Error(response.message)})
    }).then((responseJson)=>{
        console.log(responseJson)
     let {data, count } = responseJson;

       $('#val-username').val(`${data.name}`);
       $('#val-email').val(`${data.email}`);
       $('#val-phone').val(`${data.phone}`);
       $('#dairy_name').val(`${data.dairy_name}`); 
       

      
        return
   
   
    }).catch(e =>{
         showToster("Error",e.message)
         $('button[type="submit"]').removeAttr('disabled');
     
         console.log(e)})

    // $("#editProfile").attr("href", `edit-profile.html?id=${id}`)
}

$("#edit-profile").submit(async function(e) {
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
     sendAPIRequest("POST" , "users/updateprofile",loginData,{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{
    //   let {data, message } = responseJson;
    //   setToken("x-access-token",data.token);
      showToster("Success",responseJson.message);
  
      setTimeout(()=>{document.location.href = 'index.html'},2000)
      
      return
  
  
  }).catch(e =>{
       showToster("Error",e.message)
       $('button[type="submit"]').removeAttr('disabled');
    
    console.log(e)})
     
  });

getAcountDetails();




