import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../hooks/use-auth-client';
import { backend_service_user } from '@/declarations/backend_service_user';

import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { cn } from '../../lib/utils';

// Patient schema
const patientFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number.' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters.' }),
  dob: z.date({ required_error: 'Date of birth is required.' }),
  gender: z.enum(['male', 'female', 'other']),
});

export default function PatientForm() {
  const { identity } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      gender: 'male',
    },
  });

  async function onSubmit(values: z.infer<typeof patientFormSchema>) {
    if (!identity?.getPrincipal) {
      toast({
        title: 'Error',
        description: 'User identity not found.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await backend_service_user.registerUser(
        identity.getPrincipal(),
        values.fullName,
        values.email,
        values.phoneNumber,
        values.address,
        format(values.dob, 'yyyy-MM-dd'),
        values.gender,
        '',
        'Patient',
        [],
        [],
      );

      if ('ok' in result) {
        toast({ title: 'Success', description: result.ok });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: result.err,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Patient registration failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to register patient.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                {['male', 'female', 'other'].map((gender) => (
                  <FormItem
                    key={gender}
                    className="flex items-center space-x-2"
                  >
                    <FormControl>
                      <RadioGroupItem value={gender} />
                    </FormControl>
                    <FormLabel>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register as Patient
        </Button>
      </form>
    </Form>
  );
}
