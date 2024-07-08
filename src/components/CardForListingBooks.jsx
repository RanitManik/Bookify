// CardForListingBooks.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useFirebase } from "@/context/firebase.jsx";
import { useEffect, useState } from "react";

export function CardForListingBooks(book) {
  const { getImageUrl } = useFirebase();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (book?.imageURL) {
      getImageUrl(book.imageURL)
        .then((url) => setUrl(url))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }, [book.imageURL, getImageUrl]);

  return (
    <Card className="max-w-[350px] overflow-hidden bg-muted/30">
      <img
        className={`h-[250px] w-full bg-muted object-contain p-2 sm:p-4 ${url ? "" : "animate-pulse"}`}
        src={url}
        alt={book?.name || "Book Image"}
      />
      <CardHeader>
        <CardTitle className="line-clamp-1">{book?.name}</CardTitle>
        <CardDescription>by {book.displayName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-foreground/90">
          {book.description ? (
            book.description
          ) : (
            <>
              This book has a title {book?.name} and this book was written by{" "}
              {book?.displayName}. It is being sold by {book?.displayName} and
              costs Rs.{book?.price}.
            </>
          )}
        </p>
        <div className="mt-2">
          <span className="line-through text-muted-foreground/90" aria-label="original price">Rs. {(book.price * 1.40).toFixed(0)}</span>
          <h3 className="text-2xl inline px-2 text-foreground" aria-label="selling price after 40 percent discount">₹{book.price}</h3>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="secondary">See Details</Button>
        <Button variant="secondary">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}