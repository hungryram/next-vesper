import React from 'react'

export default function idx({idx_body}) {
  return (
    <div>
        <div dangerouslySetInnerHTML={{ __html: `{idx_body}` }}/>
    </div>
  )
}
