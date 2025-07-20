"use client"
import { useFormContext } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { NestedFields } from "./nested-fields"

interface SchemaFieldProps {
  index: number
  onRemove: () => void
  isRemovable: boolean
  parentPath?: string
  onFieldChange?: () => void
}

export function SchemaField({ index, onRemove, isRemovable, parentPath = "fields", onFieldChange }: SchemaFieldProps) {
  const { register, watch, setValue } = useFormContext()
  const fieldPath = `${parentPath}.${index}`
  const fieldType = watch(`${fieldPath}.type`)

  const handleTypeChange = (newType: string) => {
    setValue(`${fieldPath}.type`, newType)

    // Set default values based on type
    if (newType === "string") {
      setValue(`${fieldPath}.defaultValue`, "")
      setValue(`${fieldPath}.nested`, undefined)
    } else if (newType === "number") {
      setValue(`${fieldPath}.defaultValue`, 0)
      setValue(`${fieldPath}.nested`, undefined)
    } else if (newType === "nested") {
      setValue(`${fieldPath}.defaultValue`, undefined)
      setValue(`${fieldPath}.nested`, [
        {
          id: Date.now().toString(),
          name: "",
          type: "string",
          defaultValue: "",
        },
      ])
    }

    // Notify parent of field change
    onFieldChange?.()
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor={`${fieldPath}.name`}>
                Field Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`${fieldPath}.name`}
                placeholder="Enter field name"
                {...register(`${fieldPath}.name`)}
                className={!watch(`${fieldPath}.name`) ? "border-red-200" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Field Type</Label>
              <Select value={fieldType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="nested">Nested</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {fieldType !== "nested" ? (
              <div className="space-y-2">
                <Label htmlFor={`${fieldPath}.defaultValue`}>
                  Default Value <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`${fieldPath}.defaultValue`}
                  type={fieldType === "number" ? "number" : "text"}
                  placeholder={fieldType === "number" ? "0" : "Enter default value"}
                  {...register(`${fieldPath}.defaultValue`, {
                    valueAsNumber: fieldType === "number",
                  })}
                  className={
                    !watch(`${fieldPath}.defaultValue`) && watch(`${fieldPath}.defaultValue`) !== 0
                      ? "border-red-200"
                      : ""
                  }
                />
              </div>
            ) : (
              <div className="flex justify-end">
                {isRemovable && (
                  <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {fieldType !== "nested" && (
            <div className="flex justify-end">
              {isRemovable && (
                <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {fieldType === "nested" && (
          <div className="mt-6">
            <NestedFields parentPath={`${fieldPath}.nested`} onFieldChange={onFieldChange} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
