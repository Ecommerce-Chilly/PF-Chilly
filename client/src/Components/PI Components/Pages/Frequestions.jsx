import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
    
export default function Example() {
    return (
      <div class="relative z-10 container px-4 mx-auto">
        <div class="md:max-w-4xl mx-auto">
          <p class="mb-10 text-sm text-indigo-600 text-center font-semibold uppercase tracking-px">
            Have any questions?
          </p>
          <h2 class="mb-16 text-6xl md:text-8xl xl:text-10xl text-center font-bold font-heading tracking-px-n leading-none">
            Frequently Asked Questions
          </h2>
         </div>
         <Accordion allowMultipleExpanded>
    {items.map((item) => (
        <AccordionItem key={item.uuid}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    {item.heading}
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content}
            </AccordionItemPanel>
        </AccordionItem>
    ))}
</Accordion>

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        </div>
    );
}






