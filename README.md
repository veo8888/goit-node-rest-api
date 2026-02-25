# goit-node-rest-api

A REST API for managing a contacts collection, built with Node.js and Express.

## Installation & Setup

1. **Clone the repository**
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the project root based on .`env.example`. Add your necessary credentials.

## Running the Server

Start the server in development mode (with hot-reload):

```bash
npm run dev
```

or start in standard mode:

```bash
npm start
```

Server URL: `http://localhost:3000`

Stop Server: Press `CTRL+C`

---

## Testing with API CLI

You can test the API endpoints using the built-in command-line utility.
Note: Ensure the server is running in a separate terminal window before starting the tests.

```bash
node api-cli/index.js
```

### Available CLI Options:

```js
[ Auth ]
POST /api/auth/register — Create a new account.
POST /api/auth/login — Sign in (token is saved automatically).
POST /api/auth/logout — Sign out.
GET /api/auth/current — Get current user profile.
PATCH /api/auth/subscription — Update user subscription level.

[ Contacts ]
Full CRUD operations: Get all, Get by ID, Create, Update, and Delete.
PATCH /api/contacts/:id/favorite — Toggle contact's favorite status.

[ Token ]
Manually set the Bearer token for authorized requests.
```
