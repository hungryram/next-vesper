import { PortableText } from "@portabletext/react";

export default function PlainPage({content}) {
  return (
    <div className="section">
      <div className="container content">
      <PortableText
            value={content}
        />
      </div>
    </div>
  )
}
