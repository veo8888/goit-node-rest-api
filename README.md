# goit-node-rest-api

### Create .env file

Create a file named .env in the project root with:

```
DB_HOST=your_host
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
```

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
