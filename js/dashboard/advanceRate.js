
let  uploadedAdvanceRate = [];
let allVendors  =[];
$("#add-advance-rate").submit(async function(e) {
  
  e.stopImmediatePropagation();
  e.preventDefault();
  if(uploadedAdvanceRate.length > 0){
    showToster("Warning","Not allowed to upload multiple Advance Rates")
    return;
  }
  $('button[type="submit"]').attr('disabled','disabled');

  let formData = $(this).serializeArray();
  let emptyFeild = false;
  let form = this;
  let advanceRateData = {};
  formData.forEach(function(info) {
      //   if(info.value ==""){
      //       emptyFeild = true;
      //   }
        advanceRateData = {...advanceRateData , [info.name] :info.value }
    }); 

  if(emptyFeild == true){
    $('button[type="submit"]').removeAttr('disabled');
    return
  }

  

   sendAPIRequest("POST" , "rates/addAdvanceRate",advanceRateData,{}).then(response => {
  if (response.ok) return response.json();
  return response.json().then(response => { 
      
    throw new Error(response.message)})
}).then((responseJson)=>{
  showToster("Success",responseJson.message)
  
  // let newRate  =  advanceRate(responseJson.data)

  // $('#advanceRateData').append(newRate);
  $('button[type="submit"]').removeAttr('disabled');
          uploadedAdvanceRate.push(responseJson.data);
          $('input[type=radio][name=sheetdId]').change(function() {
              
            UpdateTableData($(this).val())

          });

          setTimeout(()=>{document.location.href = 'advanced-rate.html'},100)
          return
 
   





}).catch(e =>{
   showToster("Error",e.message)
   $('button[type="submit"]').removeAttr('disabled');


})
 
});






// Showing Uploaded rates

let ShowAdvanceRate = function(){  
    
  sendAPIRequest("GET" , "rates/advanerate",{},{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{

    uploadedAdvanceRate = responseJson.data;
    
   let {data, count } = responseJson;
    if(data.length >0){
      let newRate =  advanceRate(data)
      
  $('#advanceRateData').append(newRate);
  
  $('input[type=radio][name=sheetdId]').change(function() {
            
    UpdateTableData($(this).val())

});
      return
}
  
  }).catch(e =>{
       showToster("Error",e.message)
       $('button[type="submit"]').removeAttr('disabled');
    
       })

}


    let advanceRate = (data) => {
      return`<table id="" class="table table-striped table-bordered zero-configuration">
              <thead>
                  <tr>
                      <th>Select</th>
                      <th></th>
                      <th>Kg FAT</th>
                      <th>Kg SNF</th>
                      <th>Min.FAT</th>
                      <th>Max.FAT</th>
                      <th>Min.SNF</th>
                      <th>Max.SNF</th>
                      <th>Action</th>
                      
                      
                  </tr>
              </thead>
              <tbody>
                    
              <td><input type="radio" name="sheetdId" value="${data[0]._id}" ><td>
                      <td>${data[0].kg_fat}</td>
                      <td>${data[0].kg_snf}</td>
                      <td>${data[0].min_fat}</td>
                      <td>${data[0].max_fat}</td>
                      <td>${data[0].min_snf}</td>
                      <td>${data[0].max_snf}</td>
                      <td><button type="button" onClick = "deleteSheet('${data[0]._id}')" class="btn mb-1 btn-rounded btn-dark">Delete</button><td>
              </tbody>
          </table>`

        }




  // Delete Rate Function

    function deleteSheet(data_id){
                
      sendAPIRequest("POST" , `rates/deleteFile/${data_id}`,{},).then(response => {
          if (response.ok) return response.json();
          return response.json().then(response => { 
              
            throw new Error(response.message)})
            
      }).then((responseJson)=>{
          showToster("Success",responseJson.message)
        
          $('button[type="submit"]').removeAttr('disabled');
          
          
          
          $(`#${data_id}`).remove();

          setTimeout(()=>{document.location.href = 'advanced-rate.html'},100)

          return
        
          
      
      }).catch(e =>{
          showToster("Error",e.message)
        
    })  
    }





//  Account Showing Function

let ShowAllAccounts = function(){

  sendAPIRequest("GET" , "users/list",{},{}).then(response => {
      if (response.ok) return response.json();
      return response.json().then(response => { 
          
        throw new Error(response.message)})
  }).then((responseJson)=>{
      let {rows, count } = responseJson.data;
      allVendors = rows 
      rows.forEach((row =>{
        let newRow= addTableRow(row)
  
        $("#allAccountTable").find('tbody').append(newRow)
      
      }))
      $('#allAccountTable').DataTable()
      // setToken("x-access-token",data.token);
      // showToster("Success",message);
  
      // setTimeout(()=>{document.location.href = 'index.html'},2000)
      
      return
  
  
  }).catch(e =>{
       showToster("Error",e.message)
       $('button[type="submit"]').removeAttr('disabled');
    
       })
     
  
}

let openModal =(id)=>{
      
  $('#modalGrid').modal('show');
  $('#modalData').html("Loading Please wait..")
  sendAPIRequest("GET" , `users/vendor/${id}`,{},{}).then(response => {
        if (response.ok) return response.json();
          return response.json().then(response => { 
              
            throw new Error(response.message)})
      }).then((responseJson)=>{
          console.log(responseJson)
       let {data, count } = responseJson;
          let modalHtml = ` <div class="row">
          <div class="col-8" >Vendor code: <h6 style ="display:inline">${data.vendor_id} </h6> </div>
          <div class="col-8">Vendor Name : <h6 style ="display:inline"> ${data.name}  </h6></div>
          <div class="col-8">Father's Name : <h6 style ="display:inline"> ${data.father_name} </h6> </div>
          <div class="col-8">Phone No. : <h6 style ="display:inline"> ${data.phone}</h6> </div> 
          <div class="col-8">PAN No. : <h6 style ="display:inline">${data.pan_number} </h6></div>
          <div class="col-8">Address : <h6 style ="display:inline">${data.address} </h6></div>
          <div class="col-8">Aadhar No. : <h6 style ="display:inline"> ${data.aadhar_number} </h6> </div>
          <div class="col-8">GSTIN No. :<h6 style ="display:inline"> ${data.gst_no} </h6></div>
          <div class="col-8">Bank Name : <h6 style ="display:inline">${data.bank_name} </h6></div>
          <div class="col-8">Branch Name : <h6 style ="display:inline">${data.bank_branch} </h6></div>
          <div class="col-8">Account No. :<h6 style ="display:inline"> ${data.account_number} </h6></div>
          <div class="col-8">IFSC Code :  <h6 style ="display:inline">${data.bank_ifsc}</h6> </div>
      </div>`
      $('#modalData').html(modalHtml)
          return
      
      
      }).catch(e =>{
           showToster("Error",e.message)
           $('button[type="submit"]').removeAttr('disabled');
        
           })
  
      $("#editFromModal").attr("href", `edit.html?id=${id}`)
   }
  
let addTableRow =(data,matach =false) =>{

 let checked =(matach)?"Checked" : ""
     
    return` </tr>
      <tr>
          <td><input id="${data._id}" type="checkbox" ${checked} ></td>
          <td> <a href="#" onclick= openModal('${data._id}') class="link-info" data-target="#modalGrid">${data.vendor_id}</a></td>
          <td>${data.name}</td>
          <td>${data.email}</td>
          <td>${data.phone}</td>
          <td>${data.address}</td>
          
      </tr>`
     
}
  


  // Assigning Rates
    
  $('#assignRates').click((e)=>{
 
     let selectedVendors =[];
     let sheet_id = $('input[name="sheetdId"]:checked').val();
       console.log($('input[name="sheetdId"]:checked').val())
     $('input[type="checkbox"]:checked').each(function(){
      selectedVendors.push($(this).attr("id"));
  });

  
let bodydata = {
    "vendors" : selectedVendors,
    "sheet_id" :  sheet_id,
    "is_advance_rate": true,
}
    sendAPIRequest("POST" , "rates/assignRates",bodydata,{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
      
      
        // setToken("x-access-token",data.token);
        showToster("Success",responseJson.message);

        setTimeout(()=>{document.location.href = 'advanced-rate.html'},500)
        
        return


    }).catch(e =>{
        showToster("Error",e.message)
        // $('button[type="submit"]').removeAttr('disabled');
      
        })
    })




//  Updating All Accounts Table After Assigning Rates
    
function UpdateTableData(sheetId){
  
   let selectedSheet = uploadedAdvanceRate.filter(sheet=> sheetId==sheet._id);
  //  let selectedSheet = $('input[name="sheetdId"]:checked').attr(checked);
   //  let selectedSheet = uploadedsheets.;
 
  if(selectedSheet.length > 0 && selectedSheet[0].assignedVendors.length > 0 ) {
     

     $('#allAccountTable').DataTable().destroy();
     $("#allAccountTable > tbody").empty();

     allVendors.forEach((row =>{
      let checked = selectedSheet[0].assignedVendors.includes(row._id)
      let newRow= addTableRow(row,checked )
  
      $("#allAccountTable").find('tbody').append(newRow)
    }))

      $('#allAccountTable').DataTable()
  }
  
  else{
     $('#allAccountTable').DataTable().destroy();
     $("#allAccountTable > tbody").empty();

     allVendors.forEach((row =>{
    
     let newRow= addTableRow(row,false )
 
     $("#allAccountTable").find('tbody').append(newRow)   
   }))

     $('#allAccountTable').DataTable()
  }
  

}


ShowAllAccounts();

ShowAdvanceRate()



