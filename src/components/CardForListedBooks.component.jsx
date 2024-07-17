import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CardForListedBooksComponent(book) {
  const { getImageUrl } = useFirebase();
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (book?.coverImgURL) {
      getImageUrl(book.coverImgURL)
        .then((url) => setUrl(url))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }, [book.coverImgURL, getImageUrl]);

  return (
    <Card className="max-w-[350px] overflow-hidden">
      <div
        className={`h-[250px] w-full bg-muted/60 p-2 sm:p-4 ${url ? "" : "animate-pulse"}`}
      >
        <img
          className="m-auto h-full object-contain"
          src={url}
          alt={!url ? "" : "Book Image"}
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{book?.name}</CardTitle>
        <CardDescription>{book.authorName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-foreground/90">
          {book.bookDescription ? (
            book.bookDescription
          ) : (
            <>
              This book has a title {book?.name} and this book was written by{" "}
              {book?.authorName}. It is being sold by {book?.displayName} and
              costs Rs.{book?.price}.
            </>
          )}
        </p>
        <div className="mt-2">
          <span
            className="text-muted-foreground/90 line-through"
            aria-label="MRP price"
          >
            Rs. {book.maxRetailPrice}
          </span>
          <h3
            className="inline px-2 text-2xl text-foreground"
            aria-label="selling price"
          >
            ₹{book.finalPrice}
          </h3>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => navigate(`/book/view/${book.id}`)}
          variant="secondary"
        >
          See Details
        </Button>
        <Button variant="secondary">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
