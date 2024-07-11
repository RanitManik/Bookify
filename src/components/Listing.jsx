import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFirebase } from "@/context/firebase.jsx";
import { FileInput } from "@/components/FileInput.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { CountrySelector } from "@/components/CountrySelect.jsx";
import { LanguageSelector } from "@/components/LanguageSelect.jsx";

export function ListingForm() {
  const [name, setName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [isbn13, setIsbn13] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [coverPic, setCoverPic] = useState(null);
  const [description, setDescription] = useState("");
  const [authorDescription, setAuthorDescription] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [pages, setPages] = useState("");
  const [language, setLanguage] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");

  const { handleCreateNewListing } = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingData = {
      name,
      authorName,
      isbn10,
      isbn13,
      price,
      discount,
      coverPic,
      description,
      authorDescription,
      itemWeight,
      pages,
      language,
      countryOfOrigin,
    };
    handleCreateNewListing(listingData);
  };

  return (
    <div className="grid min-h-[min(90svh,_1080px)] place-items-center py-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Listing</CardTitle>
          <CardDescription>
            Enter your book details below to add your book
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="book-name">Book Name</Label>
                <Input
                  id="book-name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxlength="30"
                  type="text"
                  placeholder="The Jungle Book"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author-name">Author Name</Label>
                <Input
                  id="author-name"
                  onChange={(e) => setAuthorName(e.target.value)}
                  value={authorName}
                  type="text"
                  maxlength="30"
                  placeholder="Rudyard Kipling"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="isbn-10">ISBN-10</Label>
                <Input
                  id="isbn-10"
                  onChange={(e) => setIsbn10(e.target.value)}
                  value={isbn10}
                  maxlength="20"
                  type="text"
                  placeholder="8119555600"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="isbn-13">ISBN-13</Label>
                <Input
                  id="isbn-13"
                  onChange={(e) => setIsbn13(e.target.value)}
                  value={isbn13}
                  maxlength="20"
                  type="text"
                  placeholder="978-8119555606"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="book-description">Product Description</Label>
                <Textarea
                  rows="4"
                  maxlength="500"
                  id="book-description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Write your book description here. (within 500 characters)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author-description">About the Author</Label>
                <Textarea
                  rows="4"
                  maxlength="500"
                  id="author-description"
                  onChange={(e) => setAuthorDescription(e.target.value)}
                  value={authorDescription}
                  placeholder="Write about the author here. (within 500 characters)"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="item-weight">Item Weight (g)</Label>
                <Input
                  id="item-weight"
                  onChange={(e) => setItemWeight(e.target.value)}
                  value={itemWeight}
                  maxlength="500"
                  type="number"
                  placeholder="80 g"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pages">Paperback</Label>
                <Input
                  id="pages"
                  onChange={(e) => setPages(e.target.value)}
                  value={pages}
                  type="number"
                  placeholder="128 pages"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (MRP)</Label>
                <Input
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  required
                  min="10"
                  max="10000"
                  placeholder="Rs.10 to Rs.10000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  type="number"
                  required
                  min="0"
                  max="95"
                  placeholder="0 to 95%"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Language</Label>
                <LanguageSelector
                  value={language}
                  onChange={(value) => setLanguage(value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Country of Origin</Label>
                <CountrySelector
                  value={countryOfOrigin}
                  onChange={(value) => setCountryOfOrigin(value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-input">Image</Label>
              <FileInput
                id="file-input"
                onChange={(e) => setCoverPic(e.target.files[0])}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Share className="mr-2 h-4 w-4" /> Publish Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
