# Pokemon app

## Introduction

This project is a full-stack web application developed as part of a coding challenge for a job position. The application is built using Turborepo, NestJS, and Next.js. The backend is powered by NestJS, providing a robust and scalable API, while the frontend is developed using Next.js, offering server-side rendering and a seamless user experience.

## Technologies Used

- Turborepo: High-performance build system for JavaScript and TypeScript codebases.
- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- Next.js: A React framework for server-side rendering and generating static websites.
- TypeScript: A strongly typed programming language that builds on JavaScript.

### Apps and Packages

- `web`: pokemon web app built using [Next.js](https://nextjs.org/)
- `api`: pokemon api built using [NestJS](https://nestjs.com/)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Installation

1- Clone the repository:

```
git clone https://github.com/manuelbogino95/cookunity-pokemon.git
cd cookunity-pokemon
```

2- Install dependencies:

```
pnpm install
```

3- Create a new postgress database.

4- Add environment variables:

- Web (Next.js app):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_POKEMON_IMAGES_API_URL=https://img.pokemondb.net
```

- API (NestJS app):

```
PORT=3001
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=<my-username>
DATABASE_PASSWORD=<my-password>
DATABASE=<database-name>
```

5- Seed the database:

```
pnpm seed
```

6- Run the application:

```
pnpm dev
```

To use the application, navigate to http://localhost:3000 in your web browser. The frontend will communicate with the backend API to perform various operations.
