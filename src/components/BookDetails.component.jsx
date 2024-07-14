import BackgroundComponent from "@/components/Background.component.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.jsx";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card.jsx";

export const BookDetailsComponent = ({ data, bookId }) => {
  const { getImageUrl } = useFirebase();
  const [imgUrls, setImgUrls] = useState([]);
  const [qty, setQty] = useState(1);
  const { placeOrder } = useFirebase();

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (Array.isArray(data.imageURLs)) {
        const urls = await Promise.all(
          data.imageURLs.map((url) => getImageUrl(url)),
        );
        setImgUrls(urls);
      }
    };
    fetchImageUrls();
  }, [data, getImageUrl]);

  const handlePlaceOrder = () => {
    placeOrder(bookId, qty);
  };

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <BackgroundComponent>
      <div className="py-8 duration-200 animate-in fade-in md:grid md:grid-cols-2 md:gap-4 md:px-4">
        <div className="relative mx-auto mb-10 w-fit md:mb-0">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {imgUrls.length > 0 ? (
                imgUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="h-[420px] w-[300px]">
                            <img
                              src={url}
                              alt={data.name}
                              className="m-auto h-full max-w-full select-none object-contain"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div className="grid h-[420px] w-[300px] animate-pulse place-items-center bg-muted">
                          <span>No image available</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="m-auto w-fit">
          <div>
            {data.name ? <p>{data.name}</p> : <p>No name available</p>}
            <br />
            {data.authorName && <p>Author: {data.authorName}</p>}
            <br />
            {data.isbn10 && <p>ISBN-10: {data.isbn10}</p>}
            <br />
            {data.isbn13 && <p>ISBN-13: {data.isbn13}</p>}
            <br />
            {data.finalPrice && <p>Price: {data.finalPrice}</p>}
            <br />
            {data.maxRetailPrice && data.finalPrice && (
              <p>
                Discount:{" "}
                {(
                  ((data.maxRetailPrice - data.finalPrice) /
                    data.maxRetailPrice) *
                  100
                ).toFixed(2)}
                %
              </p>
            )}
            <br />
            {data.bookDescription && <p>Description: {data.bookDescription}</p>}
            <br />
            {data.authorDescription && (
              <p>About the Author: {data.authorDescription}</p>
            )}
            <br />
            {data.publisherDescription && (
              <p>About the Publisher: {data.publisherDescription}</p>
            )}
            <br />
            {data.itemWeight && <p>Item Weight: {data.itemWeight} g</p>}
            <br />
            {data.pages && <p>Print Length: {data.pages} pages</p>}
            <br />
            {data.language && <p>Language: {data.language}</p>}
            <br />
            {data.countryOfOrigin && (
              <p>Country of Origin: {data.countryOfOrigin}</p>
            )}
          </div>

          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min="1"
            max="100"
          />
          <input
            type="range"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min="1"
            max="100"
          />
          <Button variant="secondary" onClick={handlePlaceOrder}>
            Buy Now
          </Button>
        </div>
      </div>
    </BackgroundComponent>
  );
};
