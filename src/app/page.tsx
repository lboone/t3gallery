import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/4b22b071-992a-4064-b8c0-8c428fa071c4-79l9ws.jpeg",
  "https://utfs.io/f/33af4561-7cd2-402e-a0b9-bfccca5b2560-2vm11g.png",
  "https://utfs.io/f/66ed26f1-0ad8-482c-849a-92709f5fb828-1iid.jpeg",
  "https://utfs.io/f/af272e65-6aef-4e8d-a6e1-65ad2482e7bb-1b43m2.webp",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}))

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages,...mockImages,...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
