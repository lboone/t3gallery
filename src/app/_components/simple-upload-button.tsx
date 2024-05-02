"use client";
import {toast} from "sonner"
import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { usePostHog } from "posthog-js/react";

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
function InfoSVG(){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="white" 
            className="w-6 h-6">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
            />
        </svg>
    ) 
}

function InfoSVGSolid(){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-6 h-6">
            <path 
                fillRule="evenodd" 
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" 
                clipRule="evenodd" 
            />
        </svg>
    )
}
function UploadSVG(){
    return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function ErrorSVG(){
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-6 h-6"
        >
        <path 
            fillRule="evenodd" 
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" 
            clipRule="evenodd" 
        />
        </svg>
    )
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
    const posthog = usePostHog()
    
    const { inputProps } = useUploadThingInputProps("imageUploader",{
        onUploadBegin(){
            posthog.capture("upload-begin");
            toast(
                <div className="flex gap-2 items-center">
                    <LoadingSpinnerSVG /> <span className="text-lg">Uploading...</span>
                </div>,
            {
                duration: 10000,
                id: "upload-begin",
            });
        },
        onUploadError(error){
            posthog.capture("upload-error", {
                error: error.message
            });
            toast.dismiss("upload-begin");
            toast(
                <div className="flex gap-2 items-center text-red-500">
                    <ErrorSVG /> <span className="text-lg">Error: Unable to upload your file!</span>
                </div>,
            {
                duration: 5000,
                id: "upload-error",
            });
        },
        onClientUploadComplete: () => {
            toast.dismiss("upload-begin");
            toast(
                <div className="flex gap-2 items-center">
                    <InfoSVGSolid /><span className="text-lg">Upload Complete!</span>
                </div>
            );
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
