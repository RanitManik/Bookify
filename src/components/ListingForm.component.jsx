import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFirebase } from "@/context/firebase.context";
import { FileInputComponent } from "@/components/FileInput.component";
import { Textarea } from "@/components/ui/textarea";
import { CountrySelectorComponent } from "@/components/CountrySelect.component";
import { LanguageSelector } from "@/components/LanguageSelect.component";
import { ConditionSelector } from "@/components/ConditionSelect.component";
import { CategorySelector } from "@/components/CategorySelect.component";

export function ListingFormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    isbn10: "",
    isbn13: "",
    maxRetailPrice: "",
    finalPrice: "",
    bookCoverPicture: null,
    bookOtherPictures: [],
    bookDescription: "",
    authorDescription: "",
    publisherDescription: "",
    itemWeight: "",
    pages: "",
    language: "",
    countryOfOrigin: "",
    publicationDate: "",
    initialReleaseDate: "",
    totalBooks: "",
    category: "",
    condition: "",
    edition: "",
    dimensions: "",
    publisher: "",
    format: "",
    ageRange: "",
    awards: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const { handleCreateNewListing } = useFirebase();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
    setFormData((prevData) => ({
      ...prevData,
      bookCoverPicture: file,
    }));
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
    setFormData((prevData) => ({
      ...prevData,
      bookOtherPictures: validFiles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleCreateNewListing(formData);
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[min(90vh,_1080px)] place-items-center px-4 py-8 duration-200 animate-in fade-in">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">List Your Book</CardTitle>
          <CardDescription>Enter your book details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Basic Information */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Book Name <span>*</span>
                </Label>
                <Input
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  minLength="1"
                  maxLength="30"
                  type="text"
                  placeholder="e.g., The Jungle Book"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="authorName">
                  Author Name <span>*</span>
                </Label>
                <Input
                  id="authorName"
                  onChange={handleChange}
                  value={formData.authorName}
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder="e.g., Rudyard Kipling"
                  required
                />
              </div>
            </div>
            {/* ISBN and Prices */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="isbn10">
                  ISBN-10 <span>*</span>
                </Label>
                <Input
                  id="isbn10"
                  onChange={handleChange}
                  value={formData.isbn10}
                  min="1000000000"
                  max="9999999999"
                  type="number"
                  placeholder="e.g., 8119555600"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="isbn13">ISBN-13</Label>
                <Input
                  id="isbn13"
                  onChange={handleChange}
                  value={formData.isbn13}
                  min="1000000000000"
                  max="9999999999999"
                  type="number"
                  placeholder="e.g., 9788119555606"
                />
              </div>
            </div>
            {/* Other Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="maxRetailPrice">
                  Price (MRP) <span>*</span>
                </Label>
                <Input
                  id="maxRetailPrice"
                  onChange={handleChange}
                  value={formData.maxRetailPrice}
                  type="number"
                  required
                  min="10"
                  max="10000"
                  placeholder="₹ MRP"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="finalPrice">
                  Final Price <span>*</span>
                </Label>
                <Input
                  id="finalPrice"
                  onChange={handleChange}
                  value={formData.finalPrice}
                  type="number"
                  required
                  min="10"
                  max="10000"
                  placeholder="₹ Selling Price"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="totalBooks">
                  Total Stock <span>*</span>
                </Label>
                <Input
                  id="totalBooks"
                  onChange={handleChange}
                  value={formData.totalBooks}
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="Total number of books in stock"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="publisher">
                  Publisher <span>*</span>
                </Label>
                <Input
                  id="publisher"
                  onChange={handleChange}
                  value={formData.publisher}
                  type="text"
                  minLength="1"
                  maxLength="25"
                  placeholder="Publisher name"
                  required
                />
              </div>
            </div>
            {/* File Inputs */}
            <div className="grid gap-2">
              <Label htmlFor="bookCoverPicture">
                Book Cover Picture <span>*</span>
              </Label>
              <FileInputComponent
                id="bookCoverPicture"
                onChange={handleCoverFileChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bookOtherPictures">
                Other Book Pictures <span>*</span>
              </Label>
              <FileInputComponent
                id="bookOtherPictures"
                onChange={handleOtherFileChange}
                multiple
                required
              />
            </div>
            {/* Text Areas */}
            <div className="grid gap-2">
              <Label htmlFor="bookDescription">
                Book Description <span>*</span>
              </Label>
              <Textarea
                id="bookDescription"
                onChange={handleChange}
                value={formData.bookDescription}
                minLength="150"
                maxLength="500"
                placeholder="Provide a brief description of the book"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="authorDescription">
                Author Description <span>*</span>
              </Label>
              <Textarea
                id="authorDescription"
                onChange={handleChange}
                value={formData.authorDescription}
                minLength="150"
                maxLength="500"
                placeholder="Provide a brief description of the author"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publisherDescription">
                Publisher Description <span>*</span>
              </Label>
              <Textarea
                id="publisherDescription"
                onChange={handleChange}
                value={formData.publisherDescription}
                minLength="50"
                maxLength="500"
                placeholder="Provide a brief description of the publisher"
                required
              />
            </div>
            {/* Selectors */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="category">Book Category</Label>
                <CategorySelector
                  id="category"
                  onChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  value={formData.category}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition</Label>
                <ConditionSelector
                  id="condition"
                  onChange={(value) =>
                    setFormData({ ...formData, condition: value })
                  }
                  value={formData.condition}
                />
              </div>
            </div>
            {/* Additional Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <LanguageSelector
                  id="language"
                  onChange={(value) =>
                    setFormData({ ...formData, language: value })
                  }
                  value={formData.language}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                <CountrySelectorComponent
                  id="countryOfOrigin"
                  onChange={(value) =>
                    setFormData({ ...formData, countryOfOrigin: value })
                  }
                  value={formData.countryOfOrigin}
                />
              </div>
            </div>
            {/* Additional Input Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="itemWeight">
                  Item Weight <span>*</span>
                </Label>
                <Input
                  id="itemWeight"
                  onChange={handleChange}
                  value={formData.itemWeight}
                  type="number"
                  placeholder="Weight in grams"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pages">
                  Number of Pages <span>*</span>
                </Label>
                <Input
                  id="pages"
                  onChange={handleChange}
                  value={formData.pages}
                  type="number"
                  min="10"
                  max="5000"
                  placeholder="Total pages"
                  required
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="publicationDate">
                  Publication Date <span>*</span>
                </Label>
                <Input
                  id="publicationDate"
                  onChange={handleChange}
                  value={formData.publicationDate}
                  type="date"
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="initialReleaseDate">
                  Initial Release Date <span>*</span>
                </Label>
                <Input
                  id="initialReleaseDate"
                  onChange={handleChange}
                  value={formData.initialReleaseDate}
                  type="date"
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="edition">Edition</Label>
                <Input
                  id="edition"
                  onChange={handleChange}
                  value={formData.edition}
                  type="text"
                  maxLength="35"
                  placeholder="e.g., 1st Edition"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  onChange={handleChange}
                  value={formData.dimensions}
                  type="text"
                  maxLength="35"
                  placeholder="e.g., 20 x 15 x 2 cm"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="format">
                  Format <span>*</span>
                </Label>
                <Input
                  id="format"
                  onChange={handleChange}
                  value={formData.format}
                  type="text"
                  maxLength="35"
                  placeholder="e.g., Hardcover, Paperback"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ageRange">Reading Age</Label>
                <Input
                  id="ageRange"
                  onChange={handleChange}
                  value={formData.ageRange}
                  type="text"
                  maxLength="35"
                  placeholder="e.g., 8-12 years"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="awards">Awards</Label>
              <Input
                id="awards"
                onChange={handleChange}
                value={formData.awards}
                type="text"
                minLength="1"
                maxLength="35"
                placeholder="Comma-separated list of award"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                onChange={handleChange}
                value={formData.tags}
                type="text"
                minLength="1"
                maxLength="35"
                placeholder="Comma-separated tags"
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="flex w-full gap-2 sm:w-auto"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
