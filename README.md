# Apartment Availability Monitor

A serverless apartment hunting automation tool that monitors availability changes for Prometheus apartment complexes and sends real-time email notifications when units become available or get leased.

## ✨ Features

- **Real-time Monitoring**: Automatically checks apartment availability every 10 minutes
- **Change Detection**: Identifies newly available units and recently leased apartments
- **Email Notifications**: Instant alerts via email when availability changes
- **Historical Tracking**: Maintains a database of availability changes over time
- **Serverless Architecture**: Runs on Cloudflare Workers with zero server maintenance

## 🏢 Supported Properties

Currently monitors these Prometheus apartment complexes:
- Hiro
- Hadley
- Montrose
- Cobalt
- Tillery
- Iron Works
- 100 Moffett
- Madera

## 🛠️ Tech Stack

- **Runtime**: Cloudflare Workers
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Email**: Resend API
- **Language**: JavaScript (Node.js)

## 📋 Prerequisites

- Node.js 18+
- Cloudflare account
- Neon database account
- Resend API account

## 🚀 Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd apt-hunting
npm install
```

### 2. Environment Variables

Create a `.env` file with the following variables:

```env
PSQL=your-neon-database-connection-string
RESEND_API_TOKEN=your-resend-api-token
```

### 3. Database Setup

Initialize the database schema:

```bash
npx drizzle-kit push
```

### 4. Configure Cloudflare Workers

Update `wrangler.jsonc` with your preferences:
- Change the worker name from `my-first-worker` to your desired name
- Adjust the cron schedule if needed (currently set to every 10 minutes)

Add your secrets to Cloudflare Workers:

```bash
npx wrangler secret put PSQL
npx wrangler secret put RESEND_API_TOKEN
```

### 5. Update Email Recipients

Edit `src/index.js` to change the email recipients:

```javascript
to: ['your-email@example.com', 'friend@example.com']
```

## 📖 Usage

### Development

Run locally with scheduled event testing:

```bash
npm run dev
```

### Deploy

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

### Add New Properties

To monitor additional Prometheus properties:

1. Find the property ID from the Prometheus website
2. Add it to the `apt_codes` object in `src/index.js`
3. Update the `scheduled` function to monitor the new property

## 📊 How It Works

1. **Scheduled Execution**: Cloudflare Workers triggers the function every 10 minutes via cron
2. **Data Fetching**: Retrieves current availability from Prometheus API
3. **Comparison**: Compares with the most recent data stored in the database
4. **Change Detection**: Identifies new and removed units
5. **Notification**: Sends email alerts for any changes detected
6. **Data Storage**: Saves current availability data for future comparisons

## 🔧 Database Schema

```sql
CREATE TABLE "apt_availability" (
  "id" serial PRIMARY KEY,
  "name" text,
  "apt_code" integer,
  "current_availability" json,
  "timestamp" timestamp DEFAULT now()
);
```

## 📝 API Reference

### Prometheus API

The tool fetches data from:
```
https://shopping.prometheusapartments-prod-west2.com/{id}/available-units?date={date}
```

Where:
- `{id}`: Property ID
- `{date}`: Target date (7 days from current date)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and intended for personal use.

## ⚖️ Disclaimer

This tool is for educational and personal use only. Please respect the terms of service of the monitored websites and use responsibly. The authors are not responsible for any misuse of this tool.

---

Built with ❤️ for apartment hunters who want to never miss an opportunity.