# Firestore Database Structure

```mermaid
graph TD
    users --> userID
    userID --> booksCreated
    userID --> booksOrdered
    booksCreated --> bookID
    booksOrdered --> bookID
    books --> bookID
    bookID --> orders
    orders --> orderID
    bookID --> fields

    subgraph Users Collection
        users
        userID
        booksCreated
        booksOrdered
        booksCreated --> bookDocumentID
        booksOrdered --> bookDocumentID
    end

    subgraph Books Collection
        books
        bookID
        orders
        orderID
        fields
        orders --> orderSpecificFields
        fields --> bookSpecificFields
    end
```

## Explanation

### Users Collection

- **users/{userID}**: Document representing each user.
    - **booksCreated**: Sub-collection containing books created by the user.
        - **{bookID}**: Document with the `bookDocumentID` field.
    - **booksOrdered**: Sub-collection containing books ordered by the user.
        - **{bookID}**: Document with the `bookDocumentID` field.

### Books Collection

- **books/{bookID}**: Document representing each book.
    - **orders**: Sub-collection containing orders for the book.
        - **{orderID}**: Document with order-specific fields.
    - **fields**: Book-specific fields.
