## Getting Started

First, run:

```bash
npm install
```
or
```bash
yarn install
```

Create `.env.local` and copy everything from `.env.example`.
Create firebase project and copy credentials into `.env.local`.

Run the development server:

```bash
npm run dev
```
or
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Firebase functions

Open functions folder.

Run:

```bash
npm install
```

Edit and run :

```bash
firebase deploy --only functions
```

## Sidenote
- Versions of every package do not change! They will not update by themself.
  - Reason: I found the perfect versions for every package for them to be compatible.
- There are potential problems if you use `yarn` instead of `npm`. In case there will be error delete `node_modules`, `package-lock.json`, `yarn.lock`, and use `npm` instead.
