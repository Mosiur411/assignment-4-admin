import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import Button from "../ui/Button"


export function AddTask() {
    const form = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
            <DialogDescription className="sr-only">
                Add a new task to your todo list
            </DialogDescription>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
       
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel />
                        <FormControl>
                        <Input {...field} value={field.value || ''} />
                        </FormControl>
                        
                    </FormItem>
                    )}
                />
               <DialogFooter>
                 <Button type="submit" className="mt-4">Save Task</Button>
            </DialogFooter>
            </form>
          
        </Form>

       
      </DialogContent>
    </Dialog>
  )
}
