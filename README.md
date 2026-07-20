# SIWES Space

> **Your SIWES placement. Sorted.**

A mobile directory platform solving the information gap that every Nigerian university and polytechnic student faces when searching for an industrial training placement.

---

## The Problem

Finding a SIWES placement in Nigeria is harder than the internship itself.

There is no central list. No clear terms. No way to know what companies exist, what positions they offer, or what they expect from students — until someone in your hostel mentions one. Most students end up somewhere random, not because it is the best fit for them, but because it was the only option they knew about.

This is an information problem. And it has been unsolved for too long.

---

## What We Are Building

**SIWES Space** is a verified, mobile-first directory that gives every Nigerian SIWES student everything they need to make an informed placement decision — in one place.

Students can browse companies, filter by location or industry, read what each company offers, understand their terms and conditions, and get direct instructions on how to apply. No more guessing. No more word of mouth. No more showing up somewhere unprepared.

---

## Who It Is For

- Nigerian university and polytechnic students (ND, HND, and degree programmes) undergoing mandatory SIWES industrial training
- Students across all disciplines — tech, engineering, sciences, social sciences, law, health, and more
- Primary focus: Taraba State at launch, expanding nationally

---

## Roadmap

### Version 1 — The Directory *(Current)*
The foundation. A clean, verified directory of companies accepting SIWES students.

- Browse and search companies by name, location, or industry
- Company profiles: what they do, available positions, terms and conditions, contact details, and website link
- Admin dashboard for managing, verifying, and updating company profiles
- Data sourced from student peer submissions, SIWES coordinators, and direct company outreach — every entry verified before going live

### Version 2 — The Full Platform
Solving every logistical problem a student faces, not just placement.

- **Accommodation listings** — verified options within the same LGA as the internship
- **Transport cost estimates** — fare ranges from each accommodation to the workplace
- **Dual rating system** — community ratings from verified students, plus a pinned official rating to prevent manipulation
- **AI-powered recommendations** — suggests the best placement match based on course, location, and preferences
- **In-app registration** — students apply directly through the platform

### Version 3 — The Infrastructure Layer
- Proprietary Nigerian informal transit pricing API covering keke, danfo, and intercity bus routes
- Plugs back into SIWES Space and available as a standalone integration for other platforms

---

## How We Are Building the Data

The platform is only as useful as the data inside it. Here is the acquisition strategy:

1. **Peer sourcing** — students who have already completed SIWES submit companies they interned at through a simple suggest form
2. **SIWES coordinators** — university and polytechnic coordinators hold years of historical placement data; we are engaging them directly
3. **Direct company outreach** — companies are contacted to confirm and complete their own profiles
4. **Admin verification** — every submission is verified by calling or visiting before it goes live

No unverified data goes on the platform. Trust is the product.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database ORM | Prisma |
| Database | PostgreSQL |
| Deployment | Vercel |

---

## Current Status

- ✅ v1 frontend live at [siwes-space.vercel.app](https://siwes-space.vercel.app)
- ✅ Company suggest form live
- 🔄 Admin dashboard in progress
- 🔄 Database and API layer in progress
- ⏳ Company data being collected — Taraba State first

---

## Suggest a Company

Do you know a company that accepts SIWES students?

👉 [Suggest it here](https://siwes-space.vercel.app/suggest)

Takes less than two minutes. Every suggestion helps a student find a better placement.

---

## Contributing

This project is being built in public. If you are a developer, designer, or anyone who wants to contribute — open an issue or reach out directly.

---

## Why This Matters

Every year, thousands of Nigerian students scramble to find SIWES placements through informal networks, last-minute calls, and sheer luck. The ones who end up in good placements are usually the ones who knew someone. 

SIWES Space exists to make sure knowing someone is no longer a requirement.

---

*Built by a Nigerian CS student who went through this himself.*