$("#add-milk-sale").submit(async function(e) {
    
    e.stopImmediatePropagation();
    e.preventDefault();
    $('button[type="submit"]').attr('disabled','disabled');
  
    let formData = $(this).serializeArray();
    let emptyFeild = false;
    let form = this;
    let milkSaleData = {};
    formData.forEach(function(info) {
          if(info.value ==""){
              emptyFeild = true;
          }
          milkSaleData = {...milkSaleData , [info.name] :info.value }
      }); 
  
      if(emptyFeild == true){
        $('button[type="submit"]').removeAttr('disabled');
        return
    }

    

    

    sendAPIRequest("POST" , "collection/milk/sale",milkSaleData,{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        showToster("Success",responseJson.message)
        $('button[type="submit"]').removeAttr('disabled');


// Reload DataTable after submit MilkSale
                    sendAPIRequest("POST" , "collection/sale/list",{type : shift},{}).then(response => {
                      if (response.ok) return response.json();
                      return response.json().then(response => { 
                          
                        throw new Error(response.message)})
                  }).then((responseJson)=>{
                      let {rows, count } = responseJson.data;
                      $('#milkSaleRecord').DataTable().destroy();

                      $("#milkSaleRecord > tbody").empty();
                      rows.forEach((row =>{
                        let newRow= addTableRow(row)
                  
                        $("#milkSaleRecord").find('tbody').append(newRow)
                      
                      }))
                      $('#milkSaleRecord').DataTable()
                      
                      return   
              
                  })
           
           
//  For Making inputs blank (form)
            function handleClick() {

              const inputs = document.querySelectorAll('#vendor_id, #vendorName,#milkSaleCattleType ,#milkSaleFat ,#milkSaleWeight ,#milkSaleRate ,#milkSaleAmount');

              inputs.forEach(input => {
                input.value = '';
              });
            }
            $('button[type="submit"]').append(handleClick);


        // setTimeout(()=>{document.location.href = 'milk-sale.html'},2000)    
        return

        
    }).catch(e =>{
        showToster("Error",e.message)
        $('button[type="submit"]').removeAttr('disabled');
      
      
    })
   
});



let ShowMilkSale = function(){

    sendAPIRequest("POST" , "collection/sale/list",{type : shift},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        let {rows, count } = responseJson.data;
        rows.forEach((row =>{
          let newRow= addTableRow(row)
     
          $("#milkSaleRecord").find('tbody').append(newRow)
        
        }))
        $('#milkSaleRecord').DataTable()
        
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
              <td>${data.shift}</td>
              <td>${data.vendor_code}</td>
              <td>${data.vendor_name}</td>
              <td>${data.cattle_type}</td>
              <td>${data.fat}</td>
              <td>${data.weight}</td>
              <td>${data.rate}</td>
              <td>${data.amount}</td>
                                      
        </tr>`
         
}     
  ShowMilkSale();


$("#milkSaleFat").on("keyup", function(e) {

  let fat =parseFloat($("#milkSaleFat").val());
     if (fat > 0 && fat <= 5){
       $("#milkSaleCattleType").val("Cow");
     } else if (fat > 5 && fat <= 12){
       $("#milkSaleCattleType").val("Buffalo");
     } else {
       $("#milkSaleCattleType").val("");
     }
})




//  Amount Function
$('#milkSaleWeight, #milkSaleRate').keyup(function(){
  var weight = parseFloat($('#milkSaleWeight').val()) || 0;
  var rate = parseFloat($('#milkSaleRate').val()) || 0;

  $('#milkSaleAmount').val(weight * rate);    
});




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
   
   let vendor = vendorsData.filter(v =>{

     return v.vendor_id==selectedVendorId
   })
  
    if(vendor.length==0){
   
      showToster("Error","NO Vendor Found")
      $("#vendorList").val("");
      
    }
 
  $("#vendorName").val(vendor[0].name);
  $("#vendor_id").val(vendor[0]._id);
  
  
})

getVendorslist()


function downloadFile(condition){
  $('#main-wrapper').removeClass('show');
  $('#preloader').show();

  sendAPIRequest("POST" , "collection/sale/list",{ "extract":true,type : shift},{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{
      let {rows, Location } = responseJson.data;
  
      $('#main-wrapper').addClass('show');
      $('#preloader').hide();
    
      if(loaction){
        showToster("Success","File Download Success");
        downloadFromUrl(Location)
       }else{
        showToster("Error","No data Found");
       }
      
      return


  }).catch(e =>{
    $('#main-wrapper').addClass('show');
    $('#preloader').hide();
      showToster("Error",e.message)
      $('button[type="submit"]').removeAttr('disabled');
    
  })
}



// function deleteMilkSale(data_id){
            
//   sendAPIRequest("POST" , `rates/deleteFile/${data_id}`,{},).then(response => {
//       if (response.ok) return response.json();
//       return response.json().then(response => { 
          
//         throw new Error(response.message)})
        
//   }).then((responseJson)=>{
//       showToster("Success",responseJson.message)
     
//       $('button[type="submit"]').removeAttr('disabled');
      
      
      
//       $(`#${data_id}`).remove();
      
//       return
     
  
//   }).catch(e =>{
//        showToster("Error",e.message)
    
//   })  
// }