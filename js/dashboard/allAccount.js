let ShowAllAccounts = function(){

sendAPIRequest("GET" , "users/list",{},{}).then(response => {
    if (response.ok) return response.json();
    return response.json().then(response => { 
        
      throw new Error(response.message)})
      
}).then((responseJson)=>{
    let {rows, count } = responseJson.data;
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
      console.log(id)
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

let addTableRow =(data) =>{
    return` </tr>
          <tr>
              <td><input id="check_all" type="checkbox"></td>
              <td> <a href="#" onclick= openModal('${data._id}') class="link-info" data-target="#modalGrid"  >${data.vendor_id}</a></td>
              <td>${data.name}</td>
              <td>${data.email}</td>
              <td>${data.phone}</td>
              <td>${data.address}</td>
              
          
              
          </tr>`
   
}

ShowAllAccounts();