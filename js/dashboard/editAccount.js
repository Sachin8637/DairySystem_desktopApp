


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
  
   sendAPIRequest("GET" , `users/vendor/${userId}`,{},{}).then(response => {
      if (response.ok) return response.json();
        return response.json().then(response => { 
           
          throw new Error(response.message)})
    }).then((responseJson)=>{
        console.log(responseJson)
     let {data, count } = responseJson;

       $('#vcode').val(`${data.vendor_id}`);
       $('#vname').val(`${data.name}`);
       $('#fname').val(`${data.father_name}`);
       $('#address').val(`${data.address}`);
       $('#pnum').val(`${data.phone}`); 
       $('#email').val(`${data.email}`); 
       $('#pan').val(`${data.pan_number}`); 
       $('#gst').val(`${data.gst_no}`);
       $('#aadhar').val(`${data.account_number}`);
       $('#bank').val(`${data.bank_name}`); 
       $('#branch').val(`${data.bank_branch}`); 
       $('#account').val(`${data.account_number}`); 
       $('#ifsc').val(`${data.bank_ifsc}`);

      
        return
   
   
    }).catch(e =>{
         showToster("Error",e.message)
         $('button[type="submit"]').removeAttr('disabled');
     
         })

    $("#editFromModal").attr("href", `edit.html?id=${id}`)
}


$("#update-vendor-form").submit(async function(e) {
    console.log("in")
    e.stopImmediatePropagation();
    e.preventDefault();
    $('button[type="submit"]').attr('disabled','disabled');
  
      let formData = $(this).serializeArray();
      let emptyFeild = false;
      let form = this;
      let vendorData = {};
      formData.forEach(function(info) {
            vendorData = {...vendorData , [info.name] :info.value }
        }); 
    
      if(emptyFeild == true){
        $('button[type="submit"]').removeAttr('disabled');
        return
    }

    

      let token = getToken('x-access-token');
      console.log({token})
       sendAPIRequest("POST" , `users/vendor/update/${userId}`,vendorData,{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)}) 
  }).then((responseJson)=>{
      showToster("Success",responseJson.message)
      setTimeout(()=>{document.location.href = 'all-accounts.html'},2000)
      
    
      return
  
  
  }).catch(e =>{
       showToster("Error",e.message)
       $('button[type="submit"]').removeAttr('disabled');
    
    
})
     
  });

getAcountDetails();


