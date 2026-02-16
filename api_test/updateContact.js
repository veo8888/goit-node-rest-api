const API = "http://localhost:3000/api/contacts";

async function updateContact(id, updatedData) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      const contact = await res.json();
      console.log(`Updated contact with id ${id}:`, contact);
    } else {
      console.log(
        `Failed to update contact with id ${id}. Status: ${res.status}`,
      );
    }
  } catch (err) {
    console.error("Update Error:", err);
  }
}

// Pass the contact ID and updated data via command line arguments
const id = process.argv[2];
if (!id) {
  console.error("Please provide contact ID: node updateContact.js <id>");
  process.exit(1);
}

// Example update data
const updatedData = {
  name: "Updated Test User",
  email: "updated_test@test.com",
  phone: "1122334455",
  favorite: true,
};

updateContact(id, updatedData);
