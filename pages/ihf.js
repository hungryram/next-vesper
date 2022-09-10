import React from 'react'

export default function Ihf() {
  console.log('test')
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `{idx_body}` }}/>
    </div>
  )
}
