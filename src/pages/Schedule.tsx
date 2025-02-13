
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

const availableTimeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const language = location.state?.language || 'en';
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [appointmentType, setAppointmentType] = React.useState("telehealth");
  const [date, setDate] = React.useState<Date>();
  const [timeSlot, setTimeSlot] = React.useState("");
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: language === 'en' ? "Appointment Scheduled!" : "¡Cita Programada!",
      description: language === 'en' 
        ? `We'll send a text reminder to ${phone} for your ${appointmentType} appointment on ${format(date!, 'PPP')} at ${timeSlot}.`
        : `Enviaremos un recordatorio por mensaje de texto al ${phone} para su cita de ${appointmentType === 'telehealth' ? 'telesalud' : 'clínica'} el ${format(date!, 'PPP', { locale: es })} a las ${timeSlot}.`,
    });

    navigate('/resources', { state: { ...location.state } });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsCalendarOpen(false); // Close the calendar after selection
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
            alt="Friendly Medical Helper"
            className="w-24 h-24 mx-auto"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'en' ? "Schedule an Appointment" : "Programar una Cita"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === 'en' ? "Full Name" : "Nombre Completo"}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              {language === 'en' ? "Phone Number" : "Número de Teléfono"}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>
              {language === 'en' ? "Appointment Type" : "Tipo de Cita"}
            </Label>
            <RadioGroup
              defaultValue="telehealth"
              onValueChange={setAppointmentType}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="telehealth" id="telehealth" />
                <Label htmlFor="telehealth">
                  {language === 'en' ? "Telehealth Visit" : "Consulta de Telesalud"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clinic" id="clinic" />
                <Label htmlFor="clinic">
                  {language === 'en' ? "Local Clinic Visit" : "Visita a Clínica Local"}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>
              {language === 'en' ? "Preferred Date" : "Fecha Preferida"}
            </Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: language === 'es' ? es : undefined })
                  ) : (
                    language === 'en' ? "Pick a date" : "Seleccionar fecha"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="bg-white rounded-md shadow-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {date && (
            <div className="space-y-2">
              <Label>
                {language === 'en' ? "Available Time Slots" : "Horarios Disponibles"}
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={timeSlot === slot ? "default" : "outline"}
                    className={cn(
                      "h-9",
                      timeSlot === slot && "bg-green-500 hover:bg-green-600"
                    )}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              type="button"
              onClick={() => navigate('/confirmation', { state: { ...location.state } })}
              variant="outline"
            >
              {language === 'en' ? "Cancel" : "Cancelar"}
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={!name || !phone || !date || !timeSlot}
            >
              {language === 'en' ? "Schedule Appointment" : "Programar Cita"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
