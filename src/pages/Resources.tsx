import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

const resourceCategories = {
  en: {
    mainServices: [
      {
        title: "Rural Resources Community Action",
        description: "Since 1965, Rural Resources Community Action has helped residents of Eastern Washington help themselves and each other. Through education, resources and support, we offer real hope to children, seniors and families.",
        link: "https://ruralresources.org/location/republic/",
        phone: "509-684-6841",
        tollFree: "1-877-219-5542"
      },
      {
        title: "Ferry County Housing Authority",
        description: "Located in Republic, WA, operates and manages public housing in Ferry County. Oversees low-income housing for seniors, special needs, and low-income families.",
        link: "https://www.ferry-county.com/services/ferry_county_housing_authority.php"
      }
    ],
    crisisServices: [
      {
        title: "Ferry County Community Services",
        phone: "509-775-0912"
      },
      {
        title: "Rural Resources Community Action",
        description: "Energy, eviction assistance, shelter",
        phone: "509-684-6841",
        tollFree: "1-877-219-5542"
      }
    ],
    childServices: [
      {
        title: "Child Care Resource & Referral",
        organization: "Catholic Family and Child Service",
        phone: "509-662-6761",
        tollFree: "1-800-261-1094"
      },
      {
        title: "Child Care Aware of Central Washington",
        phone: "1-877-965-7109"
      },
      {
        title: "NE Tri-County Health District Colville WIC Clinic",
        phone: "509-684-5048",
        tollFree: "1-800-827-3218"
      },
      {
        title: "Family Care Resources",
        organization: "Community Minded Enterprises",
        phone: "509-484-0048"
      },
      {
        title: "ESIT (Early Support for Infants & Toddlers)",
        phone: "1-800-322-2588"
      },
      {
        title: "Lead Family Resources Coordinator",
        phone: "509-775-3111"
      }
    ]
  },
  es: {
    mainServices: [
      {
        title: "Acción Comunitaria de Recursos Rurales",
        description: "Desde 1965, Rural Resources Community Action ha ayudado a los residentes del Este de Washington a ayudarse a sí mismos y a los demás. A través de la educación, recursos y apoyo, ofrecemos esperanza real a niños, adultos mayores y familias.",
        link: "https://ruralresources.org/location/republic/",
        phone: "509-684-6841",
        tollFree: "1-877-219-5542"
      },
      {
        title: "Autoridad de Vivienda del Condado de Ferry",
        description: "Ubicada en Republic, WA, opera y administra viviendas públicas en el Condado de Ferry. Supervisa viviendas de bajos ingresos para adultos mayores, necesidades especiales y familias de bajos ingresos.",
        link: "https://www.ferry-county.com/services/ferry_county_housing_authority.php"
      }
    ],
    crisisServices: [
      {
        title: "Servicios Comunitarios del Condado de Ferry",
        phone: "509-775-0912"
      },
      {
        title: "Acción Comunitaria de Recursos Rurales",
        description: "Energía, asistencia de desalojo, refugio",
        phone: "509-684-6841",
        tollFree: "1-877-219-5542"
      }
    ],
    childServices: [
      {
        title: "Recursos y Referencias para Cuidado Infantil",
        organization: "Servicio Familiar y Infantil Católico",
        phone: "509-662-6761",
        tollFree: "1-800-261-1094"
      },
      {
        title: "Child Care Aware del Centro de Washington",
        phone: "1-877-965-7109"
      },
      {
        title: "Clínica WIC de NE Tri-County Health District Colville",
        phone: "509-684-5048",
        tollFree: "1-800-827-3218"
      },
      {
        title: "Recursos de Cuidado Familiar",
        organization: "Community Minded Enterprises",
        phone: "509-484-0048"
      },
      {
        title: "ESIT (Apoyo Temprano para Bebés y Niños Pequeños)",
        phone: "1-800-322-2588"
      },
      {
        title: "Coordinador Principal de Recursos Familiares",
        phone: "509-775-3111"
      }
    ]
  }
};

const Resources = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = location.state?.language || 'en';
  const resources = resourceCategories[language];

  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header with Avatar */}
          <div className="text-center space-y-4">
            <img
              src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
              alt="Friendly Helper"
              className="w-24 h-24 mx-auto"
            />
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? "Community Resources" : "Recursos Comunitarios"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Helping People. Changing Lives. Strengthening our Community."
                : "Ayudando a las Personas. Cambiando Vidas. Fortaleciendo nuestra Comunidad."}
            </p>
          </div>

          {/* Main Services */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? "Main Services" : "Servicios Principales"}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {resources.mainServices.map((service, index) => (
                <Card key={index} className="bg-[#F2FCE2]">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {service.phone && (
                      <p className="text-sm">📞 {service.phone}</p>
                    )}
                    {service.tollFree && (
                      <p className="text-sm">🆓 {service.tollFree}</p>
                    )}
                    {service.link && (
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {language === 'en' ? "Visit Website" : "Visitar Sitio Web"}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Crisis Services */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? "Crisis Services" : "Servicios de Crisis"}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {resources.crisisServices.map((service, index) => (
                <Card key={index} className="bg-[#FEF7CD]">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    {service.description && (
                      <CardDescription>{service.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">📞 {service.phone}</p>
                    {service.tollFree && (
                      <p className="text-sm">🆓 {service.tollFree}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Child Services */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? "Child & Family Services" : "Servicios para Niños y Familias"}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {resources.childServices.map((service, index) => (
                <Card key={index} className="bg-[#D3E4FD]">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    {service.organization && (
                      <CardDescription>{service.organization}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">📞 {service.phone}</p>
                    {service.tollFree && (
                      <p className="text-sm">🆓 {service.tollFree}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Resources Link */}
          <div className="text-center pt-4">
            <a
              href="https://in.ewu.edu/ewahec/wp-content/uploads/sites/102/2016/05/Ferry-County-Resources.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              {language === 'en' 
                ? "View Complete Resource Guide (PDF)" 
                : "Ver Guía Completa de Recursos (PDF)"}
            </a>
          </div>

          {/* Return Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-white"
            >
              {language === 'en' ? "Return Home" : "Volver al Inicio"}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Resources;
