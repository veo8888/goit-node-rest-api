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

## Testing the Authorization Controller with Jest Unit Tests

```bash
npm test
```

---

## Testing with API CLI

You can test the API endpoints using the built-in command-line utility.
Note: Ensure the server is running in a separate terminal window before starting the tests.

```bash
node api-cli/index.js
```

### Available CLI Options:

```
[ Auth ]
POST   /api/auth/register             - Create a new account (avatar generated via Gravatar). Sends a verification email.
POST   /api/auth/login                - Sign in (token is saved automatically). Requires verified email.
POST   /api/auth/logout               - Sign out.
GET    /api/auth/current              - Get current user profile (email, subscription, avatarURL).
PATCH  /api/auth/subscription         - Update user subscription level (starter / pro / business).
GET    /api/auth/verify/:token        - Verify email address using the token received by email.
POST   /api/auth/verify               - Resend the verification email (if not yet verified).

[ Avatar ]
PATCH  /api/auth/avatars              - Upload a new avatar image (multipart/form-data). Replaces the previous one.
DELETE /api/auth/avatars              - Delete the current avatar and reset it to Gravatar.

[ Contacts ]
GET    /api/contacts/                 - Get all contacts.
GET    /api/contacts/:id              - Get a single contact by ID.
POST   /api/contacts/                 - Create a new contact.
PUT    /api/contacts/:id              - Replace a contact (all fields).
DELETE /api/contacts/:id              - Delete a contact.
PATCH  /api/contacts/:id/favorite     - Toggle contact's favorite status.

[ Token ]
Manually set the Bearer token for authorized requests.
```
