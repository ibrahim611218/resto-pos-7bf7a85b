
# Components

RestoPOS uses shadcn/ui components with customized styling.

## Buttons

Button variants:
- `default`: Primary actions
- `secondary`: Secondary actions
- `destructive`: Dangerous actions
- `outline`: Bordered buttons
- `ghost`: Low-emphasis buttons
- `link`: Text-only buttons

Button sizes:
- `default`: Standard size
- `sm`: Small buttons
- `lg`: Large buttons
- `icon`: Square icon buttons

Example:
```jsx
<Button variant="default" size="default">Submit</Button>
```

## Cards

Use the shadcn/ui Card component for consistent card styling:

```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    Card Content
  </CardContent>
  <CardFooter>
    Card Footer
  </CardFooter>
</Card>
```

## Forms

Form components should use the shadcn/ui components (Input, Select, Checkbox, etc.) for consistency:

```jsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="email@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

## Tables

Use the shadcn/ui Table component for data tables:

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item Name</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Dialogs

Use the shadcn/ui Dialog component for modals:

```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">Dialog content goes here.</div>
    <DialogFooter>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Toast Notifications

Use the toast system for notifications:

```jsx
import { useToast } from "@/hooks/use-toast"

const { toast } = useToast()

// Show a toast
toast({
  title: "Success",
  description: "Operation completed successfully",
  variant: "default", // or "destructive"
})
```
