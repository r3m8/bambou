## Requirements

You need to clone this repository and complete the environment file (.env).

PEPPER and EMAIL_SCHEMA are optional but highly recommended for enhanced security.

PEPPER enhances the encryption (technically, hashing) of user passwords, adding an extra layer of protection against database breaches.

EMAIL_SCHEMA allows you to restrict the domain names that new users can use for registration (e.g., yourschool.com).

## Getting Started

First, install the dependencies:

```bash
npm install
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

This project utilizes NextJS 14, TailwindCSS, the new /app folder with App Routing, and Prisma with a PostgreSQL database.

## To-Do List

- Implement a caching system for the database.
- Introduce an IP rate limit for requests.