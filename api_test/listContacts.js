const API = "http://localhost:3000/api/contacts";

async function listContacts() {
  try {
    const res = await fetch(API);
    const contacts = await res.json();
    console.log("Contacts list:", contacts);
  } catch (err) {
    console.error("List Error:", err);
  }
}

listContacts();
