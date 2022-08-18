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
        let {rows, count } = responseJson.data;      
        $('#milkCollectionRecord').DataTable().destroy();

       $("#milkCollectionRecord > tbody").empty();
     
        rows.forEach((row =>{
          let newRow= addTableRow(row)
    
          $("#milkCollectionRecord").find('tbody').append(newRow)
        
        }))
        
       
        $('#milkCollectionRecord').DataTable().draw();         
        $('button[type="submit"]').removeAttr('disabled');
        return
    
    
    }).catch(e =>{
         showToster("Error",e.message)
         
         $('button[type="submit"]').removeAttr('disabled');
      
         })
       
    
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