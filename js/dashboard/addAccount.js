//myStorage = window.localStorage;
//localStorage.setItem('myCat', 'Tom');

$("#add-vendor-form").submit(async function(e) {
    console.log("in")
    e.stopImmediatePropagation();
    e.preventDefault();
    $('button[type="submit"]').attr('disabled','disabled');
  
    let formData = $(this).serializeArray();
    let emptyFeild = false;
    let form = this;
    let vendorData = {};
    formData.forEach(function(info) {
        //   if(info.value ==""){
        //       emptyFeild = true;
        //   }
            vendorData = {...vendorData , [info.name] :info.value }
            }); 
  
            if(emptyFeild == true){
            $('button[type="submit"]').removeAttr('disabled');

             return

            }

  
    
      let token = getToken('x-access-token');
      console.log({token})

      sendAPIRequest("POST" , "users/user",vendorData,{}).then(response => {
          if (response.ok) return response.json();
          return response.json().then(response => { 
          
          throw new Error(response.message)})
        }).then((responseJson)=>{
          showToster("Success",responseJson.message)
          setTimeout(()=>{document.location.href = 'add-account.html'},2000)
      
    
          return
  
  
        }).catch(e =>{
          showToster("Error",e.message)
          $('button[type="submit"]').removeAttr('disabled');
    
  
        })
     
  });