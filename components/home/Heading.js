import { PortableText } from "@portabletext/react";

export default function Heading({ heading, body, bodyStyle, headerStyle }) {
  return (
    <div className="text-center">
        <h2 className="h2 mb-6" style={headerStyle}>{heading}</h2>
        <div style={bodyStyle}>
        <PortableText
            value={body}
        />
        </div>
    </div>
  )
}
