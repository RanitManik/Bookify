import BackgroundComponent from "@/components/Background.component.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useEffect, useState } from "react";

export const BookDetailsComponent = ({ data }) => {
  const { getImageUrl } = useFirebase();
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (data.imageURL) {
      getImageUrl(data.imageURL).then((value) => {
        setImgUrl(value);
      });
    }
  }, [data, getImageUrl]);

  return (
    <BackgroundComponent>
      <div className="grid py-8 duration-200 animate-in fade-in md:px-4">
        {imgUrl ? (
          <img src={imgUrl} alt={data.name} />
        ) : (
          <p>No image available</p>
        )}
        {data.name ? <p>{data.name}</p> : <p>No name available</p>}
        {data.authorName && <p>Author: {data.authorName}</p>}
        {data.isbn10 && <p>ISBN-10: {data.isbn10}</p>}
        {data.isbn13 && <p>ISBN-13: {data.isbn13}</p>}
        {data.price && <p>Price: {data.price}</p>}
        {data.discount && <p>Discount: {data.discount}%</p>}
        {data.description && <p>Description: {data.description}</p>}
        {data.authorDescription && (
          <p>About the Author: {data.authorDescription}</p>
        )}
        {data.itemWeight && <p>Item Weight: {data.itemWeight} g</p>}
        {data.pages && <p>Print Length: {data.pages} pages</p>}
        {data.language && <p>Language: {data.language}</p>}
        {data.countryOfOrigin && (
          <p>Country of Origin: {data.countryOfOrigin}</p>
        )}
      </div>
    </BackgroundComponent>
  );
};
