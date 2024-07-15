import { useEffect, useState, useRef } from "react";
import BackgroundComponent from "@/components/Background.component.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
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
  const { getImageUrl, placeOrder } = useFirebase();
  const [imgUrls, setImgUrls] = useState([]);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (Array.isArray(data?.imageURLs)) {
        const urls = await Promise.all(data.imageURLs.map(getImageUrl));
        setImgUrls(urls);
      }
    };
    fetchImageUrls();
  }, [data, getImageUrl]);

  const handlePlaceOrder = () => {
    placeOrder(bookId, 1);
  };

  const renderTableRow = (property, value) => (
    <tr className="border-t">
      <td className="border px-4 py-2 text-left">{property}</td>
      <td className="border px-4 py-2 text-left">{value}</td>
    </tr>
  );

  return (
    <BackgroundComponent>
      <div className="py-12 duration-200 animate-in fade-in md:grid md:grid-cols-[500px,_auto] md:gap-4 md:px-4">
        <div className="mx-auto mb-10 w-fit md:mb-0 md:ml-20">
          <div className="md:fixed">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xs"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              aria-label="Book Images Carousel"
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
                                alt={`${data.name} image ${index + 1}`}
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
              <CarouselPrevious aria-label="Previous image" />
              <CarouselNext aria-label="Next image" />
            </Carousel>
            <Button
              className="my-4 w-full"
              onClick={handlePlaceOrder}
              aria-label="Place order"
            >
              Buy Now
            </Button>
          </div>
        </div>

        <div className="px-4 md:px-8">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {data?.name}
            </h1>
            <p className="mb-2 text-lg leading-7 text-muted-foreground">
              by {data?.authorName}
            </p>
          </div>
          <div>
            <span
              className="text-lg line-through opacity-70"
              aria-label="Maximum Retail Price"
            >
              Rs. {data?.maxRetailPrice}
            </span>
            <h3
              className="inline px-2 text-3xl text-foreground"
              aria-label="Final Price"
            >
              ₹{data?.finalPrice}
            </h3>
            {data?.maxRetailPrice && data?.finalPrice && (
              <span className="text-sm opacity-60">
                Save{" "}
                {(
                  ((data.maxRetailPrice - data.finalPrice) /
                    data.maxRetailPrice) *
                  100
                ).toFixed(2)}
                %
              </span>
            )}
          </div>

          {data?.bookDescription && (
            <p className="mt-4 leading-7">{data.bookDescription}</p>
          )}

          <div className="my-6 w-full overflow-y-auto">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Book Details
            </h2>
            <table className="mt-4 w-full">
              <thead>
                <tr className="border-t bg-muted">
                  <th className="border px-4 py-2 text-left font-bold">
                    Property
                  </th>
                  <th className="border px-4 py-2 text-left font-bold">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.isbn10 && renderTableRow("ISBN 10", data.isbn10)}
                {data?.isbn13 && renderTableRow("ISBN 13", data.isbn13)}
                {data?.category &&
                  renderTableRow("Book Category", data.category)}
                {data?.condition && renderTableRow("Condition", data.condition)}
                {data?.language && renderTableRow("Language", data.language)}
                {data?.countryOfOrigin &&
                  renderTableRow("Country of Origin", data.countryOfOrigin)}
                {data?.totalBooks &&
                  renderTableRow("Total Stock Left", data.totalBooks)}
                {data?.edition && renderTableRow("Edition", data.edition)}
                {data?.dimensions &&
                  renderTableRow("Dimensions", data.dimensions)}
                {data?.format && renderTableRow("Format", data.format)}
                {data?.ageRange && renderTableRow("Age Range", data.ageRange)}
                {data?.awards && renderTableRow("Awards", data.awards)}
              </tbody>
            </table>
          </div>

          {data?.authorDescription && (
            <>
              <h2 className="mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                About the Author
              </h2>
              <p className="mt-4 leading-7">{data.authorDescription}</p>
            </>
          )}

          {data?.publisherDescription && (
            <>
              <h2 className="mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                About the Publisher
              </h2>
              <p className="mt-4 leading-7">{data.publisherDescription}</p>
            </>
          )}
        </div>
      </div>
    </BackgroundComponent>
  );
};
