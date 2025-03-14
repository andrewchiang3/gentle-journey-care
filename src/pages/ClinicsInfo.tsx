
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const ClinicsInfo = () => {
  const location = useLocation();
  const language = location.state?.language || 'en';

  const clinics = [
    {
      name: "Ferry County Public Hospital District",
      address: "36 Klondike Rd, Republic, WA 99166",
      phone: "(509) 775-3333",
      hours: "Monday-Friday: 8:00 AM - 5:00 PM",
      services: language === 'en' 
        ? ["Pediatric Care", "Preventative Medicine", "Family Health", "Telehealth Services"]
        : ["Cuidado Pediátrico", "Medicina Preventiva", "Salud Familiar", "Servicios de Telesalud"],
      website: "https://www.fcphd.org",
      coordinates: { lat: 48.6498, lng: -118.7354 }
    },
    {
      name: "Republic Health Center",
      address: "110 N Clark Ave, Republic, WA 99166",
      phone: "(509) 775-3153",
      hours: "Monday-Friday: 9:00 AM - 6:00 PM",
      services: language === 'en' 
        ? ["Pediatric Services", "Family Medicine", "Primary Care", "Virtual Consultations"]
        : ["Servicios Pediátricos", "Medicina Familiar", "Atención Primaria", "Consultas Virtuales"],
      website: "https://www.republichealth.org",
      coordinates: { lat: 48.6476, lng: -118.7384 }
    },
    {
      name: "Northeast Washington Health Programs",
      address: "320 E 3rd Ave, Kettle Falls, WA 99141",
      phone: "(509) 738-6576",
      hours: "Monday-Thursday: 8:00 AM - 5:00 PM, Friday: 8:00 AM - 2:00 PM",
      services: language === 'en' 
        ? ["Child Healthcare", "Family Practice", "Rural Healthcare", "Telehealth"]
        : ["Cuidado de Salud Infantil", "Práctica Familiar", "Cuidado de Salud Rural", "Telesalud"],
      website: "https://www.newhp.org",
      coordinates: { lat: 48.6106, lng: -118.0553 }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'en' ? "Ferry County Clinics" : "Clínicas del Condado de Ferry"}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? "Find local healthcare clinics in Ferry County and surrounding areas."
              : "Encuentre clínicas de atención médica locales en el condado de Ferry y áreas circundantes."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {clinics.map((clinic, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50 border-b border-green-100 pb-4">
                <CardTitle className="text-lg font-medium text-green-800">{clinic.name}</CardTitle>
                <CardDescription className="flex items-center text-gray-700 mt-1">
                  <MapPin className="h-4 w-4 mr-1 text-green-600" />
                  {clinic.address}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-start space-x-2">
                  <Phone className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <p className="text-gray-700">{clinic.phone}</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <p className="text-gray-700">{clinic.hours}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">
                    {language === 'en' ? "Services:" : "Servicios:"}
                  </p>
                  <ul className="grid grid-cols-2 gap-1">
                    {clinic.services.map((service, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center">
                        <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  asChild
                >
                  <Link 
                    to="/schedule" 
                    state={{ language, preselectedClinic: clinic.name }}
                  >
                    {language === 'en' ? "Schedule Visit" : "Programar Visita"}
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-green-700"
                  onClick={() => window.open(clinic.website, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {language === 'en' ? "Website" : "Sitio Web"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="default" 
            className="bg-green-500 hover:bg-green-600 text-white"
            asChild
          >
            <Link to="/" state={{ language }}>
              {language === 'en' ? "Return to Home" : "Volver al Inicio"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicsInfo;
