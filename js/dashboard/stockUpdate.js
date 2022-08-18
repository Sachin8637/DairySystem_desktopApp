let getVendorslist = function(){
  
    sendAPIRequest("GET" ,"users/search",{},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
              
            throw new Error(response.message)})
    }).then((responseJson)=>{

        vendorsData = responseJson.data;

        vendorsData.forEach((row =>{
           
              
        $("#vendorListData").append(`<option value="${row.vendor_id}"></option>`)
          
        }))
        //  $('#allAccountTable').DataTable()
          // setToken("x-access-token",data.token);
          // showToster("Success",message);
      
          // setTimeout(()=>{document.location.href = 'index.html'},2000)
          
        return
      
      
    }).catch(e =>{
        showToster("Error",e.message)
        $('button[type="submit"]').removeAttr('disabled');
        
    })
         
      
}


$("#vendorList").on("change", function(e) {
        
   let selectedItem = $("#vendorList");
       
   let selectedVendorId= $(selectedItem).val();
   let selectedVendorCode= $(selectedItem).attr("id");
       console.log(selectedVendorId)
   let vendor = vendorsData.filter(v =>{
    
       return v.vendor_id==selectedVendorId
       })
       console.log(vendor)
          if(vendor.length==0){
       
          showToster("Error","NO Vendor Found")
          $("#vendorList").val("");
          
        }
     
      $("#vendorName").val(vendor[0].name);
      $("#vendor_id").val(vendor[0]._id);
        
      sendAPIRequest("POST" ,`rates/vendor/${vendor[0]._id}`,{},{}).then(response => {
          if (response.ok) return response.json();
          return response.json().then(response => { 
              
            throw new Error(response.message)})
      }).then((responseJson)=>{
        console.log(responseJson)
          if(!responseJson.data){
            showToster("Error","Please Assign Rate to Vendor")
           
            
          }else{
           
            currentVendorRate = responseJson.data.rates_list
          }
          
      
      }).catch(e =>{
           showToster("Error",e.message)
           $('button[type="submit"]').removeAttr('disabled');
        
           })
      
    })
    
    getVendorslist()