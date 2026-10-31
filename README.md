# Euler Library

A Vietnamese book-rental website built with plain HTML, CSS and JavaScript on Firebase.
Made in the MindX Web Development course (2025).

**Live:** https://kenptnk.github.io/euler-library/

## Features

- **Search** books through the Google Books API (`googleapis.com/books/v1/volumes`).
- **Accounts** with Firebase Authentication (email and password).
- **Rent books** with an in-site account balance; rented books appear on the account page.
- **Admin pages** to add books (by Google Books ID or by typing details), edit, delete and manage users,
  stored in Cloud Firestore (`books`, `rentedBooks`, `username`).

## Run locally

It is a static site: serve the folder with any static server, for example

```bash
npx serve .
```

## Limitations

This is a learning project. The balance and rental checks run in the browser, so the Firestore
security rules, not the page, are what protect the data. The account balance is play money.
