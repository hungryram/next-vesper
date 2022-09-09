import Image from "next/image";

export default function Loading() {
  return (
    <div className="loading">
        <div className="flex items-center justify-center h-full">
            <div className="loaderImage"></div>
        </div>
    </div>
  )
}
