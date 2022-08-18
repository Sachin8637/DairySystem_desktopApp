let vendorsData = [];
let currentVendorRate = [];
let VendorRateData ;

    $("#add-milk-collection").submit(async function(e) {
        console.log("in")
        e.stopImmediatePropagation();
        e.preventDefault();
        $('button[type="submit"]').attr('disabled','disabled');
      
        let formData = $(this).serializeArray();
        let emptyFeild = false;
        let form = this;
        let milkCollectionData = {};
        formData.forEach(function(info) {
            //   if(info.value ==""){
            //       emptyFeild = true;
            //   }
              milkCollectionData = {...milkCollectionData , [info.name] :info.value }
          }); 
      
        if(emptyFeild == true){
          $('button[type="submit"]').removeAttr('disabled');
          return
        }

        

        //milkCollectionData.vendor_id = $('#vendor_id').attr("id")

        
        sendAPIRequest("POST" , "collection/milk",milkCollectionData,{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        showToster("Success",responseJson.message)
        $('button[type="submit"]').removeAttr('disabled');

// Reload DataTable after submit MilkCollection
                      sendAPIRequest("POST" , "collection/list",{type : shift},{}).then(response => {
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
                        $('#milkCollectionRecord').DataTable();
                                                
                        return
                                        
                      })

      
//  For Making inputs blank (form)

            function handleClick() {

              const inputs = document.querySelectorAll('#vendor_id, #vendorName,#milkCollectionCattleType ,#milkCollectionFat ,#milkCollectionSnf ,#milkCollectionWeight ,#milkCollectionRate ,#milkCollectionAmount');

              inputs.forEach(input => {
                input.value = '';
              });
            }
            $('button[type="submit"]').append(handleClick); 


        // setTimeout(()=>{document.location.href = 'milk-collection.html'},2000)      


    }).catch(e =>{
        showToster("Error",e.message)
        $('button[type="submit"]').removeAttr('disabled');
      

    })
      
    });



let ShowMilkCollection = function(){


    sendAPIRequest("POST" , "collection/list",{type : shift},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
            
          throw new Error(response.message)})
    }).then((responseJson)=>{
        let {rows, count } = responseJson.data;
      //   $('#milkCollectionRecord').DataTable().destroy();

      //  $("#milkCollectionRecord > tbody").empty();
        rows.forEach((row =>{
          let newRow= addTableRow(row)
    
          $("#milkCollectionRecord").find('tbody').append(newRow)
        
        }))
        $('#milkCollectionRecord').DataTable();
        
        // $('#milkCollectionRecord').DataTable().draw();         
        
        
        

        
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
              <td>${data.snf}</td>
              <td>${data.weight}</td>
              <td>${data.rate}</td>
              <td>${data.amount}</td>
              
          
              
          </tr>`
         
    }
      
   ShowMilkCollection();

//  CattleType Function

$("#milkCollectionFat").on("keyup", function(e) {

  let fat =parseFloat($("#milkCollectionFat").val());
     if (fat > 0 && fat <= 5){
       $("#milkCollectionCattleType").val("Cow");
     } else if (fat > 5 && fat <= 12){
       $("#milkCollectionCattleType").val("Buffalo");
     }
     else {
       $("#milkCollectionCattleType").val("");
     }
})


//  Amount Function

$('#milkCollectionFat, #milkCollectionSnf').keyup(function(){
    var fat = parseFloat($('#milkCollectionFat').val()) || 0;
    var snf = parseFloat($('#milkCollectionSnf').val()) || 0;
        
    let rateValue =  getRateValue(fat,snf)

    $('#milkCollectionRate').val(rateValue);
        calculateAmount()    
});

  $('#milkCollectionWeight, #milkCollectionRate').on("change keyup",function(){
      calculateAmount()
        
  });

  
function calculateAmount() {
    var weight = parseFloat($('#milkCollectionWeight').val()) || 0;
    var rate = parseFloat($('#milkCollectionRate').val()) || 0;
    
    $('#milkCollectionAmount').val((weight * rate).toFixed(2));   
  }




// Get Advance Rate

let getRateValue =function getRateValue(fat,snf) {

    if(!VendorRateData.is_advance_rate) {
      if(currentVendorRate.length ==0){
        
       return 
      }else{
                let rateValue = currentVendorRate.filter(r=>{
                  return r[0] ==fat
        })
        
        return rateValue[0][snf]
      }
    } else {
      let {kg_fat , kg_snf } = VendorRateData ;

      let perLiterFat =100/fat;
      let perLiterSnf = 100/snf;
      return  Math.round(kg_fat/perLiterFat + kg_snf/perLiterSnf)

    }
   
 }

 
 



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
            VendorRateData = responseJson.data;
            currentVendorRate = responseJson.data.rates_list
          }
          
      
      }).catch(e =>{
           showToster("Error",e.message)
           $('button[type="submit"]').removeAttr('disabled');
        
           })
      
    })
    
    getVendorslist()






// function deleteMilkCollection(data_id){
            
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
    
// })  
// }


function downloadFile(condition){
  $('#main-wrapper').removeClass('show');
  $('#preloader').show();

  sendAPIRequest("POST" , "collection/list",{ "extract":true,type : shift},{}).then(response => {
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
