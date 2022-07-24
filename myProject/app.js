console.log('welcome to app.js');
showNotes();


// let addBtn = document.getElementById("addBtn");
// addBtn.addEventListener("click", function(e) {
//   let addTxt = document.getElementById("addTxt");
//   let notes = localStorage.getItem("notes");
//   if (notes == null) {
//     notesObj = [];
//   } 
  
//   else if(addTxt.value.length==0){
//     Button.disabled=true;
//   }
//   else {
//     notesObj = JSON.parse(notes);
//   }
//   notesObj.push(addTxt.value);
//   localStorage.setItem("notes", JSON.stringify(notesObj));
//   addTxt.value = "";
// //   console.log(notesObj);
//   showNotes();
// });



let addBtn= document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){

    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    if(addTxt.value.length ==0){
        window.alert('Please Enter text');
    }
    else{
        let notes=localStorage.getItem("notes");
        if(notes== null) notesObj=[];
        else notesObj=JSON.parse(notes);
        
        let myObj ={
            text : addTxt.value, 
            title : addTitle.value
        }
        notesObj.push(myObj);
        localStorage.setItem("notes",JSON.stringify(notesObj));
        addTxt.value ="";
        addTitle.value="";
        console.log(notesObj);
        showNotes();
    }
    
});


function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes == null) notesObj=[];
    else notesObj=JSON.parse(notes); 

    let html="";
    notesObj.forEach(function(element,index){
        html+= `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title} </h5>
          <p class="card-text"> ${element.text} </p    >
          <button id="${index}" onclick=" deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
        </div>
      </div>     
                `; 
    });

    let notesElm= document.getElementById("notes");
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show! Add a Note`;
    }

}

function deleteNote(index){
    //console.log('i am deleting',index);
    let notes=localStorage.getItem("notes");
    if(notes== null) notesObj=[];
    else notesObj=JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

}

let searchTxt= document.getElementById('searchTxt');
searchTxt.addEventListener("input",function(){
        let inputVal=searchTxt.value.toLowerCase();
        //console.log("input event fired",inputVal);
        let noteCards= document.getElementsByClassName('noteCard');
        Array.from(noteCards).forEach(function(element){
            let cardTxt=element.getElementsByTagName("p")[0].innerText.toLowerCase();
            if(cardTxt.includes(inputVal)){
                element.style.display= "block";
            }
            else element.style.display="none";
        })

});


