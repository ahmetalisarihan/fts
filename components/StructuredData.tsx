import React from 'react'

interface StructuredDataProps {
  schema: object | object[]
}

const StructuredData: React.FC<StructuredDataProps> = ({ schema }) => {
  const jsonLd = Array.isArray(schema) 
    ? schema.map(s => JSON.stringify(s)).join('\n')
    : JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  )
}

export default StructuredData
