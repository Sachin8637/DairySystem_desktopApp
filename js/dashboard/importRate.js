    // Upload File
    

     let  uploadedsheets = [];
     let allVendors  =[];
    $("#uploadFile").submit(async function(e) {
  
        e.stopImmediatePropagation();
        e.preventDefault();
        if(uploadedsheets.length >= 5){
          showToster("Warning","Not allowed to upload more than 5 files")
          return;
        }
        $('button[type="submit"]').attr('disabled','disabled');

        var input = document.querySelector('input[type="file"]')
        var data = new FormData()
        data.append('file', input.files[0])
      
  
        uploadFile("POST" , "rates/uploadrate",data,{}).then(response => {
          if (response.ok) return response.json();
          return response.json().then(response => { 
              
            throw new Error(response.message)})
            
      }).then((responseJson)=>{
          showToster("Success",responseJson.message)
          let newSheet= addSheetinList(responseJson.rate)
                
          $("#sheetList").append(newSheet)
          $('button[type="submit"]').removeAttr('disabled');
          $('#loadFile').val("")
          uploadedsheets.push(responseJson.rate);
          $('input[type=radio][name=sheetdId]').change(function() {
              
            UpdateTableData($(this).val())

          });
          return;
        
      
      }).catch(e =>{
          showToster("Error",e.message)
          
          
        
      })  
  
  
 })


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
    


let getSheetList = function(){

    sendAPIRequest("POST" , "rates/getfiles",{},{}).then(response => {
          if (response.ok) return response.json();
          return response.json().then(response => { 
              
            throw new Error(response.message)})
    }).then((responseJson)=>{
        
        uploadedsheets = responseJson.data;

        uploadedsheets.forEach((row =>{
           let newSheet= addSheetinList(row)
              
            $("#sheetList").append(newSheet)
          
          }))

      $('input[type=radio][name=sheetdId]').change(function() {
            
                  UpdateTableData($(this).val())
            
        });
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

      

let addSheetinList =(data) =>{
    return` <div class="radio mb-3" id="">
    
   <div id="${data._id}">
          <label><input type="radio" name="sheetdId" value="${data._id}"> <img class ="csvfile" src="images/csv.jpg"> ${data.name_in_date_format}</label>
                        <div class="rounded-button" style="float:right">
                                    <button type="button" onClick = "deleteSheet('${data._id}')" class="btn mb-1 btn-rounded btn-dark">Delete</button>
                        </div>
   </div>
</div>`
     
}


  
  
function deleteSheet(data_id){
            
    sendAPIRequest("POST" , `rates/deleteFile/${data_id}`,{},).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
          
    }).then((responseJson)=>{
        showToster("Success",responseJson.message)
       
        $('button[type="submit"]').removeAttr('disabled');
        
        
        
        $(`#${data_id}`).remove();
        

        uploadedsheets = uploadedsheets.filter(sheet =>{
     
          return   sheet._id !=data_id
        })
       
        return
       
    
    }).catch(e =>{
         showToster("Error",e.message)
      
  })  
 }



    
 $('#assignRates').click((e)=>{
 
  let selectedVendors =[];
  let sheet_id = $('input[name="sheetdId"]:checked').val();
    console.log($('input[name="sheetdId"]:checked').val())
  $('input[type="checkbox"]:checked').each(function(){
   selectedVendors.push($(this).attr("id"));
});


let bodydata = {
 "vendors" : selectedVendors,
 "sheet_id" :  sheet_id
}
 sendAPIRequest("POST" , "rates/assignRates",bodydata,{}).then(response => {
     if (response.ok) return response.json();
     return response.json().then(response => { 
         
       throw new Error(response.message)})
 }).then((responseJson)=>{
   
   
     // setToken("x-access-token",data.token);
     showToster("Success",responseJson.message);

     // setTimeout(()=>{document.location.href = 'index.html'},2000)
     
     return


 }).catch(e =>{
     showToster("Error",e.message)
     // $('button[type="submit"]').removeAttr('disabled');
   
     })
 })

function UpdateTableData(sheetId){
  
   let selectedSheet = uploadedsheets.filter(sheet=> sheetId==sheet._id);
  
 
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

getSheetList()