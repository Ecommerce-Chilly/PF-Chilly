import React, { useState } from 'react';
import AccordionLayout from './AccordeonLayout';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="mb-10">
      <div className="flex flex-col justify-center items-center mb-10 ">
        <h2 className="text-3xl font-bold underline mb-10">
          frequently asked questions
        </h2>
        <AccordionLayout
          title="question 1"
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
          title="questions 2"
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
          title="questions 3"
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
          title="questions 4"
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
