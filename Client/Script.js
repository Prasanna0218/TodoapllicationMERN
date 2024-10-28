let form=document.getElementById('form');
let input=document.getElementById("inputwork");
let ul=document.getElementById("display_ul");
let trashbtn=document.getElementById("trashbtn");
let URL="http:localhost:4000"
function addingdatastodb(){
  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let workobj={
      work:input.value,
    };
    fetch(URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(workobj)
    })
    .then((response)=>response.json())
    .then((datas)=>{
          let lastdata=datas[datas.length-1];
          creatingdisplaylists(lastdata,datas.length-1);
    })
    .catch((error)=>{
      console.log(error);
    })
    input.value="";
  })
}

//displaying all the conetents:-
function displayalllists()
{
  fetch(URL,{
    method:"GET"
  })
  .then(res=>res.json())
  .then(datas=>{
    datas.forEach((element,index) => {
      creatingdisplaylists(element,index);
    });
  })
  .catch((error)=>{console.log(error)})
}

//displaying recently added elements:-
function displaylastadded(){
  fetch()
}
//creating display lists :-
function creatingdisplaylists(element,index)
{
  let li = document.createElement("li");
    li.classList.add("display_li");
    console.log(element);
    ul.appendChild(li);
  
    // Container div
    let div = document.createElement("div");
    div.classList.add("display_li_div");
    li.appendChild(div);
  
    // Serial number with hidden tick
    let p1 = document.createElement("p");
    p1.innerText = `${index + 1}.`;
    let p1span = document.createElement("span");
    p1span.innerText = "✅";
    p1span.classList.add("tick");
    p1span.style.display = "none"; // Initially hidden
    p1.appendChild(p1span);
    p1.classList.add('firstpara');
    div.appendChild(p1);
  
    // Task text
    let p2 = document.createElement("p");
    p2.innerText = `${element.work}`;
    p2.classList.add("task-text");
    div.appendChild(p2);
  
    // Complete button
    let button = document.createElement("button");
    button.classList.add("compbtn");
    button.setAttribute("title","Click here to tick as work is Completed")
    button.innerHTML = `Completed <i class="fa-regular fa-thumbs-up"></i>`;
    div.appendChild(button);
  
    // Delete button
    let div2 = document.createElement("div");
    li.appendChild(div2);
    let button2 = document.createElement("button");
    button2.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    button2.classList.add("ind_delete");
    button2.setAttribute("title","Click here to Delete this work")
    div2.appendChild(button2);

    //complete button listener
    button.addEventListener('click',()=>{
      p2.classList.toggle('strike');
      p1span.style.display=p1span.style.display=="none"?"inline":"none";
    })

    //deleting individual lists:-
    button2.addEventListener('click',(event)=>{
        let button=event.currentTarget;
        let li=button.closest('.display_li');
        let itemid={id:element._id};
        fetch(URL,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(itemid)
        })
        .then(response=>{
          if(!response){
            throw new error("Not able to delete the element!")
          }
          response.json();
        })
        .then(()=>li.remove());
    })

    //deleting all lists:-
    trashbtn.addEventListener('click',()=>{
      let msg={
        message:"Delete all the lists"
      }
      fetch(URL + '/cdelete',{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(msg)
      })
        ul.innerHTML="";
    })
 }
addingdatastodb();
displayalllists();