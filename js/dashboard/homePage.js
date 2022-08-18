//    Profile Section

function addNote(note){
  return `<div class="media media-reply" id='${note._id}' >
            <!-- <img class="mr-3 circle-rounded" src="images/avatar/2.jpg" width="50" height="50" alt="Generic placeholder image"> -->
            <div class="media-body">
                <div class="d-sm-flex justify-content-between mb-2">
                    <h5 class="mb-sm-0">${moment(note.createdAt).fromNow()} <small class="text-muted ml-3"></small></h5>
                    <div class="media-reply__link">

                        <button onClick="deleteNote('${note._id}')" class="btn btn-transparent p-0 ml-3 font-weight-bold">Delete</button>
                    </div>
                </div>
                <p>${note.text}</p>
            </div> 
            
         </div>`
}

 let ShowProfile = function(){  
    
        sendAPIRequest("GET" , "users/profile",{},{}).then(response => {
            if (response.ok) return response.json();
            return response.json().then(response => { 
                
              throw new Error(response.message)})
        }).then((responseJson)=>{
            console.log(responseJson)
         let {data, count } = responseJson;
            let profile = ` <div class="card-body">
            <div class="media align-items-center mb-4">
                <img class="mr-3" src="images/user-icons.png" width="80" height="80" alt="">
                <div class="media-body">
                    <h3 class="mb-0">${data.name}</h3>
                </div>
            </div>
            
            <div class="row mb-5">
                <div class="col">
                    <div class="card card-profile text-center">
                        <span class="mb-1 text-primary"><i class="icon-people"></i></span>
                        <h3 class="mb-0">${data.vendor_count}</h3>
                        <p class="text-muted px-4">Total Vendors</p>
                    </div>
                </div>
                
                <div class="col-12 text-center">
                    <a href="./add-account.html">
                    <button class="btn btn-danger px-5">Add Vendor</button>
                    </a>
                </div>

                
            </div>

            
            <ul class="card-profile__info">
                <li class="mb-1"><strong class="text-dark mr-4">Mobile : </strong> <span> ${data.phone}</span></li>
                <li><strong>Email : </strong> <span>${data.email}</span></li>
            </ul>
        </div>`
        $('#profileData').html(profile)
            return
        
        
        }).catch(e =>{
             showToster("Error",e.message)
             $('button[type="submit"]').removeAttr('disabled');
          
             })
    
     }
     
    
    

    
    ShowProfile();


$("#add-message").submit(async function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $('button[type="submit"]').attr('disabled','disabled');                
    var data =  {text: $("#textMessage").val()}


    sendAPIRequest("POST" , "users/notes/add",data,{}).then(response => {
         if (response.ok) return response.json();
         return response.json().then(response => { 
             
           throw new Error(response.message)})
           
     }).then((responseJson)=>{
         showToster("Success",responseJson.message)
        
         $('button[type="submit"]').removeAttr('disabled');
         let profileMessage =  addNote(responseJson.note);
         $('#postMessage').prepend(profileMessage)
         $("#textMessage").val("")
         return
        
     
     }).catch(e =>{
          showToster("Error",e.message)
       
   }) 
         
      });





let ShowMassage = function(){  
    
    sendAPIRequest("GET" , "users/profile",{},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
                
          throw new Error(response.message)})
    }).then((responseJson)=>{
         console.log(responseJson)
        let {data, notes, count } = responseJson;
               
        notes.forEach(note => {
            let profileMessage =  addNote(note);
        $('#postMessage').prepend(profileMessage)
         });
           
             return
               
    }).catch(e =>{
         showToster("Error",e.message)
         $('button[type="submit"]').removeAttr('disabled');
          
         })
    
}


function deleteNote(note_id){
            
    sendAPIRequest("POST" , `users/notes/delete/${note_id}`,{},).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
                
          throw new Error(response.message)})
              
    }).then((responseJson)=>{
        showToster("Success",responseJson.message)
           
        $('button[type="submit"]').removeAttr('disabled');
            
            
            
        $(`#${note_id}`).remove();
            
            return
           
        
    }).catch(e =>{
         showToster("Error",e.message)
          
      })  
     }


     
    
    
let ShowBanner = function(){  
    
    sendAPIRequest("GET" , "users/settings",{},{}).then(response => {
        if (response.ok) return response.json();
        return response.json().then(response => { 
                
          throw new Error(response.message)})
    }).then((responseJson)=>{
        console.log(responseJson)
        let {data} = responseJson;
               
        data.forEach(banner => {
           
            let bannerData =  `<div class="col">
            <div class="card">
                <div class="card-body">
                    <p>${banner.text}</p>
                </div>
            </div>
            </div>`
        $('#banner').prepend(bannerData)
         });
           
            return
        
        
    }).catch(e =>{
        showToster("Error",e.message)
        
          
        })
    
     }

    ShowBanner();
    ShowMassage();