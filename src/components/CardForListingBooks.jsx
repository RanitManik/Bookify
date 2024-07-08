// CardForListingBooks.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
    <Card className="max-w-[350px] overflow-hidden">
      <img
        className={`h-[200px] w-full bg-muted object-contain ${url ? "" : "animate-pulse"}`}
        src={url}
        alt={book?.name || "Book Image"}
      />
      <CardHeader>
        <CardTitle>{book?.name}</CardTitle>
        {/*<CardDescription></CardDescription>*/}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This book has a title {book?.name} and this book was written by{" "}
          {book?.displayName}. It is being sold by {book?.displayName} and costs
          Rs.{book?.price}.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">See Details</Button>
      </CardFooter>
    </Card>
  );
}
