import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {photoId: number}) {
  const image = await getImage(props.photoId);
  if (!image) throw new Error("Image not found");
  return (
    <div className="flex w-full min-w-0 h-full">
        <div className="flex-shrink flex items-center justify-center">
            <img src={image.url} alt={image.name} className="object-contain flex-shrink" />
        </div>
      
        <div className="w-48 flex flex-col flex-shrink-0 border-l">
            <div className="text-xl font-bold">{image.name}</div>
        </div>
    </div>
  )
}