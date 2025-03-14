import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const availableTimeSlots = [
  {start: "9:00 AM", end: "9:30 AM"},
  {start: "9:30 AM", end: "10:00 AM"},
  {start: "10:00 AM", end: "10:30 AM"},
  {start: "10:30 AM", end: "11:00 AM"},
  {start: "11:00 AM", end: "11:30 AM"},
  {start: "11:30 AM", end: "12:00 PM"},
  {start: "2:00 PM", end: "2:30 PM"},
  {start: "2:30 PM", end: "3:00 PM"},
  {start: "3:00 PM", end: "3:30 PM"},
  {start: "3:30 PM", end: "4:00 PM"},
  {start: "4:00 PM", end: "4:30 PM"},
  {start: "4:30 PM", end: "5:00 PM"}
];

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const language = location.state?.language || 'en';
  const preselectedClinic = location.state?.preselectedClinic || '';
  
  const [patientName, setPatientName] = React.useState("");
  const [parentGuardianName, setParentGuardianName] = React.useState("");
  const [relationship, setRelationship] = React.useState("parent");
  const [phone, setPhone] = React.useState("");
  const [appointmentType, setAppointmentType] = React.useState("telehealth");
  const [selectedClinic, setSelectedClinic] = React.useState(preselectedClinic);
  const [date, setDate] = React.useState<Date>();
  const [timeSlot, setTimeSlot] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [offlineSave, setOfflineSave] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    toast({
      title: language === 'en' ? "Appointment Scheduled!" : "¡Cita Programada!",
      description: language === 'en' 
        ? `We'll send a text reminder to ${phone} for ${patientName}'s ${appointmentType} appointment on ${format(date!, 'PPP')} from ${timeSlot}.`
        : `Enviaremos un recordatorio por mensaje de texto al ${phone} para la cita de ${appointmentType === 'telehealth' ? 'telesalud' : 'clínica'} de ${patientName} el ${format(date!, 'PPP', { locale: es })} de ${timeSlot}.`,
    });

    navigate('/resources', { state: { 
      ...location.state,
      appointmentScheduled: true,
      appointmentDetails: {
        patientName,
        parentGuardianName,
        relationship,
        phone,
        appointmentType,
        clinic: selectedClinic,
        date: date ? format(date, 'PPP', { locale: language === 'es' ? es : undefined }) : '',
        timeSlot,
        offlineSave
      }
    }});
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsCalendarOpen(false); // Close the calendar after selection
  };

  const getSelectedTimeSlotText = () => {
    const selected = availableTimeSlots.find(slot => slot.start === timeSlot);
    if (!selected) return "";
    return `${selected.start} - ${selected.end}`;
  };

  if (showConfirmation) {
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
              {language === 'en' ? "Confirm Your Appointment" : "Confirmar Su Cita"}
            </h1>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-lg text-green-800">
              {language === 'en' ? "Appointment Details" : "Detalles de la Cita"}
            </h2>
            
            <div className="space-y-2">
              <div className="flex">
                <span className="font-medium w-40 text-gray-600">
                  {language === 'en' ? "Patient:" : "Paciente:"}
                </span>
                <span>{patientName}</span>
              </div>
              
              <div className="flex">
                <span className="font-medium w-40 text-gray-600">
                  {language === 'en' ? "Guardian:" : "Tutor:"}
                </span>
                <span>{parentGuardianName} ({language === 'en' ? relationship : relationship === 'parent' ? 'padre/madre' : relationship === 'grandparent' ? 'abuelo/a' : 'otro'})</span>
              </div>
              
              <div className="flex">
                <span className="font-medium w-40 text-gray-600">
                  {language === 'en' ? "Phone:" : "Teléfono:"}
                </span>
                <span>{phone}</span>
              </div>
              
              <div className="flex">
                <span className="font-medium w-40 text-gray-600">
                  {language === 'en' ? "Type:" : "Tipo:"}
                </span>
                <span>
                  {language === 'en' 
                    ? (appointmentType === 'telehealth' ? 'Telehealth Visit' : 'Local Clinic Visit')
                    : (appointmentType === 'telehealth' ? 'Consulta de Telesalud' : 'Visita a Clínica Local')}
                </span>
              </div>
              
              {selectedClinic && (
                <div className="flex">
                  <span className="font-medium w-40 text-gray-600">
                    {language === 'en' ? "Clinic:" : "Clínica:"}
                  </span>
                  <span>{selectedClinic}</span>
                </div>
              )}
              
              <div className="flex">
                <span className="font-medium w-40 text-gray-600">
                  {language === 'en' ? "Date:" : "Fecha:"}
                </span>
                <span>
                  {date ? format(date, 'PPP', { locale: language === 'es' ? es : undefined }) : ''}
                </span>
              </div>
              
              <div className="flex">
                <span className="font-medium w-40 text-gray-600">
                  {language === 'en' ? "Time:" : "Hora:"}
                </span>
                <span>{getSelectedTimeSlotText()}</span>
              </div>
              
              {reason && (
                <div>
                  <span className="font-medium block text-gray-600 mb-1">
                    {language === 'en' ? "Reason for visit:" : "Motivo de la visita:"}
                  </span>
                  <p className="text-sm pl-2 border-l-2 border-green-200">{reason}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4">
            <Checkbox 
              id="offline-save" 
              checked={offlineSave}
              onCheckedChange={(checked) => setOfflineSave(!!checked)}
            />
            <label htmlFor="offline-save" className="ml-2 text-sm text-gray-600">
              {language === 'en' 
                ? "Save appointment info for offline access" 
                : "Guardar información de cita para acceso sin conexión"}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              type="button"
              onClick={() => setShowConfirmation(false)}
              variant="outline"
            >
              {language === 'en' ? "Edit Details" : "Editar Detalles"}
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {language === 'en' ? "Confirm Appointment" : "Confirmar Cita"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            <Label htmlFor="patientName" className="text-base">
              {language === 'en' ? "Child's Full Name (Patient)" : "Nombre Completo del Niño (Paciente)"}
            </Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder={language === 'en' ? "Enter the patient's name" : "Ingrese el nombre del paciente"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentGuardianName" className="text-base">
              {language === 'en' ? "Parent/Guardian Full Name" : "Nombre Completo del Padre/Tutor"}
            </Label>
            <Input
              id="parentGuardianName"
              value={parentGuardianName}
              onChange={(e) => setParentGuardianName(e.target.value)}
              placeholder={language === 'en' ? "Enter your name" : "Ingrese su nombre"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship" className="text-base">
              {language === 'en' ? "Relationship to Patient" : "Relación con el Paciente"}
            </Label>
            <RadioGroup
              value={relationship}
              onValueChange={setRelationship}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parent" id="parent" />
                <Label htmlFor="parent">
                  {language === 'en' ? "Parent" : "Padre/Madre"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grandparent" id="grandparent" />
                <Label htmlFor="grandparent">
                  {language === 'en' ? "Grandparent" : "Abuelo/a"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">
                  {language === 'en' ? "Other Guardian" : "Otro Tutor"}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              {language === 'en' ? "Contact Phone Number" : "Número de Teléfono de Contacto"}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={language === 'en' ? "Enter phone number" : "Ingrese número de teléfono"}
              required
            />
            <p className="text-xs text-gray-500">
              {language === 'en' 
                ? "You'll receive appointment reminders via text"
                : "Recibirá recordatorios de cita por mensaje de texto"}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-base">
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
                  {language === 'en' ? "Telehealth Visit (Video Call)" : "Consulta de Telesalud (Videollamada)"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clinic" id="clinic" />
                <Label htmlFor="clinic">
                  {language === 'en' ? "Local Clinic Visit (In Person)" : "Visita a Clínica Local (En Persona)"}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {appointmentType === 'clinic' && (
            <div className="space-y-2">
              <Label htmlFor="clinic" className="text-base">
                {language === 'en' ? "Select Clinic" : "Seleccionar Clínica"}
              </Label>
              <Select
                value={selectedClinic}
                onValueChange={setSelectedClinic}
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? "Select a clinic" : "Seleccione una clínica"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ferry County Public Hospital District">
                    Ferry County Public Hospital District
                  </SelectItem>
                  <SelectItem value="Republic Health Center">
                    Republic Health Center
                  </SelectItem>
                  <SelectItem value="Northeast Washington Health Programs">
                    Northeast Washington Health Programs
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-base">
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
              <Label className="text-base">
                {language === 'en' ? "Appointment Time (30-minute slots)" : "Horario de Cita (intervalos de 30 minutos)"}
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot.start}
                    type="button"
                    variant={timeSlot === slot.start ? "default" : "outline"}
                    className={cn(
                      "h-auto py-3 flex flex-col items-center",
                      timeSlot === slot.start && "bg-green-500 hover:bg-green-600"
                    )}
                    onClick={() => setTimeSlot(slot.start)}
                  >
                    <Clock className="h-3 w-3 mb-1" />
                    <span className="text-xs">{slot.start}</span>
                    <span className="text-xs text-muted-foreground">to</span>
                    <span className="text-xs">{slot.end}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-base">
              {language === 'en' ? "Reason for Visit (Optional)" : "Motivo de la Visita (Opcional)"}
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={language === 'en' 
                ? "Briefly describe the reason for this appointment" 
                : "Describa brevemente el motivo de esta cita"}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center mt-4">
            <Checkbox 
              id="offline-save" 
              checked={offlineSave}
              onCheckedChange={(checked) => setOfflineSave(!!checked)}
            />
            <label htmlFor="offline-save" className="ml-2 text-sm text-gray-600">
              {language === 'en' 
                ? "Save appointment info for offline access" 
                : "Guardar información de cita para acceso sin conexión"}
            </label>
          </div>

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
              disabled={!patientName || !parentGuardianName || !phone || !date || !timeSlot || (appointmentType === 'clinic' && !selectedClinic)}
            >
              {language === 'en' ? "Review Appointment" : "Revisar Cita"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
