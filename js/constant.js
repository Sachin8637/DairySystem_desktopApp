let baseUrl = "http://3.20.51.182";
//let baseUrl = "http://localhost:3000";
let title = "Dairy System : A Solution for your dairy business...";
let shift = "" ;
document.title = title;
$('meta[name="description"]').attr("content", title);

let sendAPIRequest = async function(method="GET",URL="NA",body ={}, ...otherInfo){

 let bodyData = {};
 if(method!="GET"){
  const rawResponse = await fetch(`${baseUrl}/${URL}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token' :localStorage.getItem('x-access-token'),
      ...otherInfo
    },
    body: JSON.stringify(body)
  });
  return  rawResponse;
}else{
  const rawResponse = await fetch(`${baseUrl}/${URL}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token'   :localStorage.getItem('x-access-token'),
      ...otherInfo
    },
  
  });
 
    return  rawResponse;

}

}

let getToken = (key)=>{ return localStorage.getItem(key); }
let setToken = (key,value)=>{localStorage.setItem(key, value) }
let clearToken = (key)=>{localStorage.clear() }


$('#brand_logo').html(`<a href="index.html">
<b class="logo-abbr"><img src="images/header-logo.png" alt=""> </b>
<span class="logo-compact"><img src="./images/splashlogo.png" alt=""></span>
<span class="brand-title" style="width: auto; height: auto; margin-right: 30%; margin-bottom: 20%;" >
    <img src="images/splashlogoheader.png" alt="">
</span>
</a>`)


let showToster = function(type, message){

   if(type == "Success"){
    toastr.success("Success",`${message}`,{positionClass:"toast-top-full-width",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
     
   }else{
    toastr.error("Error Message",`${message}`,{positionClass:"toast-top-full-width",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
  
   }

}
    

// For Constant Footer    
const year = new Date().getFullYear();
const Footer = () => ( 
    `<div class="copyright" style="margin-right: 18%;">
         <p> Copyright &copy; Designed and Developed By <a href="#">Shankra Research</a> ${year} </p>
     </div>`
     );
    $( ".footer" ).append(Footer() );
    

    
//  TOshow Current Date
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let dateToShow = dd + '/' + mm + '/' + yyyy;
    $("#currentDate").val(dateToShow);


// TO show Current Time in AM/PM Format
     let hours = today.getHours();
     let minutes = today.getMinutes();
     let ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12;
     minutes = minutes.toString().padStart(2, '0');
     let strTime = hours + ':' + minutes + ' ' + ampm;
     $("#currentTime").val(strTime);

    
//  For Current Shift    
     let curHr = today.getHours()
      if (curHr < 12) {
        shift = "Morning";
        $("#shift").val(shift);
      } else {
        shift = "Evening";
        $("#shift").val(shift);
      }



    //   Maximum or Minimum value function

   
      function imposeMinMax(el){
        if(el.value != ""){
          if(parseInt(el.value) < parseInt(el.min)){
            el.value = el.min;
          }
          if(parseInt(el.value) > parseInt(el.max)){
            el.value = el.max;
          }
        }
      }


// for checkbox list
    $(function() {
        //If check_all checked then check all table rows
        $("#check_all").on("click", function () {
          if ($("input:checkbox").prop("checked")) {
            $("input:checkbox[name='row-check']").prop("checked", true);
          } else {
            $("input:checkbox[name='row-check']").prop("checked", false);
          }
        });
      
        // Check each table row checkbox
        $("input:checkbox[name='row-check']").on("change", function () {
          var total_check_boxes = $("input:checkbox[name='row-check']").length;
          var total_checked_boxes = $("input:checkbox[name='row-check']:checked").length;
      
          // If all checked manually then check check_all checkbox
          if (total_check_boxes === total_checked_boxes) {
            $("#check_all").prop("checked", true);
          }
          else {
            $("#check_all").prop("checked", false);
          }
        });
    });


let uploadFile = async function(method="GET",URL="NA",body ={}, ...otherInfo){
    const rawResponse = await fetch(`${baseUrl}/${URL}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'x-access-token'   :localStorage.getItem('x-access-token'),
            ...otherInfo
        },
          body: body
    });
     
          return  rawResponse;
      
}


    // let showSweetAlert = function(type, message){

    //     if(type == "Success"){
    //      sweetAlert.success("Success",`${message}`,{positionClass:"toast-top-full-width",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
          
    //     }else{
    //      sweetAlert.error("Error Message",`${message}`,{positionClass:"toast-top-full-width",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
       
    //     }
     
    // }


    //  $(function preloader(){
    //   $('#main-wrapper').removeClass('show');
    //   $('#preloader').show();
    
  
    //   $('#main-wrapper').addClass('show');
    //   $('#preloader').hide();

        
    $('#sideBar').html(`<div class="nk-sidebar">           
    <div class="nk-nav-scroll">
        <ul class="metismenu" id="menu">
            <li class="nav-label"></li>
            <li>
                <a class="#" href="./index.html" aria-expanded="false">
                    <i class="icon-home"></i><span class="nav-text"> Home</span>
                </a>
            
            </li>
            <li class="mega-menu mega-menu-sm">
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-note menu-icon"></i><span class="nav-text">Accounts</span>
                </a>
                <ul aria-expanded="false">
                    <li><a href="./add-account.html">Add Account</a></li>
                    <li><a href="./all-accounts.html">All Accounts</a></li>
                    
                </ul>
            </li>
            
            <li>
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-screen-tablet menu-icon"></i> <span class="nav-text">Task</span>
                </a>
                <ul aria-expanded="false">
                    <li><a href="./milk-collection.html">Milk Collection</a></li>
                    <li><a href="./milk-sale.html">Milk Sale</a></li>
                    <li><a href="./item-sale.html">Item Sale</a></li>
                    <li><a href="./payments.html">Payments</a></li>
                    <li><a href="./stock-update.html">Stock Update</a></li>
                    <li><a href="./dispatch.html">Dispatch</a></li>
                    <li><a href="./deduct.html">Deduct</a></li>
                    <li><a href="./bonus.html">Bonus</a></li>
                </ul>
            </li>

            <li>
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-graph menu-icon"></i><span class="nav-text">Reports</span>
                </a>
                <ul aria-expanded="false">
                    <li><a href="./purchase-report.html">Purchase Report</a></li>
                    <li><a href="./sales-report.html">Sales Report</a></li>
                    <li><a href="./payment-report.html">Payment Report</a></li>
                    <li><a href="./stock-report.html">Stock Report</a></li>
                    <li><a href="./union-sales-report.html">Union Sales Report</a></li>
                </ul>
            </li>

            <li>
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-globe-alt menu-icon"></i> <span class="nav-text">Rate Management</span>
                </a>
                <ul aria-expanded="false">
                    <li><a href="./import-rate.html">Improt Rate</a></li>
                    <li><a href="./flat-rate.html">Flat Rate</a></li>
                    <li><a href="./advanced-rate.html">Advanced Rate</a></li>
                    
                </ul>
            </li>

            
            <li>
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-grid menu-icon"></i><span class="nav-text">Database Management</span>
                </a>
                <ul aria-expanded="false">
                    <li><a href="./import-data.html">Import Data</a></li>
                    <li><a href="./export-data.html">Export Data</a></li>
                </ul>
            </li>

            <li>
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-settings menu-icon"></i><span class="nav-text">Setting & Tools</span>
                </a>
                <ul aria-expanded="false"> 
                    <li><a href="./resolution.html">Resolution</a></li>
                    <li><a href="./language.html">Language</a></li>
                    <li><a href="./analyser-data.html">Ananlyser Data</a></li>
                    <li><a href="./weighting-scale.html">Weighting Scale</a></li>
                    <li><a href="./edit-snf-formula.html">Edit SNF Formula</a></li>
                    <li><a href="./format-date-time.html">Format Date and Time</a></li>
                    <li><a href="./edit-username.html">Edit Username</a></li>
                    <li><a href="./edit-password.html">Edit Password</a></li>
                </ul>
            </li>

            <li>
                <a href="help-desk.html" aria-expanded="false">
                    <i class="icon-badge menu-icon"></i><span class="nav-text">Help Desk</span>
                </a>
            </li>

            
            
        </ul>
    </div>
</div>`)

function downloadFromUrl(url){
  var link = document.createElement('a');
  link.href = url;
  link.click();
  link.remove();
      
}

  





let getVendorslisting = function(){

  sendAPIRequest("GET" ,"users/search",{},{}).then(response => {
    if (response.ok) return response.json();
    return response.json().then(response => { 
          
        throw new Error(response.message)})
}).then((responseJson)=>{

    vendorsData = responseJson.data;
    let html =``
    
    vendorsData.forEach((row =>{
      html += `<option value=${row._id}>${row.vendor_id}</option>`
      
    }))
  
      $("#vendorListData").append(html)
      $('.selectpicker').selectpicker('refresh');
  
      return
    
    
  }).catch(e =>{
      showToster("Error",e.message)
      $('button[type="submit"]').removeAttr('disabled');
      
  })
  
    
        
  }