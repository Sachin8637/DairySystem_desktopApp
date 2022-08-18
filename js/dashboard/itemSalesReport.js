$("#itemSalesReport").submit(async function(e) {
    console.log("in")
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

    
    ShowitemSale(itemSaleData);
   
});


let ShowitemSale = function(itemSaleData){

    sendAPIRequest("POST" , "collection/sale/list",itemSaleData,{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        let {rows, count } = responseJson.data; 
        $('#itemSaleRecord').DataTable().destroy();

       $("#itemSaleRecord > tbody").empty();
     
        rows.forEach((row =>{
          let newRow= addTableRow(row)
    
          $("#itemSaleRecord").find('tbody').append(newRow)
        
        }))
        $('#itemSaleRecord').DataTable().draw(); 
        
        $('button[type="submit"]').removeAttr('disabled');
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
              <td>${data.id}</td>
              <td>${data.vendor_name}</td>
              <td>${data.cattle_type}</td>
              <td>${data.fat}</td>
              <td>${data.weight}</td>
              <td>${data.rate}</td>
              <td>${data.amount}</td>
              
          
              
          </tr>`
         
}


//ShowItemSale();

function deleteitemSale(data_id){
            
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