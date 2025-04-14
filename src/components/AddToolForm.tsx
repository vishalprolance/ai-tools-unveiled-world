
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Tool, saveTools } from "../data/toolsData";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const toolSchema = z.object({
  name: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  categories: z.array(z.string()).min(1, {
    message: "Select at least one category.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  free: z.boolean().default(false),
});

type ToolFormValues = z.infer<typeof toolSchema>;

interface AddToolFormProps {
  onAddTool: (tool: Tool) => void;
  categories: string[];
}

export function AddToolForm({ onAddTool, categories }: AddToolFormProps) {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: [],
      url: "",
      free: false,
    },
  });

  function onSubmit(data: ToolFormValues) {
    const newTool: Tool = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      category: data.categories, // Now storing an array of categories
      url: data.url,
      free: data.free,
    };
    
    onAddTool(newTool);
    toast.success("Tool added successfully!");
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Add New Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New AI Tool</DialogTitle>
          <DialogDescription>
            Add details about a new AI tool to the collection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tool name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description of the tool"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`w-full justify-between ${!field.value.length && "text-muted-foreground"}`}
                        >
                          {field.value.length > 0
                            ? `${field.value.length} ${field.value.length === 1 ? "category" : "categories"} selected`
                            : "Select categories"}
                          <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium opacity-70">
                            {field.value.length}
                          </span>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandList>
                          <CommandEmpty>No categories found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-64">
                              {categories.map((category) => (
                                <CommandItem
                                  key={category}
                                  value={category}
                                  onSelect={() => {
                                    const isSelected = field.value.includes(category);
                                    const updatedCategories = isSelected
                                      ? field.value.filter((c) => c !== category)
                                      : [...field.value, category];
                                    form.setValue("categories", updatedCategories, { shouldValidate: true });
                                  }}
                                >
                                  <div className="flex items-center gap-2 w-full">
                                    <div className={`border-2 rounded-sm w-4 h-4 flex items-center justify-center ${field.value.includes(category) ? "bg-primary border-primary" : "border-muted"}`}>
                                      {field.value.includes(category) && (
                                        <CheckIcon className="h-3 w-3 text-primary-foreground" />
                                      )}
                                    </div>
                                    <span>{category}</span>
                                  </div>
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {field.value.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                        <button
                          type="button"
                          className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                          onClick={() => {
                            form.setValue(
                              "categories",
                              field.value.filter((c) => c !== category),
                              { shouldValidate: true }
                            );
                          }}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="free"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Free Tool</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Mark if this tool offers a free version
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">
                Add Tool
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
