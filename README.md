# JSON Schema Builder

A powerful, real-time JSON Schema Builder built with React, TypeScript, and ShadCN UI. Create dynamic JSON schemas with live preview, nested structures, and comprehensive validation.

## 🚀 Features

### ⚡ Real-time Updates
- **Live JSON Preview**: See your JSON schema update with every keystroke
- **Character-by-character Updates**: Instant feedback as you type field names and values
- **Side-by-side Layout**: Schema builder and JSON preview in the same view

### 🏗️ Dynamic Schema Building
- **Add/Remove Fields**: Dynamically manage schema fields
- **Multiple Field Types**: Support for String, Number, and Nested types
- **Recursive Nesting**: Create complex nested structures with unlimited depth
- **Field Validation**: Visual indicators for required fields and validation errors

### ✅ Validation & Finalization
- **Done Button**: Validate complete schema and generate final output
- **Comprehensive Validation**: Check for required fields, nested structures, and data integrity
- **Dual Preview**: Live preview for building + final validated schema
- **Visual Status Indicators**: Clear badges showing live vs finalized states

### 🎨 Modern UI/UX
- **ShadCN UI Components**: Beautiful, accessible interface
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Full type safety and IntelliSense support
- **React Hook Forms**: Efficient form state management

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 14
- **Language**: TypeScript
- **UI Library**: ShadCN UI (Radix UI + Tailwind CSS)
- **Form Management**: React Hook Forms
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git https://github.com/Ved-Narayan/JSON-Schema-Builder
   cd JSON-Schema-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Workflow

1. **Start Building**: Begin with the default field or add new fields using the "Add Field" button
2. **Configure Fields**: 
   - Enter field names in the "Field Name" input
   - Select field type (String, Number, or Nested)
   - Set default values for String and Number types
3. **Watch Live Preview**: See your JSON schema update in real-time as you type
4. **Add Nested Structures**: Select "Nested" type to create complex hierarchical schemas
5. **Validate & Finalize**: Click "Done" to validate all fields and generate the final schema
6. **Copy & Use**: Use the copy buttons to get your JSON schema

### Field Types

#### String Fields
- **Purpose**: Text-based data
- **Default Value**: Required text input
- **Example**: `"name": "John Doe"`

#### Number Fields  
- **Purpose**: Numeric data
- **Default Value**: Required numeric input
- **Example**: `"age": 25`

#### Nested Fields
- **Purpose**: Complex object structures
- **Contains**: Other fields (String, Number, or Nested)
- **Example**: 
  ```json
  "address": {
    "street": "123 Main St",
    "city": "New York"
  }
  ```

### Advanced Features

#### Real-time Validation
- **Visual Indicators**: Red borders on empty required fields
- **Error Messages**: Detailed validation feedback
- **Field Status**: Clear indication of field completion status

#### Dual Preview System
- **Live Preview**: Updates with every keystroke for immediate feedback
- **Final Schema**: Validated, finalized version after clicking "Done"
- **Status Badges**: Clear indication of current preview mode

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # ShadCN UI components
│   ├── json-schema-builder.tsx  # Main builder component
│   ├── schema-field.tsx     # Individual field component
│   └── nested-fields.tsx    # Nested fields container
└── hooks/
    └── use-toast.ts         # Toast notifications
```

## 🔧 Key Components

### JsonSchemaBuilder
Main component that orchestrates the entire schema building experience.

**Features:**
- Form state management with React Hook Forms
- Real-time JSON conversion
- Validation logic
- Side-by-side layout management

### SchemaField
Individual field component with support for all field types.

**Features:**
- Dynamic field type switching
- Real-time validation
- Nested field support
- Remove functionality

### NestedFields
Container component for managing nested field structures.

**Features:**
- Recursive nesting support
- Dynamic nested field addition
- Nested field removal
- Hierarchical organization

## 🎨 Customization

### Styling
The project uses Tailwind CSS with ShadCN UI components. Customize the appearance by:

1. **Modifying Tailwind Config**: Update `tailwind.config.ts`
2. **Custom CSS**: Add styles to `globals.css`
3. **Component Variants**: Modify ShadCN component variants

### Field Types
Extend the schema builder by adding new field types:

1. **Update Interface**: Add new type to `FieldSchema` interface
2. **Add UI Components**: Create form inputs for the new type
3. **Update Conversion Logic**: Handle new type in `convertToJsonSchema`
4. **Add Validation**: Include validation rules for the new type

## 🚀 Deployment

### Netlify/Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Netlify/Vercel
3. Deploy with zero configuration

### Other Platforms
The project is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any platform supporting Node.js

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 🙏 Acknowledgments

- **ShadCN UI**: For the beautiful component library
- **React Hook Forms**: For efficient form state management
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide React**: For the icon library

**Built with ❤️ using React, TypeScript, and ShadCN UI**
```

This comprehensive README covers all the key aspects of your JSON Schema Builder project, including:

- **Complete feature overview** with real-time updates and validation
- **Detailed installation and setup instructions**
- **Step-by-step usage guide** with examples
- **Technical architecture** and project structure
- **Customization guidelines** for extending functionality
- **Deployment options** for various platforms
- **Contributing guidelines** for open source collaboration

The README is structured to help both users and developers understand and work with your JSON Schema Builder effectively!

