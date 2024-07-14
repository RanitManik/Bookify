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
import { useFirebase } from "@/context/firebase.context.jsx";
import { FileInputComponent } from "@/components/FileInput.component.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { CountrySelectorComponent } from "@/components/CountrySelect.component.jsx";
import { LanguageSelector } from "@/components/LanguageSelect.component.jsx";
import { Loader2 } from "lucide-react";

export function ListingFormComponent() {
  const [name, setName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [isbn13, setIsbn13] = useState("");
  const [maxRetailPrice, setMaxRetailPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [bookCoverPicture, setBookCoverPicture] = useState(null);
  const [bookOtherPictures, setBookOtherPictures] = useState([]);
  const [bookDescription, setBookDescription] = useState("");
  const [authorDescription, setAuthorDescription] = useState("");
  const [publisherDescription, setPublisherDescription] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [pages, setPages] = useState("");
  const [language, setLanguage] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [initialReleaseDate, setInitialReleaseDate] = useState("");

  const { handleCreateNewListing } = useFirebase();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const listingData = {
      name,
      authorName,
      isbn10,
      isbn13,
      maxRetailPrice,
      finalPrice,
      bookCoverPicture,
      bookOtherPictures,
      bookDescription,
      authorDescription,
      publisherDescription,
      itemWeight,
      pages,
      language,
      countryOfOrigin,
      publicationDate,
      initialReleaseDate,
    };
    try {
      await handleCreateNewListing(listingData);
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }
    if (file.size > 500 * 1024) {
      alert("Each image must be less than 500KB.");
      return;
    }
    setBookCoverPicture(file);
  };

  const handleOtherFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can only select up to 5 images.");
      return;
    }
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return false;
      }
      if (file.size > 500 * 1024) {
        alert("Each image must be less than 500KB.");
        return false;
      }
      return true;
    });
    setBookOtherPictures(validFiles);
  };

  return (
    <div className="grid min-h-[min(90vh,_1080px)] place-items-center py-8 duration-200 animate-in fade-in">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">List Your Books</CardTitle>
          <CardDescription>
            Enter your book details below to list your book
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="book-name">
                  Book Name <span>*</span>
                </Label>
                <Input
                  id="book-name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  minLength="1"
                  maxLength="30"
                  type="text"
                  placeholder="The Jungle Book"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author-name">
                  Author Name <span>*</span>
                </Label>
                <Input
                  id="author-name"
                  onChange={(e) => setAuthorName(e.target.value)}
                  value={authorName}
                  type="text"
                  minLength="1"
                  maxLength="30"
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
                  min="1000000000"
                  max="9999999999"
                  type="number"
                  placeholder="8119555600"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="isbn-13">ISBN-13</Label>
                <Input
                  id="isbn-13"
                  onChange={(e) => setIsbn13(e.target.value)}
                  value={isbn13}
                  min="1000000000000"
                  max="9999999999999"
                  type="number"
                  placeholder="9788119555606"
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
                  min="10"
                  max="5000"
                  type="number"
                  placeholder="80 g"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pages">Print length</Label>
                <Input
                  id="pages"
                  onChange={(e) => setPages(e.target.value)}
                  value={pages}
                  min="10"
                  max="10000"
                  type="number"
                  placeholder="128 pages"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="publication-date">Publication Date</Label>
                <Input
                  id="publication-date"
                  onChange={(e) => setPublicationDate(e.target.value)}
                  value={publicationDate}
                  max={new Date().toISOString().split("T")[0]}
                  type="date"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="initial-release-date">
                  Initial Release Date
                </Label>
                <Input
                  id="initial-release-date"
                  onChange={(e) => setInitialReleaseDate(e.target.value)}
                  value={initialReleaseDate}
                  max={new Date().toISOString().split("T")[0]}
                  type="date"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">
                  Price (MRP) <span>*</span>
                </Label>
                <Input
                  id="price"
                  onChange={(e) => setMaxRetailPrice(e.target.value)}
                  value={maxRetailPrice}
                  type="number"
                  required
                  min="10"
                  max="10000"
                  placeholder="Rs.10 to Rs.10000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="final-price">
                  Final Price <span>*</span>
                </Label>
                <Input
                  id="final-price"
                  onChange={(e) => setFinalPrice(e.target.value)}
                  value={finalPrice}
                  type="number"
                  required
                  min="10"
                  max="10000"
                  placeholder="Rs.10 to Rs.10000"
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
                <CountrySelectorComponent
                  value={countryOfOrigin}
                  onChange={(value) => setCountryOfOrigin(value)}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="book-description">Product Description</Label>
                <Textarea
                  rows="5"
                  maxLength="3000"
                  minLength="250"
                  id="book-description"
                  onChange={(e) => setBookDescription(e.target.value)}
                  value={bookDescription}
                  placeholder="Write your book description here. (maximum 3000 characters)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author-description">About the Author</Label>
                <Textarea
                  rows="5"
                  minLength="250"
                  maxLength="3000"
                  id="author-description"
                  onChange={(e) => setAuthorDescription(e.target.value)}
                  value={authorDescription}
                  placeholder="Write about the author here. (maximum 3000 characters)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="publisher-description">
                  About the Publisher
                </Label>
                <Textarea
                  rows="5"
                  maxLength="1000"
                  id="publisher-description"
                  onChange={(e) => setPublisherDescription(e.target.value)}
                  value={publisherDescription}
                  placeholder="ABC Book Store (1 January 2023), +91 XXXXXXXXXX, abcbookstore@example.com"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="cover-file-input">
                  Cover Image <span>*</span>
                </Label>
                <FileInputComponent
                  id="cover-file-input"
                  onChange={handleCoverFileChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="other-file-input">
                  Other Images <span>*</span>
                </Label>
                <FileInputComponent
                  id="other-file-input"
                  onChange={handleOtherFileChange}
                  required
                  multiple
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Share className="mr-2 h-4 w-4" />
              )}
              {loading ? "Publishing..." : "Publish Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
