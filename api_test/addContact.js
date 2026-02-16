const API = "http://localhost:3000/api/contacts";

async function addContact() {
  try {
    // Example data
    const newContact = {
      name: "Test Script User",
      email: "test_script@test.com",
      phone: "77887788",
    };

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });

    const added = await res.json();
    console.log("Added contact:", added);
  } catch (err) {
    console.error("Add Error:", err);
  }
}

addContact();
