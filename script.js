const title_Input = document.getElementById("title");
const des_Input = document.getElementById("description");
const AddNotes_btn = document.getElementById("addBtn");
const NotesContainer = document.getElementById("notesContainer");

//1.abb mujhe sabse pehle localstorage ke bare me sochna yeh ki pehle toh mujhe ek khali array bnnnaa h 
//abb me khali array bnaounga 

let notes = [];
const SavedNotes = localStorage.getItem("notes");
if(SavedNotes){
    notes = JSON.parse(SavedNotes);
    Startnotes(); 
}


//2.abb mujhe validation check krna h 
AddNotes_btn.addEventListener("click", ()=> {
    //isme mujhe user jo input usse ek variable me store krunga aur usme validation check krunga 
    const title = title_Input.value.trim(); //yeh trim kyy krega issme yeh user ne jo input kiya mtlb string usmese space ko kaat deta h ex: " sachin " =>after trim function use ke baad isko ese krenge hum "sachin" space kaatt diya
    const description = des_Input.value.trim();
    //abb hum if ka use krenge 
    if(title === "" || description === ""){
        alert("Please enter the title and descriptions!");
        return;
    }

    const notesObj = {
        title: title,
        description: description,
    }

    // editIndex ko upar global banaya hota hai
    // let editIndex = null;

    if (editIndex === null) {
      // NEW NOTE
      notes.push(notesObj);
    //   AddNotes_btn.innerText = "Add notes";
    } else {
      //  EDIT NOTE
      notes[editIndex] = notesObj;
      editIndex = null; // edit mode off
      AddNotes_btn.innerText = "Add notes";
    }

    //abb mujhe add krwna h kisme notes ke array aur kyy add krwana h mujhe jo mene object bnya h humne usemujhe abb notes array me .push krwna h
    // notes.push(notesObj);
    SaveToTheLocalStorage();
    Startnotes();
    //abb mene add krwa diya iske sath hii mujhe yeh bhi krna hoga jab bhi user kuch add kre toh usse ek fresh start mile uske liye mujhe title aur description box ko khali rkhwana padega 
    title_Input.value = "";
    des_Input.value = "";
    
});

//abb mujhe screen pe jo user ne add kiya usse title aur description ko mujhe page me store krwna h aur show bhi uske liye mujhe function create krna hoga
function Startnotes(){
    NotesContainer.innerHTML = ""
   notes.forEach((note,index)=>{
     const NotesDiv = document.createElement("div");//mene kyy kiya ki ek new fresh div bnawa liya aur usse hoga kyy jab user ne input dediya toh mujhe ek achhe ui pe usse show krwna h usse jo achaa lge 
    NotesDiv.className = "note-card";
    NotesDiv.innerHTML = 
    `<h3>${note.title}</h3>
        <p>${note.description}</p>
        <div class="btn-box">
          <button class="btn" onclick = "editNote(${index})">Edit</button>
        <button class="btn del" onclick = "deleteNote(${index})">Delete</button>
        </div>
    `;
    NotesContainer.appendChild(NotesDiv);
   });

}
function deleteNote(index){
    notes.splice(index,1);// array se note hata diya
    SaveToTheLocalStorage();//localStorage update
    Startnotes(); // screen refresh
}
let editIndex = null;
function editNote(index){
    title_Input.value = notes[index].title;
    des_Input.value = notes[index].description;
    editIndex = index;
    AddNotes_btn.textContent = "Update notes";
}

function SaveToTheLocalStorage(){
    localStorage.setItem("notes",JSON.stringify(notes));
}