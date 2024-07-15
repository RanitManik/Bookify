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
import { Skeleton } from "@/components/ui/skeleton.jsx";

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
      <div className="py-8 duration-200 animate-in fade-in md:grid md:grid-cols-[450px,_auto] md:gap-4 md:px-4">
        <div className="mx-auto mb-10 w-fit md:mb-0 md:ml-12">
          <div className="md:fixed">
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
                            <div className="h-[420px] w-[300px] bg-muted">
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
                          <Skeleton className="grid h-[420px] w-[300px] place-items-center">
                            <span>No image available</span>
                          </Skeleton>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Button className="my-4 w-full" onClick={handlePlaceOrder}>
              Buy Now
            </Button>
          </div>
        </div>

        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {data.name}
          </h1>
          <p className="text-lg leading-7 opacity-70">by {data.authorName}</p>

          {data.bookDescription && (
            <h2 className="mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Description
            </h2>
          )}
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            {data.bookDescription}
          </p>

          {data.authorDescription && (
            <h2 className="mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              About the Author
            </h2>
          )}
          <p className="leading-7 [&:not(:first-child)]:mt-4">
            {data.authorDescription}
          </p>

          {/*<br />
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
            {data.authorDescription && (
              <p>About the Author: {data.authorDescription}</p>
            )}
            <br />
            {data.category && <p>Category: {data.category}</p>}
            <br />
            {data.condition && <p>Condition: {data.condition}</p>}
            <br />
            {data.language && <p>Language: {data.language}</p>}
            <br />
            {data.countryOfOrigin && (
              <p>Country of Origin: {data.countryOfOrigin}</p>
            )}*/}
        </div>
      </div>
    </BackgroundComponent>
  );
};
