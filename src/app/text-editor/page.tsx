'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Tiptap from "@/components/Tiptap"
export default function Home() {
  const formSchema = z.object({
    title: z.string().min(5, {message: "Hey the title is not long enough"}).max(100, { message: "Its too long " }),
    price: z.number().min(5, {message: "Hey the title is not long enough"}).max(100, { message: "Its too long " }),
    description: z.string().min(5, {message: "Hey the title is not long enough"}).max(100, { message: "Its too long " }).trim(),
  })

  const form = useForm<z.infer <typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      price: 29.99,
      description: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    // ✅ This will be type-safe and validated
  }

  return (
    <main className="p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for your" {...field}/>
                </FormControl>
                <FormMessage>{form.formState.errors.title?.message}</FormMessage>
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
                  <Tiptap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </main>
  )
}
