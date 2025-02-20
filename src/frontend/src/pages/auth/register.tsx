import { useState } from 'react';
import PatientForm from '../../components/partials/auth/patient-form';
import DoctorForm from '../../components/partials/auth/doctor-form';

export default function RegisterForm() {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-background p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center font-poppins">
          {isDoctor ? 'Doctor Registration' : 'Patient Registration'}
        </h1>

        {isDoctor ? <DoctorForm /> : <PatientForm />}

        <div className="mt-4 text-center">
          {isDoctor ? (
            <p className="font-poppins">
              Are you a patient?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDoctor(false);
                }}
                className="text-blue-600 hover:underline font-poppins"
              >
                Click here to register as a Patient
              </a>
            </p>
          ) : (
            <p className="font-poppins">
              Are you a doctor?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDoctor(true);
                }}
                className="text-blue-600 hover:underline font-poppins"
              >
                Click here to register as a Doctor
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
