AI Usage Documentation

This project was developed with the help of AI tools (Cursor / ChatGPT) as allowed by the assignment.

Below are the main prompts I used during development and how they helped me.

1. Project Setup

Prompt:

Create a React + TypeScript project using Vite with a clean structure.
Add Tailwind CSS and shadcn/ui.
The project should be ready for authentication, API calls and a dashboard table.

Result:

Initial Vite + React + TypeScript setup

Tailwind + shadcn/ui installed and configured

Base layout structure created

2. Authentication (Login Page)

Prompt:

Build a login page with username and password fields.
Connect it to https://dummyjson.com/auth/login.
Store the token in localStorage and redirect to the dashboard on success.
Handle loading and error states.

Result:

Working login form

Token stored in localStorage

Redirect to /products after login

Error + loading handling

3. Products Table (Dashboard)

Prompt:

Create a products table using TanStack Table.
It should support sorting, filtering, pagination and row click.
Fetch data from https://dummyjson.com/products.

Result:

Table with sorting, filtering and pagination

Responsive layout

Row click opens product details dialog

4. Product Details Dialog

Prompt:

Design a clean and responsive dialog that shows product details
(image, brand, category, price, rating, stock, id).
Use shadcn/ui Dialog and Tailwind.

Result:

Professional looking product details dialog

Responsive layout

Reusable InfoItem component

5. Draggable Table Columns

Prompt:

Add draggable columns to the TanStack Table without breaking sorting, filtering or pagination.
Use native HTML drag and drop.
Do not refactor existing features.

Result:

Columns can be reordered by dragging headers

Sorting, filtering and pagination still work

No regressions introduced

6. UI & UX Improvements

Prompt:

Improve the UI of the dashboard:
better spacing, responsive layout, summary cards, colors and clean typography.
Keep everything simple and professional.

Result:

Colored summary cards

Better spacing and alignment

More readable and professional layout

Notes

AI was used as a coding assistant and reviewer,
but all final decisions, structure and implementation were done by me.