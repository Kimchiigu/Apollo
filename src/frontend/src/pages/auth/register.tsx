import { useState } from 'react';
import PatientForm from './patient-form';
import DoctorForm from './doctor-form';
import { Button } from '../../components/ui/button';

export default function RegisterForm() {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          {isDoctor ? 'Doctor Registration' : 'Patient Registration'}
        </h1>

        {isDoctor ? <DoctorForm /> : <PatientForm />}

        <div className="mt-6 text-center">
          <Button onClick={() => setIsDoctor(!isDoctor)}>
            {isDoctor
              ? 'Switch to Patient Registration'
              : 'Switch to Doctor Registration'}
          </Button>
        </div>
      </div>
    </div>
  );
}
