
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Appointment {
  name: string;
  date: Date;
  time: string;
  type: string;
}

interface AppointmentReminderProps {
  appointment: Appointment | null;
  language: string;
}

export const AppointmentReminder = ({ appointment, language }: AppointmentReminderProps) => {
  if (!appointment) return null;

  return (
    <Card className="bg-[#FFF5F5] border-none shadow-sm max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          {language === 'en' ? "Upcoming Appointments" : "Próximas Citas"}
          <CalendarIcon className="h-6 w-6 text-pink-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-2xl font-semibold">{appointment.name}</h3>
        <p className="text-xl text-gray-600">
          {format(appointment.date, 'M/d/yyyy', { locale: language === 'es' ? es : undefined })} at {appointment.time}
        </p>
        <div className={`inline-block px-4 py-2 rounded-lg ${
          appointment.type === 'telehealth' 
            ? 'bg-pink-100 text-pink-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {appointment.type === 'telehealth'
            ? (language === 'en' ? "Telehealth Visit" : "Consulta de Telesalud")
            : (language === 'en' ? "Local Clinic Visit" : "Visita a Clínica Local")}
        </div>
      </CardContent>
    </Card>
  );
};
