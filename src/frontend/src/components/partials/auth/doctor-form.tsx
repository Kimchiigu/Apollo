import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useToast } from '../../../hooks/use-toast';
import { useAuth } from '../../../hooks/use-auth-client';
import { backend_service_user } from '@/declarations/backend_service_user';

import { Button } from '../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';

const specializations = [
  'Dokter Umum',
  'Spesialis Anak',
  'Spesialis Kulit',
  'Spesialis Penyakit Dalam',
  'Spesialis THT',
  'Spesialis Kandungan',
  'Dokter Hewan',
  'Psikiater',
  'Psikolog Klinis',
  'Kesehatan Paru',
  'Spesialis Mata',
  'Seksologi & Spesialis Reproduksi Pria',
  'Spesialis Gizi Klinik',
  'Talk Therapy Clinic',
  'Dokter Gigi',
  'Perawatan Rambut',
  'Spesialis Bedah',
  'Spesialis Jantung',
  'Spesialis Saraf',
  'Laktasi',
  'Program Hamil',
  'Fisioterapi & Rehabilitasi',
  'Medikolegal & Hukum Kesehatan',
  'Pemeriksaan Lab',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        {field.value
                          ? format(field.value, 'PPP')
                          : 'Pick a date'}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register as Doctor
        </Button>
      </form>
    </Form>
  );
}
