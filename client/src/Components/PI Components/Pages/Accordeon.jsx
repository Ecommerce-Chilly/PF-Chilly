import React, { useState } from 'react';
import AccordionLayout from './AccordeonLayout';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="mb-10">
      <div className="flex flex-col justify-center items-center mb-10 font-display text-lg">
        <h2 className="text-slate-800 text-3xl font-display font-semibold  mb-10">
          Frequently Asked Questions
        </h2>
        <AccordionLayout
          title="Lorem ipsum?"
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
            This is response content 1 Lorem, ipsum dolor oribus unde corporis
            accusantium maiores architecto, fugiat, laboriosam quidem libero
            qui.
          </p>
        </AccordionLayout>

        <AccordionLayout
          title="Lorem ipsum?"
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
            This is response content 2 Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Nulla at volu
          </p>
        </AccordionLayout>
        <AccordionLayout
          title="Lorem ipsum?"
          index={3}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
            This is response content 3 Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Nulla at volu
          </p>
        </AccordionLayout>

        <AccordionLayout
          title="Lorem ipsum?"
          index={4}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
            This is response content 4 Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Nulla at volu
          </p>
        </AccordionLayout>
      </div>
    </section>
  );
};
export default Accordion;
