$("#salesReport").submit(async function(e) {
  console.log("in")
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

  
  ShowMilkSale(milkSaleData);
 
});


let ShowMilkSale = function(milkSaleData){
milkSaleData.vendor_ids = $('.selectpicker').selectpicker('val')

  sendAPIRequest("POST" , "collection/sale/list",milkSaleData,{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{
      let {count, rows , vendor_data, totalAmount, totalWeight ,avgFat} = responseJson.data; 
      $('#milkSaleRecord').DataTable().destroy();

     $("#milkSaleRecord > tbody").empty();

     $('#milkSaleRecord').DataTable().destroy();
    
     $('#totalRecordCount').DataTable().destroy();
     $("#totalRecordCount > tbody").empty();

     $('#vendorRecords').DataTable().destroy();
     $("#vendorRecords > tbody").empty();
  
     
     let recordsTable = `<tr><td>${totalWeight}</td>
     <td>${totalAmount}</td>
     <td>${avgFat}</td></tr>`

$("#totalRecordCount").find('tbody').append(recordsTable);

rows.forEach((row =>{
  let newRow= addTableRow(row)

  $("#milkSaleRecord").find('tbody').append(newRow)

}))

vendor_data.forEach((row =>{
        let newRow= addVendorTableRow(row)
  
        $("#vendorRecords").find('tbody').append(newRow)
      
      })); 

      $('#milkSaleRecord').DataTable().draw(); 
      $('#totalRecordCount').DataTable().draw(); 
      $('#vendorRecords').DataTable().draw();
      $('button[type="submit"]').removeAttr('disabled');
      return
  
  
  }).catch(e =>{
       showToster("Error",e.message)
       $('button[type="submit"]').removeAttr('disabled');
    
       })
     
  
}

let addVendorTableRow =(data) =>{
  return ` </tr>
    <tr>
        
        <td>${data.vendor_code}</td>
        <td>${data.vendor_name}</td>
        <td>${parseFloat(data.avgFat/data.totalWeight).toFixed(2)}</td>
        <td>${data.totalWeight}</td>
        <td>${data.totalAmount}</td>
        
        
    
        
    </tr>`
   
}

let addTableRow =(data) =>{
      return`
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



//ShowMilkSale();
function deleteMilkSale(data_id){
          
  sendAPIRequest("POST" , `rates/deleteFile/${data_id}`,{},).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
        
  }).then((responseJson)=>{
      showToster("Success",responseJson.message)
     
      $('button[type="submit"]').removeAttr('disabled');
      
      
      
      $(`#${data_id}`).remove();
      
      return
     
  
  }).catch(e =>{
       showToster("Error",e.message)
    
  })  
}


function downloadFile(){
 
let startdate = $("#startDate").val();
let endDate = $("#endDate").val();

  if(startdate != "" && endDate !=""){
    $('#main-wrapper').removeClass('show');
  $('#preloader').show();

  sendAPIRequest("POST" , "collection/sale/list",{ "extract":true,endDate,startDate},{}).then(response => {
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
  }else {
    showToster("Error","Plese Select Start and End date");
    return
  }
 
}



getVendorslisting()