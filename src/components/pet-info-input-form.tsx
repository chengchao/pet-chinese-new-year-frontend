"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { usePetInfo } from "@/components/use-pet-info"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const FormSchema = z.object({
  petSpecies: z.enum(["cat", "dog"]),
  petName: z.string()
    .min(4, { message: "Petname must be at least 4 characters." })
    .regex(/^[a-xA-Z][a-zA-Z0-9.-]*$/, { message: "Pet name must be alphanumeric and begin with a letter" }),
})

interface PetNameInputFormProps {
  onPetNameSubmit: (petSpecies: string, petName: string) => void
}

export function PetInfoInputForm({ onPetNameSubmit }: PetNameInputFormProps) {
  const [, setPetInfo] = usePetInfo()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      petSpecies: "cat",
      petName: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setPetInfo({ ...data })
    onPetNameSubmit(data.petSpecies, data.petName)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="petSpecies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Species</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pet species" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cat">cat</SelectItem>
                    <SelectItem value="dog">dog</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                {"This is your pet's species."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="petName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Name</FormLabel>
              <FormControl>
                <Input placeholder="keai" {...field} />
              </FormControl>
              <FormDescription>
                {"This is your pet's name."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="mt-2">Submit</Button>
      </form>
    </Form>
  )
}
