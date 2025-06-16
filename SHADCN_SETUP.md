# Shadcn/UI Integration Guide

This project has been enhanced with shadcn/ui components for a modern, accessible, and beautiful design system.

## What's Been Added

### Core Components
- **Button** - Enhanced with multiple variants (default, destructive, outline, secondary, ghost, link, primary)
- **Card** - Container component with header, content, and footer sections
- **Input** - Form input with consistent styling
- **Label** - Accessible form labels
- **Badge** - Small status indicators and tags
- **Skeleton** - Loading placeholders
- **Separator** - Visual dividers

### Advanced Components
- **Dialog** - Modal dialogs built on Radix UI
- **Dropdown Menu** - Context menus and action menus
- **Select** - Custom select dropdowns
- **Toast** - Notification system with provider and hooks

### Icon System
- **Lucide React** - Beautiful, customizable icons
- **Radix Icons** - Additional icon set from Radix UI

## Usage Examples

### Basic Components
```tsx
import { Button, Card, CardContent, Badge } from './components/ui';

function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Primary Action</Button>
        <Badge variant="secondary">Status</Badge>
      </CardContent>
    </Card>
  );
}
```

### Toast Notifications
```tsx
import { useToast } from './hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const showToast = () => {
    toast({
      title: "Success!",
      description: "Action completed successfully.",
    });
  };
  
  return <Button onClick={showToast}>Show Toast</Button>;
}
```

### Dialog Example
```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui';

function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content goes here...</p>
      </DialogContent>
    </Dialog>
  );
}
```

## Enhanced Features

### Heroes Page
The Heroes page has been completely redesigned with:
- **Card-based layout** for better organization
- **Loading skeletons** for better UX during data fetching
- **Badge indicators** for status and houses
- **Improved buttons** with icons and consistent styling
- **Grid layout** for responsive design

### Navigation Bar
Updated with:
- **Better responsive design**
- **Smooth icon transitions** for theme toggle
- **Improved typography** and spacing

### Form Components
Enhanced with:
- **Consistent error styling** using destructive color tokens
- **Better spacing** and layout
- **Accessible form labels**

## File Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── separator.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   └── index.ts           # Barrel exports
│   ├── toaster.tsx            # Toast provider component
│   └── ToastExample.tsx       # Toast usage examples
├── hooks/
│   └── use-toast.ts           # Toast hook
└── utils/
    └── style.ts               # cn utility function
```

## Configuration Files

- **components.json** - Shadcn/UI configuration
- **tailwind.config.js** - Already configured with shadcn color tokens
- **src/index.css** - CSS variables for theming

## Dark Mode Support

All components support dark mode through CSS variables and Tailwind's dark mode classes. The theme is managed by your existing theme store.

## Dependencies Added

```json
{
  "lucide-react": "^latest",
  "@radix-ui/react-icons": "^latest",
  "@radix-ui/react-dialog": "^latest",
  "@radix-ui/react-dropdown-menu": "^latest",
  "@radix-ui/react-select": "^latest",
  "@radix-ui/react-separator": "^latest",
  "@radix-ui/react-toast": "^latest"
}
```

## Next Steps

1. **Add more components** as needed (e.g., Table, Tabs, Form)
2. **Customize theme colors** in `src/index.css`
3. **Create compound components** for common patterns
4. **Add animations** using framer-motion if desired

## Design Tokens

The project uses CSS custom properties for consistent theming:

- `--background`, `--foreground` - Base colors
- `--primary`, `--primary-foreground` - Primary brand colors
- `--secondary`, `--secondary-foreground` - Secondary colors
- `--destructive`, `--destructive-foreground` - Error states
- `--muted`, `--muted-foreground` - Subdued content
- `--accent`, `--accent-foreground` - Highlighted content
- `--border`, `--input`, `--ring` - Interactive elements

All components automatically adapt to both light and dark themes using these tokens.
