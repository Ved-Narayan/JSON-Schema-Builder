"use client"

import { useMemo, useCallback, useState } from "react"
import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SchemaField } from "./schema-field"
import { Button } from "@/components/ui/button"
import { Plus, Check, Eye, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export interface FieldSchema {
  id: string
  name: string
  type: "string" | "number" | "nested"
  defaultValue?: string | number
  nested?: FieldSchema[]
}

interface FormData {
  fields: FieldSchema[]
}

export function JsonSchemaBuilder() {
  const [finalizedJson, setFinalizedJson] = useState<any>(null)
  const [isFinalized, setIsFinalized] = useState(false)

  const methods = useForm<FormData>({
    mode: "onChange", // Enable real-time validation and watching
    defaultValues: {
      fields: [
        {
          id: "1",
          name: "example_field",
          type: "string",
          defaultValue: "default_value",
        },
      ],
    },
  })

  const { control, watch } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  })

  // Watch the entire form for real-time updates
  const formValues = watch()

  // Memoize the conversion function to prevent unnecessary recalculations
  const convertToJsonSchema = useCallback((fields: FieldSchema[]): any => {
    const schema: any = {}

    fields.forEach((field) => {
      if (field.name) {
        if (field.type === "nested" && field.nested) {
          schema[field.name] = convertToJsonSchema(field.nested)
        } else {
          schema[field.name] = field.defaultValue || (field.type === "string" ? "" : 0)
        }
      }
    })

    return schema
  }, [])

  // Real-time JSON output that updates as user types
  const realtimeJsonOutput = useMemo(() => {
    return convertToJsonSchema(formValues.fields || [])
  }, [formValues, convertToJsonSchema])

  // Validation function to check if all fields are properly filled
  const validateFields = useCallback((fields: FieldSchema[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    const validateFieldsRecursive = (fieldsToValidate: FieldSchema[], path = "") => {
      fieldsToValidate.forEach((field, index) => {
        const fieldPath = path ? `${path}[${index}]` : `Field ${index + 1}`

        if (!field.name || field.name.trim() === "") {
          errors.push(`${fieldPath}: Field name is required`)
        }

        if (field.type === "nested") {
          if (!field.nested || field.nested.length === 0) {
            errors.push(`${fieldPath}: Nested field must have at least one child field`)
          } else {
            validateFieldsRecursive(field.nested, `${fieldPath} > Nested`)
          }
        } else {
          if (field.defaultValue === undefined || field.defaultValue === "") {
            errors.push(`${fieldPath}: Default value is required`)
          }
        }
      })
    }

    validateFieldsRecursive(fields)
    return { isValid: errors.length === 0, errors }
  }, [])

  const addField = () => {
    append({
      id: Date.now().toString(),
      name: "",
      type: "string",
      defaultValue: "",
    })
    // Reset finalized state when adding new fields
    setIsFinalized(false)
    setFinalizedJson(null)
  }

  const handleDone = () => {
    const validation = validateFields(formValues.fields || [])

    if (validation.isValid) {
      const finalJson = convertToJsonSchema(formValues.fields || [])
      setFinalizedJson(finalJson)
      setIsFinalized(true)
      toast({
        title: "Schema Finalized!",
        description: "All fields are valid. Final JSON schema generated successfully.",
      })
    } else {
      toast({
        title: "Validation Failed",
        description: `Please fix the following issues:\n${validation.errors.slice(0, 3).join("\n")}${validation.errors.length > 3 ? `\n...and ${validation.errors.length - 3} more` : ""}`,
        variant: "destructive",
      })
    }
  }

  // Reset finalized state when form changes after finalization
  const handleFormChange = () => {
    if (isFinalized) {
      setIsFinalized(false)
      setFinalizedJson(null)
    }
  }

  const copyToClipboard = (jsonData: any, type: string) => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
    toast({
      title: "Copied!",
      description: `${type} JSON schema copied to clipboard.`,
    })
  }

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Schema Builder - Left Side */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  Schema Builder
                  {isFinalized && (
                    <Badge variant="secondary">
                      <Check className="w-3 h-3 mr-1" />
                      Finalized
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={addField} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </Button>
                  <Button onClick={handleDone} size="sm">
                    <Check className="w-4 h-4 mr-2" />
                    Done
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {fields.map((field, index) => (
                <SchemaField
                  key={field.id}
                  index={index}
                  onRemove={() => {
                    remove(index)
                    handleFormChange()
                  }}
                  isRemovable={fields.length > 1}
                  onFieldChange={handleFormChange}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* JSON Preview - Right Side */}
        <div className="space-y-4">
          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live JSON Preview
                  <Badge variant="secondary">Real-time</Badge>
                </div>
                <Button onClick={() => copyToClipboard(realtimeJsonOutput, "Live")} size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Live
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <Eye className="w-4 h-4 inline mr-1" />
                    Updates with every keystroke
                  </p>
                </div>
                <div className="bg-muted rounded-lg max-h-[300px] overflow-y-auto">
                  <pre className="p-4 text-sm whitespace-pre-wrap">{JSON.stringify(realtimeJsonOutput, null, 2)}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finalized Preview */}
          {isFinalized && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Final JSON Schema
                    <Badge variant="default">Validated</Badge>
                  </div>
                  <Button onClick={() => copyToClipboard(finalizedJson, "Final")} size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Final
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <Check className="w-4 h-4 inline mr-1" />
                      Validated and finalized schema
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg max-h-[300px] overflow-y-auto">
                    <pre className="p-4 text-sm whitespace-pre-wrap">{JSON.stringify(finalizedJson, null, 2)}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </FormProvider>
  )
}
