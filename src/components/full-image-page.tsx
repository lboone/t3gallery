import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {photoId: number}) {
  const image = await getImage(props.photoId);
  if (!image) throw new Error("Image not found");

  const uploaderInfo = await clerkClient.users.getUser(image.userId)
  return (
    <div className="flex w-full min-w-0 h-full">
        <div className="flex-grow flex items-center justify-center">
            <img src={image.url} alt={image.name} className="object-contain flex-shrink" />
        </div>
      
        <div className="w-64 flex flex-col flex-shrink-0 border-l">
            <div className="text-lg border-b text-center p-2">{image.name}</div>
            <div className="flex flex-col p-2">
                <span>Uploaded By:</span>
                <span>{uploaderInfo.fullName}</span>
            </div>
            <div className="flex flex-col p-2">
                <span>Created On:</span>
                <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    </div>
  )
}