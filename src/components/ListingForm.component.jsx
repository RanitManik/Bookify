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
    category: "",
    condition: "",
    countryOfOrigin: "",
    language: "",
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
    <div className="grid min-h-[min(90vh,_1080px)] place-items-center py-8 duration-200 animate-in fade-in">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">List Your Book</CardTitle>
          <CardDescription>Enter your book details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Basic Information */}
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="isbn10">ISBN-10</Label>
                <Input
                  id="isbn10"
                  onChange={handleChange}
                  value={formData.isbn10}
                  min="1000000000"
                  max="9999999999"
                  type="number"
                  placeholder="e.g., 8119555600"
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
            <div className="grid gap-4 sm:grid-cols-2">
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
                  max={formData.maxRetailPrice || "10000"}
                  placeholder="₹ Selling Price"
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
              <Label htmlFor="bookOtherPictures">Other Book Pictures</Label>
              <FileInputComponent
                id="bookOtherPictures"
                onChange={handleOtherFileChange}
                multiple
              />
            </div>
            {/* Text Areas */}
            <div className="grid gap-2">
              <Label htmlFor="bookDescription">Book Description</Label>
              <Textarea
                id="bookDescription"
                onChange={handleChange}
                value={formData.bookDescription}
                minLength="150"
                maxLength="1000"
                placeholder="Provide a brief description of the book"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="authorDescription">Author Description</Label>
              <Textarea
                id="authorDescription"
                onChange={handleChange}
                value={formData.authorDescription}
                minLength="150"
                maxLength="1000"
                placeholder="Provide a brief description of the author"
              />
            </div>
            {/* Selectors */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="category">
                  Book Category <span>*</span>
                </Label>
                <CategorySelector
                  id="category"
                  onChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  value={formData.category}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">
                  Condition <span>*</span>
                </Label>
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
            <div className="grid gap-4 sm:grid-cols-2">
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
