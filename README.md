# InternShip

A directory platform solving the SIWES placement information gap for Nigerian university students — starting with Taraba State.

## The Problem

Every year, thousands of students across Nigerian universities go through SIWES (Student Industrial Work Experience Scheme) with little to no reliable information on which companies actually take interns, what they do, or how to reach them. Placement info is scattered across WhatsApp groups, word of mouth, and outdated coordinator lists. **InternShip** fixes that by centralizing it into a single, searchable directory.

## What It Does (v1)

v1 is a **read-only company directory** focused on Taraba State, giving students:

- A searchable, structured list of companies known to accept SIWES interns
- Company details — industry, location, contact info, and past intern activity where available
- A single source of truth instead of fragmented, informal channels

Future versions expand into a mobile app and richer, student-contributed data.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL

Built full-stack from the start, with a mobile app (React Native) planned for v2.

## Data Sourcing

Company data is collected through:
- Peer form submissions from students who've completed SIWES
- Direct outreach to the FUWukari SIWES coordinator's office

## Roadmap

- [x] V1: Read-only company directory (Taraba State)
- [ ] V2: React Native mobile app
- [ ] Expand coverage beyond Taraba State
- [ ] Student-contributed reviews and placement experiences

## Status

🚧 In active development.

---

Built by [LeRhem](https://github.com/lerhem)