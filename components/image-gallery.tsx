"use client";

import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { ImageData } from "@/types";
import { motion } from "framer-motion";

export default function ImagesGallery({ images }: { images: ImageData[] }) {
	const [imageDimensions, setImageDimensions] = useState<{
		[key: number]: { width: number; height: number };
	}>({});

	const handleImageLoad = (index: number, width: number, height: number) => {
		setImageDimensions((prev) => ({
			...prev,
			[index]: { width, height },
		}));
	};

	return (
		<Gallery withCaption>
			{images.map((image, index) => (
				<motion.div
					key={index}
					className="w-full mb-4 md:mb-6"
					initial={{ opacity: 0.5, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
					viewport={{ once: false, amount: 0.1 }}
				>
					<Item
						original={image.asset.url}
						thumbnail={image.asset.url}
						width={imageDimensions[index]?.width || 1200}
						height={imageDimensions[index]?.height || 800}
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
									width={imageDimensions[index]?.width || 1200}
									height={imageDimensions[index]?.height || 800}
									onLoad={(e) => {
										const { naturalWidth, naturalHeight } =
											e.currentTarget as HTMLImageElement;
										handleImageLoad(index, naturalWidth, naturalHeight);
									}}
									style={{ objectFit: "contain" }}
									className="object-cover w-full cursor-pointer"
									placeholder="blur"
									blurDataURL={image.asset.metadata.lqip}
									loading="lazy"
								/>
							</div>
						)}
					</Item>
				</motion.div>
			))}
		</Gallery>
	);
}
