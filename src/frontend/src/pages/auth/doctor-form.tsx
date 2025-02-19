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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const specializations = [
  'General',
  'Pediatrician',
  'Dermatologist',
  'Cardiologist',
];

// Doctor schema
const doctorFormSchema = z.object({
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
  registrationNumber: z
    .string()
    .min(1, { message: 'Registration number is required.' }),
  specialization: z.string().min(1, { message: 'Specialization is required.' }),
});

export default function DoctorForm() {
  const { identity } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof doctorFormSchema>>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      gender: 'male',
      registrationNumber: '',
      specialization: '',
    },
  });

  async function onSubmit(values: z.infer<typeof doctorFormSchema>) {
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
        'Doctor',
        [values.specialization],
        [values.registrationNumber],
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
      console.error('Doctor registration failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to register doctor.',
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
                <Input placeholder="Dr. John Doe" {...field} />
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
                <Input
                  type="email"
                  placeholder="doctor@example.com"
                  {...field}
                />
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
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Register as Doctor
        </Button>
      </form>
    </Form>
  );
}
