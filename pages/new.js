import React from 'react'

export default function New({ idx_body }) {
  return (
    <div className="section">
        <h1>IHOMEFINDER 2</h1>
        <div
            dangerouslySetInnerHTML={{
                __html: `<div>{idx_body}</div>`
            }}
        />
    </div>
  )
}
