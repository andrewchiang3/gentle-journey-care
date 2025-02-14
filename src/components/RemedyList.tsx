
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RemedyItem } from './RemedyItem';

interface Remedy {
  title: string;
  description: string;
}

interface RemedySection {
  topic: string;
  remedies: Remedy[];
}

interface RemedyListProps {
  sections: RemedySection[];
  selectedRemedies: { [key: string]: string[] };
  onToggleRemedy: (topic: string, remedyTitle: string) => void;
}

export const RemedyList: React.FC<RemedyListProps> = ({
  sections,
  selectedRemedies,
  onToggleRemedy,
}) => {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Accordion key={index} type="single" collapsible className="bg-white rounded-xl shadow-sm">
          <AccordionItem value={`section-${index}`} className="border-none">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold text-[#2D1810] hover:bg-[#FDF7F3] rounded-t-xl">
              {section.topic}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {section.remedies.map((remedy, remedyIndex) => (
                  <RemedyItem
                    key={remedyIndex}
                    title={remedy.title}
                    description={remedy.description}
                    isSelected={Object.keys(selectedRemedies).some(topic => 
                      topic === section.topic && selectedRemedies[topic].includes(remedy.title)
                    )}
                    onToggle={() => onToggleRemedy(section.topic, remedy.title)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
