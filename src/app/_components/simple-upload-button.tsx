"use client";
import {toast} from "sonner"
import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { useEffect } from "react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG(){
    return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
}
function LoadingSpinnerSVG(){
    return(
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
        >
            <rect 
                className="spinner_jCIR" 
                x="1" 
                y="6" 
                width="2.8" 
                height="12"/>
            <rect 
                className="spinner_jCIR spinner_upm8" 
                x="5.8" 
                y="6" 
                width="2.8" 
                height="12"/>
            <rect 
                className="spinner_jCIR spinner_2eL5" 
                x="10.6" 
                y="6" 
                width="2.8" 
                height="12"/>
            <rect 
                className="spinner_jCIR spinner_Rp9l" 
                x="15.4" 
                y="6" 
                width="2.8" 
                height="12"/>
            <rect 
                className="spinner_jCIR spinner_dy3W" 
                x="20.2" 
                y="6" 
                width="2.8" 
                height="12"/>
        </svg>
    )
}
export function SimpleUploadButton(){
    const router = useRouter()
    const { inputProps } = useUploadThingInputProps("imageUploader",{
        onUploadBegin(){
            toast(
                <div className="flex gap-2 items-center">
                    <LoadingSpinnerSVG /> <span className="text-lg">Uploading...</span>
                </div>,
            {
                duration: 10000,
                id: "upload-begin",
            });
        },
        onClientUploadComplete: () => {
            toast.dismiss("upload-begin");
            toast("Upload complete!");
            router.refresh();
        }
    });
    return(
        <div>
            <label htmlFor="upload-button" className="cursor-pointer"><UploadSVG /></label>
            <input id="upload-button" type="file" className="sr-only" {...inputProps} />
        </div>
    )
}
