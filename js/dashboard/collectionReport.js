$("#collectionReport").submit(async function(e) {
  
  e.stopImmediatePropagation();
  e.preventDefault();
  $('button[type="submit"]').attr('disabled','disabled');

      let formData = $(this).serializeArray();
      let emptyFeild = false;
      let form = this;
      let milkCollectionData = {};
      formData.forEach(function(info) {
            // if(info.value =="vendor_ids"){ 
            //     emptyFeild = true;
            // }
            milkCollectionData = {...milkCollectionData , [info.name] :info.value }
        }); 
        console.log("in", emptyFeild)
        if(emptyFeild == true){
          $('button[type="submit"]').removeAttr('disabled');
          return
        }


  //milkCollectionData.vendor_id = $('#vendor_id').attr("id")
  ShowMilkCollection(milkCollectionData);
 
});


let ShowMilkCollection = function(milkCollectionData){

   milkCollectionData.vendor_ids = $('.selectpicker').selectpicker('val')
  sendAPIRequest("POST" , "collection/list",milkCollectionData,{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{
    let {count, rows , vendor_data, totalAmount, totalWeight ,avgFat ,avgSnf} = responseJson.data;  
      $('#milkCollectionRecord').DataTable().destroy();

     $("#milkCollectionRecord > tbody").empty();

     $('#totalRecordCount').DataTable().destroy();
     $("#totalRecordCount > tbody").empty();

     $('#vendorRecords').DataTable().destroy();
     $("#vendorRecords > tbody").empty();
     
     
       
     let recordsTable = `<tr><td>${totalWeight}</td>
     <td>${totalAmount}</td>
     <td>${avgFat}</td>
     <td>${avgSnf}</td></tr>`

$("#totalRecordCount").find('tbody').append(recordsTable);
      rows.forEach((row =>{
        let newRow= addTableRow(row)
  
        $("#milkCollectionRecord").find('tbody').append(newRow)
      
      }))
      
      
      vendor_data.forEach((row =>{
    
        let newRow= addVendorTableRow(row)

        
    
          $("#vendorRecords").find('tbody').append(newRow)
      
      })); 
     
      $('#milkCollectionRecord').DataTable().draw();  
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
          <td>${parseFloat(data.avgSnf/data.totalWeight).toFixed(2)}</td>
          <td>${data.totalWeight}</td>
          <td>${data.totalAmount}</td>
          
          
      
          
      </tr>`
     
}
let addTableRow =(data) =>{
      return ` </tr>
        <tr>
            <td><input id="check_all" type="checkbox" ></td>
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td>${data.shift}</td>
            <td>${data.vendor_code}</td>
            <td>${data.vendor_name}</td>
            <td>${data.cattle_type}</td>
            <td>${data.fat}</td>
            <td>${data.snf}</td>
            <td>${data.weight}</td>
            <td>${data.rate}</td>
            <td>${data.amount}</td>
            
        
            
        </tr>`
       
  }
    
  


function deleteMilkCollection(data_id){
            
    sendAPIRequest("POST" , `rates/deleteFile/${data_id}`,{},).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
          
    }).then((responseJson)=>{
        showToster("Success",responseJson.message)
      
        $('button[type="submit"]').removeAttr('disabled');
        
        
        let seletedObject = $('input[name="shee"]:checked').val();
        console.log($('input[name="sheetdId"]:checked').val())
          $('input[type="checkbox"]:checked').each(function(){
            seletedObject.push($(this).attr("id"));

          });  
        
        
        $(`#${data_id}`).remove();
        
        return
          
    
    }).catch(e =>{
        showToster("Error",e.message)
      
  })  

}


function downloadFile(){
 

  let startdate = $("#startDate").val();
  let endDate = $("#endDate").val();
  console.log(startdate,endDate)
      if(startdate != "" && endDate !=""){
        $('#main-wrapper').removeClass('show');
        $('#preloader').show();

      sendAPIRequest("POST" , "collection/list",{ "extract":true,endDate,startDate},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        let {rows, Location } = responseJson.data;
        console.log(Location)
        $('#main-wrapper').addClass('show');
        $('#preloader').hide();
      
        showToster("Success","File Download Success");
        downloadFromUrl(Location)
        
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