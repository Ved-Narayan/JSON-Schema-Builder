"use client"
import { useFormContext, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SchemaField } from "./schema-field"

interface NestedFieldsProps {
  parentPath: string
  onFieldChange?: () => void
}

export function NestedFields({ parentPath, onFieldChange }: NestedFieldsProps) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: parentPath,
  })

  const addNestedField = () => {
    append({
      id: Date.now().toString(),
      name: "",
      type: "string",
      defaultValue: "",
    })
    onFieldChange?.()
  }

  return (
    <Card className="bg-muted/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          Nested Fields
          <Button onClick={addNestedField} size="sm" variant="outline">
            <Plus className="w-3 h-3 mr-1" />
            Add Nested Field
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field, index) => (
          <SchemaField
            key={field.id}
            index={index}
            onRemove={() => {
              remove(index)
              onFieldChange?.()
            }}
            isRemovable={fields.length > 1}
            parentPath={parentPath}
            onFieldChange={onFieldChange}
          />
        ))}
      </CardContent>
    </Card>
  )
}
