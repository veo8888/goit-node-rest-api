const API = "http://localhost:3000/api/contacts";

async function deleteContact(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok) {
      console.log(`Deleted contact with id ${id}`);
    } else {
      console.log(`Failed to delete contact with id ${id}`);
    }
  } catch (err) {
    console.error("Delete Error:", err);
  }
}

// Pass the contact ID via a command line argument
const id = process.argv[2];
if (!id) {
  console.error("Please provide contact ID: node deleteContact.js <id>");
  process.exit(1);
}

deleteContact(id);
