// realtime database link:

// https://console.firebase.google.com/project/data-store-e33c2/database/data-store-e33c2-default-rtdb/data/~2F

 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
 import {getDatabase, ref, child, onValue, get, set, update, remove} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBOlb08vtobzsPn4SVH0QJImGUxlbeh0lA",
   authDomain: "data-store-e33c2.firebaseapp.com",
   databaseURL: "https://data-store-e33c2-default-rtdb.firebaseio.com",
   projectId: "data-store-e33c2",
   storageBucket: "data-store-e33c2.appspot.com",
   messagingSenderId: "42629128052",
   appId: "1:42629128052:web:8c3212d688420b59bb9621"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


let customer_number = 0;
let table_body = document.getElementById('t_body');

function addItemToTable(Name, Email, Number, Balance)
{
  // First Creating the table rows and cells:

  let t_row = document.createElement('tr');
  let t_data1 = document.createElement("td");
  let t_data2 = document.createElement("td");
  let t_data3 = document.createElement("td");
  let t_data4 = document.createElement("td");
  let t_data5 = document.createElement("td");
  let t_data6 = document.createElement('button');

// then inserting the data from the parameter's array:

  t_data1.innerHTML = ++customer_number;
  t_data2.innerHTML = Name;
  t_data3.innerHTML = Email;
  t_data4.innerHTML = Number;
  t_data5.innerHTML = Balance;
  t_data6.innerHTML = "Select Customer";
  t_data6.style.color = "white";
  t_data6.style.width = "300px";
  t_data6.style.borderColor = "white";

// then appending the table cells into the tale rows:

  t_row.appendChild(t_data1);
  t_row.appendChild(t_data2);
  t_row.appendChild(t_data3);
  t_row.appendChild(t_data4);
  t_row.appendChild(t_data5);
  t_row.appendChild(t_data6);
  
// then appending all of them into the table:
  table_body.appendChild(t_row);

  t_data6.addEventListener('click', selection = () =>
  {
    let roll_input = t_data1.innerHTML;
    let name_input = document.getElementById('name_input');
    let nat_input = document.getElementById('nat_input');
    let gender_input = document.getElementById('gender_input');
    let age_input = document.getElementById('age_input');
    let num_input = document.getElementById('number_input');
    let bal_input = document.getElementById('balance_input');
  
    let target_div = document.getElementById('info_customer_div');
    target_div.style.display = "block";
  
    const dbRef = ref(database);
    get(child(dbRef, "Customers/" + roll_input))
    .then((snapshot) =>{
      if(snapshot.exists())
      {
        name_input.value = snapshot.val().Name;
        nat_input.value = snapshot.val().Nationality;
        gender_input.value = snapshot.val().Gender;
        age_input.value = snapshot.val().Age;
        num_input.value = snapshot.val().Number;
        bal_input.value = snapshot.val().Customer_Balance;
  
      }
      else
      {
        alert(" No data found.");
      }
    } )
  }
  )
}

function addAllItemsToTable(Customer_Array)
{
   customer_number = 0;
   table_body.innerHTML = "";

   Customer_Array.forEach(element => {
    addItemToTable(element.Name, element.Email, element.Number, element.Customer_Balance);
    
   });
}

// function selection_customer()
// {
//   let roll_input = document.getElementById('roll_input');
//   let name_input = document.getElementById('name_input');
//   let nat_input = document.getElementById('nat_input');
//   let gender_input = document.getElementById('gender_input');
//   let age_input = document.getElementById('age_input');
//   let num_input = document.getElementById('number_input');
//   let bal_input = document.getElementById('balance_input');

//   let target_div = document.getElementById('info_customer_div');
//   target_div.style.display = "block";

//   const dbRef = ref(database);
//   get(child(dbRef, "Customers/" + roll_input.value))
//   .then((snapshot) =>{
//     if(snapshot.exists())
//     {
//       name_input.value = snapshot.val().Name;
//       nat_input.value = snapshot.val().Nationality;
//       gender_input.value = snapshot.val().Gender;
//       age_input.value = snapshot.val().Age;
//       num_input.value = snapshot.val().Number;
//       bal_input.value = snapshot.val().Customer_Balance;

//     }
//     else
//     {
//       alert(" No data found.");
//     }
//   } )
// }

// Getting Single Data Method:

function getAllDataOnce()
{
  const db_ref = ref(database);
  get(child(db_ref, "Customers"))
  .then((snapshot) => {
    var customers = [];
    snapshot.forEach((childSnapShot) => {
      customers.push(childSnapShot.val());
    });

    addAllItemsToTable(customers);

  })
}

// this is not realtime way of achieving data.
// window.onload = getAllDataOnce;

// Realtime Fetching Data From Firebase  Database:

function getRealtimeData()
{
  const db_ref = ref(database, "Customers");
  
  onValue(db_ref, (snapshot) => {
    var Customers_array = [];
    snapshot.forEach((childSnapShot) => {
      Customers_array.push(childSnapShot.val());
    });
    
    addAllItemsToTable(Customers_array);
  })
}

// Insert Data Into the Firebase Database Method:

function InsertData()
{
  var name_input = document.getElementById('name_inp');
var roll_input = document.getElementById('roll_inp');
var number_input = document.getElementById('number_inp');
var balance_input = document.getElementById('balance_inp');

  set(ref(database,"Students/" + roll_input.value), {
    std_name : name_input.value,
    std_roll:  roll_input.value,
    std_number: number_input.value,
    std_balance: balance_input.value
  })
  .then(() => alert("Data stored successfully."))
  .catch((error) => alert(error));

  roll_input.value = "";
  name_input.value = "";
  number_input.value = "";
  balance_input.value = "";

}

// Realtime Database method for updating any data:

function UpdateData()
{
  var name_input = document.getElementById('name_inp');
var roll_input = document.getElementById('roll_inp');
var number_input = document.getElementById('number_inp');
var balance_input = document.getElementById('balance_inp');

update(ref(database,"Students/" + roll_input.value), {
  std_name : name_input.value,
  std_roll:  roll_input.value,
  std_number: number_input.value,
  std_balance: balance_input.value
})
.then(() => alert("Data updated successfully."))
.catch((error) => alert(error));

roll_input.value = "";
name_input.value = "";
number_input.value = "";
balance_input.value = "";
}

// Realtime Database method for deleting any data:

function RemoveData()
{
var roll_input = document.getElementById('roll_inp');

  remove(ref(database,"Students/" + roll_input.value))
  .then(() => alert("Data deleted successfully."))
  .catch((error) => alert(error));
}

// Realtime Database method for selecting any data:

function selection(){
  var name_input = document.getElementById('name_inp');
  var roll_input = document.getElementById('roll_inp');
  var number_input = document.getElementById('number_inp');
  var balance_input = document.getElementById('balance_inp');
  

  const dbRef = ref(database);

  get(child(dbRef, "Students/" + roll_input.value))
  .then((snapshot) =>{
    if(snapshot.exists())
    {
      name_input.value = snapshot.val().std_name;
      number_input.value = snapshot.val().std_number;
      balance_input.value = snapshot.val().std_balance;
    }
    else
    {
      alert(" No data found.");
    }
  } )
}
// var insert_btn = document.getElementById('insert_btn');
// var select_btn = document.getElementById('select_btn');
// var update_btn = document.getElementById('update_btn');
// var delete_btn = document.getElementById('delete_btn');

var show_btn = document.getElementById('show_btn');
show_btn.addEventListener('click', getRealtimeData);


// insert_btn.addEventListener('click', InsertData);
// select_btn.addEventListener('click', selection);
// update_btn.addEventListener('click', UpdateData);
// delete_btn.addEventListener('click', RemoveData);


// var c_select_btn = document.getElementById('c_select_btn');
 // c_select_btn.addEventListener('click', selection_customer);

let cross_icon = document.getElementById('cross_icon');
let bar_icon = document.getElementById('bar_icon');
let target_div = document.getElementById('nav_items');

bar_icon.addEventListener('click', showNav);
cross_icon.addEventListener('click', hideNav);
function showNav()
{
  target_div.style.display ="block"; 
  setTimeout(() => {
    cross_icon.style.display = "block";
    bar_icon.style.display = "none";

  }, 3000)
}

function hideNav()
{
  target_div.style.display ="none";
  setTimeout(() => {
    cross_icon.style.display = "none";
    bar_icon.style.display = "block";

  }, 1000)
}