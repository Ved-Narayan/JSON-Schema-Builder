"use client"

import { JsonSchemaBuilder } from "@/components/json-schema-builder"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">JSON Schema Builder</h1>
        <JsonSchemaBuilder />
      </div>
    </div>
  )
}
