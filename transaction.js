import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  update
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOlb08vtobzsPn4SVH0QJImGUxlbeh0lA",
  authDomain: "data-store-e33c2.firebaseapp.com",
  databaseURL: "https://data-store-e33c2-default-rtdb.firebaseio.com",
  projectId: "data-store-e33c2",
  storageBucket: "data-store-e33c2.appspot.com",
  messagingSenderId: "42629128052",
  appId: "1:42629128052:web:8c3212d688420b59bb9621",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

let sender_id = document.getElementById("sender_id");

function sender_details() {
  let target_div = document.getElementById("input_div");
  let sender_name = document.createElement("input");
  let sender_email = document.createElement("input");

  sender_name.style.className = "info_receiver_div input";
  sender_email.style.className = "info_receiver_div input";

  const dbRef = ref(database);
  get(child(dbRef, "Customers/" + sender_id.value)).then((snapshot) => {
    if (snapshot.exists()) {
      swal({
        title: "Congratulations!",
        text: "Successfully data found.",
        icon: "success",
        button: "Aww yess!",
      });
      sender_name.value = snapshot.val().Name;
      sender_email.value = snapshot.val().Email;
      target_div.appendChild(sender_name);
      target_div.appendChild(sender_email);
    } else {
      swal({
        title: "Error!",
        text: "Data not found related to the sender_id",
        icon: "error",
        confirmButtonText: "okay",
      });
    }
  });
}

let sender_btn = document.getElementById("sender_btn");
sender_btn.addEventListener("click", sender_details);

let receiver_id = document.getElementById("receiver_id");

function receiver_details() {
  let target_div = document.getElementById("r_input_div");
  let receiver_name = document.createElement("input");
  let receiver_email = document.createElement("input");
  receiver_name.style.className = "info_receiver_div input";
  receiver_email.style.className = "info_receiver_div input";

  const dbRef = ref(database);
  get(child(dbRef, "Customers/" + receiver_id.value)).then((snapshot) => {
    if (snapshot.exists()) {
      swal({
        title: "Congratulations!",
        text: "Successfully data found.",
        icon: "success",
        button: "Aww yess!",
      });

      receiver_name.value = snapshot.val().Name;
      receiver_email.value = snapshot.val().Email;
      target_div.appendChild(receiver_name);
      target_div.appendChild(receiver_email);
    } else {
      swal({
        title: "Error!",
        text: "Data not found related to the receiver_id",
        icon: "error",
        button: "Okay",
      });
    }
  });
}
let receiver_btn = document.getElementById("receiver_btn");
receiver_btn.addEventListener("click", receiver_details);

function transfer_amount_method() {
  let transfer_amount = document.getElementById("amount_input").value;
  let sender_current_balance;
  let receiver_current_balance;

  const database_ref = ref(database);

  get(child(database_ref, "Customers/" + sender_id.value)).then((snapshot) => {
    if (snapshot.exists()) {
      sender_current_balance = snapshot.val().Customer_Balance;
      console.log(sender_current_balance + " " + typeof(sender_current_balance));
    } else {
      alert("Something is wrong sender data.");
    }

    get(child(database_ref, "Customers/" + receiver_id.value)).then(
      (r_snapshot) => {
        if (r_snapshot.exists()) {
          receiver_current_balance = r_snapshot.val().Customer_Balance;
          console.log(receiver_current_balance + " " + typeof(receiver_current_balance));
        } else {
          alert("Something is wrong at receiver data.");
        }

        if (sender_current_balance < transfer_amount) {
          swal({
            title: "Error!",
            text: "Insufficient Balance in the account",
            icon: "error",
            button: "Objection Killed (ok)",
          });
        } else {
          var rec_total_balance = +receiver_current_balance + +transfer_amount;
          sender_current_balance -= transfer_amount;
          // console.log("sender_balance --> " + sender_current_balance);
          // console.log("receiver_balance --> " + rec_total_balance);

          update(ref(database, "Customers/" + receiver_id.value), {
            Customer_Balance: rec_total_balance
          })
          .then(() => console.log("receiver_balance -->  " + rec_total_balance))
          .catch((error) => console.log("Error occurred at receiver account updation \n" + error));

          update(ref(database, "Customers/" + sender_id.value), {
            Customer_Balance: sender_current_balance
          })
         
          .then(() =>console.log("sender_balance --> " + sender_current_balance))
          .catch((error) => console.log("Error occurred at sender account updation \n" + error));

          swal({
            title: "Bravo!",
            text: `Transaction Is Done Successfully ${String.fromCodePoint(0x1F600)}`,
            icon: "success",
            button: "Cool",
          });

        }
      }
    );
  });
}

let send_btn = document.getElementById("send_btn");
send_btn.addEventListener("click", transfer_amount_method);
