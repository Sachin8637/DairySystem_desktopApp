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


  
$("#add-dispatch-item").submit(async function(e) {
    
    e.stopImmediatePropagation();
    e.preventDefault();
    $('button[type="submit"]').attr('disabled','disabled');
  
    let formData = $(this).serializeArray();
    let emptyFeild = false;
    let form = this;
    let itemSaleData = {};
    formData.forEach(function(info) {
          if(info.value ==""){
              emptyFeild = true;
          }
          itemSaleData = {...itemSaleData , [info.name] :info.value }
      }); 
  
      if(emptyFeild == true){
        $('button[type="submit"]').removeAttr('disabled');
        return
    }

    

    

    sendAPIRequest("POST" , "collection/milk/sale",itemSaleData,{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        showToster("Success",responseJson.message)
        setTimeout(()=>{document.location.href = 'item-sale.html'},2000)
             
        return
    }).catch(e =>{
        showToster("Error",e.message)
        $('button[type="submit"]').removeAttr('disabled');
      
      
    })
   
});



let ShowDispatchItem = function(){

    sendAPIRequest("POST" , "collection/sale/list",{type : shift},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        let {rows, count } = responseJson.data;
        rows.forEach((row =>{
          let newRow= addTableRow(row)
     
          $("#itemSaleRecord").find('tbody').append(newRow)
        
        }))
        $('#itemSaleRecord').DataTable()
        
        return   

    }).catch(e =>{
         showToster("Error",e.message)
         $('button[type="submit"]').removeAttr('disabled');
      
         })
       
    
    }



    let addTableRow =(data) =>{
      return` </tr>
        <tr>
              <td><input id="check_all" type="checkbox"></td>
              <td>${data.date}</td>
              <td>${data.time}</td>
              <td>${data.vendor_code}</td>
              <td>${data.vendor_name}</td>
              <td>${data.item}</td>
              <td>${data.unit}</td>
              <td>${data.weight}</td>
              <td>${data.rate}</td>
              <td>${data.amount}</td>
                                      
        </tr>`
         
}     
  ShowDispatchItem();
