# goit-node-rest-api

### Environment Setup

Create a `.env` file in the project root based on .`env.example`, then fill in your values.

### Start the server

```bash
npm run dev
```

or

```bash
node app.js
```

The server starts at: `http://localhost:3000`

Stop the server: `CTRL+C`

### In another terminal

Add a contact:

```bash
node api_test/addContact.js
```

List all contacts:

```bash
node api_test/listContacts.js
```

Update a contact by ID:

```bash
node api_test/updateContact.js <id>
```

Delete a contact by ID:

```bash
node api_test/deleteContact.js <id>
```

Replace `<id>` with the contact ID from add or list output.
