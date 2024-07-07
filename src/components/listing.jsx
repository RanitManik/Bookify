import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFirebase } from "@/context/firebase.jsx";
import { FileInput } from "@/components/file-input.jsx";

export function ListingForm() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState(null);

  const { handleCreateNewListing } = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateNewListing(name, isbnNumber, price, coverPic);
  };

  return (
    <Card className="mx-auto w-full max-w-sm self-start">
      <CardHeader>
        <CardTitle className="text-2xl">Listing</CardTitle>
        <CardDescription>
          Enter your book details below to add your book
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="book-name">Book Name</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="book-name"
                type="text"
                placeholder="Book name"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="isbn-no">ISBN</Label>
              </div>
              <Input
                onChange={(e) => setIsbnNumber(e.target.value)}
                value={isbnNumber}
                id="isbn-no"
                type="text"
                required
                placeholder="ISBN Number"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="price">Price</Label>
              </div>
              <Input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                id="price"
                type="number"
                required
                min="10"
                max="10000"
                placeholder="Price"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="file-input">Image</Label>
              </div>
              <FileInput
                onChange={(e) => setCoverPic(e.target.files[0])}
                id="file-input"
                type="file"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
