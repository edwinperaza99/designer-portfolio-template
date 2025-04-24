"use client";

import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { ImageData } from "@/types";

export default function ImagesGallery({ images }: { images: ImageData[] }) {
	// State to store the dimensions of the images
	const [imageDimensions, setImageDimensions] = useState<{
		[key: number]: { width: number; height: number };
	}>({});

	// Function to update image dimensions once the image is loaded
	const handleImageLoad = (index: number, width: number, height: number) => {
		setImageDimensions((prev) => ({
			...prev,
			[index]: { width, height },
		}));
	};

	return (
		<Gallery withCaption>
			{images.map((image, index) => (
				<div key={index} className="w-full mb-4 md:mb-6">
					<Item
						original={image.asset.url}
						thumbnail={image.asset.url}
						width={imageDimensions[index]?.width || 1200} // Default to 1200 if not loaded
						height={imageDimensions[index]?.height || 800} // Default to 800 if not loaded
						caption={image.credit || ""}
					>
						{({ ref, open }) => (
							<div>
								<Image
									ref={ref}
									onClick={open}
									src={image.asset.url}
									alt={image.alt || ""}
									fill={false}
									width={imageDimensions[index]?.width || 1200} // Set width dynamically
									height={imageDimensions[index]?.height || 800} // Set height dynamically
									onLoad={(e) => {
										const { naturalWidth, naturalHeight } =
											e.currentTarget as HTMLImageElement;
										handleImageLoad(index, naturalWidth, naturalHeight);
									}} // Capture original dimensions
									style={{ objectFit: "contain" }}
									className="object-cover w-full cursor-pointer"
									placeholder="blur"
									blurDataURL={image.asset.metadata.lqip}
									loading="lazy"
								/>
							</div>
						)}
					</Item>
				</div>
			))}
		</Gallery>
	);
}
