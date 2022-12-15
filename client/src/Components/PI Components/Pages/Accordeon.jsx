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
          title="How do I know which hardware is right for my computer?"
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
          You can use our online compatibility checker to see which hardware is compatible with your system. Simply select your make and model of computer, and our tool will show you a list of compatible hardware options. You can also contact our customer support team for personalized recommendations.
          </p>
        </AccordionLayout>

        <AccordionLayout
          title="How can I track my order?"
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
          Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on the shipping carrier's website. You can also log in to your account on our website to view the current status of your order.
          </p>
        </AccordionLayout>
        <AccordionLayout
          title="What is your return policy?"
          index={3}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
          We offer a 30-day return policy for most products. If you are not satisfied with your purchase, you can return it for a full refund within 30 days of the original purchase date. Some products may be subject to a restocking fee, and certain items are not eligible for return (such as custom-configured systems or special-order items). Please contact our customer support team for more information.
          </p>
        </AccordionLayout>

        <AccordionLayout
          title="Do you offer any warranties on your products?"
          index={4}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p>
          Yes, most of our products come with a manufacturer's warranty. The length of the warranty will vary depending on the specific product. You can find the warranty information for a specific product on its product page on our website. If you have any questions about a warranty, please contact our customer support team for assistance.
          </p>
        </AccordionLayout>
      </div>
    </section>
  );
};
export default Accordion;
