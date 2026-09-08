# Thumbora

Thumbora is an AI-powered thumbnail generator for creators. Users can describe a thumbnail, choose its style, aspect ratio, and color scheme, then generate, save, and manage thumbnails from their account.

## Features

- AI thumbnail generation powered by Together AI
- Custom title, prompt, style, aspect ratio, color scheme, and text overlay options
- User registration, login, logout, and cookie-based authentication
- Saved thumbnail history with pagination and deletion
- Password reset by email with Redis-backed OTP limits
- Cloudinary image storage
- Razorpay subscription payments and webhook handling
- Responsive React interface with separate generation and account views

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express 5, TypeScript, Mongoose
- **Services:** MongoDB, Redis, Together AI, Cloudinary, Brevo SMTP, Razorpay

## Project Structure

```text
Thumbora/
├── client/       # React + Vite frontend
├── server/       # Express + TypeScript API
└── README.md
```

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB connection string
- Redis instance
- Together AI API key
- Cloudinary account
- SMTP credentials, such as Brevo SMTP
- Razorpay account credentials for subscriptions

## Installation

Clone the repository and install dependencies in both applications:

```bash
git clone <repository-url>
cd Thumbora

cd client
npm install

cd ../server
npm install
```

## Environment Variables

Create `server/.env`:

```env
PORT=5000
DB_CONNECTION_SECRET=mongodb://127.0.0.1:27017/thumbora
JWT_SECRET=replace-with-a-long-random-secret

REDIS_HOST=redis://127.0.0.1:6379

TOGETHER_API_KEY=your-together-api-key

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

BREVO_SMTP_USER=your-smtp-user
BREVO_SMTP_PASS=your-smtp-password
SENDER_EMAIL=verified-sender@example.com

RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret
```

Create `client/.env`:

```env
VITE_SERVER_URL=http://localhost:5000
```

Do not commit either `.env` file. Use test credentials for local development and configure the Razorpay webhook URL for `/payment/webhook` when testing payment events.

## Running Locally

Start the API in one terminal:

```bash
cd server
npm run server
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API runs at [http://localhost:5000](http://localhost:5000) by default.

The backend connects to MongoDB before it starts listening. Make sure MongoDB and Redis are available before running the server.

## Available Scripts

### Client

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production frontend |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

### Server

| Command | Description |
| --- | --- |
| `npm run server` | Start the API with automatic reload using nodemon |
| `npm start` | Start the API with `tsx` |
| `npm run build` | Compile the server with TypeScript |

## API Overview

The server uses HTTP-only cookies for authentication and enables credentialed CORS for the Vite development origin.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/signup` | Create an account |
| `POST` | `/login` | Log in |
| `POST` | `/logout` | Log out |
| `POST` | `/user/generate/thumbnail` | Generate and store a thumbnail |
| `GET` | `/user/thumbnails` | List the current user's thumbnails |
| `DELETE` | `/user/thumbnail/delete/:thumbId` | Delete a saved thumbnail |
| `POST` | `/payment/create/order` | Create a Razorpay subscription order |
| `POST` | `/payment/webhook` | Process Razorpay payment events |

Password reset endpoints are implemented under the reset route module and use Redis for OTP storage, expiry, cooldowns, and attempt limits.

## Production Notes

- Set `VITE_SERVER_URL` to the deployed API URL when the frontend and backend use separate domains.
- Update the backend CORS origin in `server/src/server.ts` for the deployed frontend domain.
- Use HTTPS so authentication cookies and payment flows are protected in production.
- Configure Cloudinary, SMTP, Together AI, MongoDB, Redis, and Razorpay with production credentials.
- Configure a Razorpay webhook pointing to the deployed `/payment/webhook` endpoint.
- Build the frontend with `npm run build` and serve the generated `client/dist` directory from your hosting provider.

## License

This project is currently marked as ISC in the server package configuration.
