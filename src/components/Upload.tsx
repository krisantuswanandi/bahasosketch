import { useState, useRef, ChangeEvent } from "react";

import Preview from "./Preview";
import Loading from "./Loading";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function confirmUpload() {
    if (file) {
      setUploading(true);
      setTimeout(() => {
        alert("Work in progress!");
        setUploading(false);
        clearUpload();
      }, 1000);
    }
  }

  function clearUpload() {
    URL.revokeObjectURL(imgPreview);

    fileRef.current?.value && (fileRef.current.value = "");
    setImgPreview("");
    setFile(null);
    setUploading(false);
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const imgPreview = URL.createObjectURL(event.target.files[0]);
      setImgPreview(imgPreview);
      setFile(event.target.files[0]);
    }
  }

  return (
    <div>
      <label className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-4xl leading-none text-neutral-100">
        +
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFiles}
        />
      </label>
      {imgPreview && (
        <Preview
          image={imgPreview}
          onConfirm={confirmUpload}
          onCancel={clearUpload}
        />
      )}
      {uploading && <Loading />}
    </div>
  );
}

export default Upload;
