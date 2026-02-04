import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BackersPanel from "@/components/composits/BackersPanel";
import FromRacksToReceipts from "./_components/RackToReciepts";
import FaqPanel from "@/components/composits/FaqPanel";
import SectionTitle from "@/components/composits/SectionTitle";
import { CTABanner } from "@/components/composits/CTABanner";
import DarkPanel from "@/components/composits/DarkPanel";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const Contact2 = ({
  title = "Talk to a Real Human",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(977) 970 918 9068<br/>(977) 970 918 9069",
  email = "contact@medicinexp.com",
  web = { label: "medicinexp.com", url: "https://medicinexp.com" },
}: Contact2Props) => {
  return (
    <DarkPanel>
      <section className="layout-container my-32 space-y-4 lg:space-y-32 mt-42 ">
        <FromRacksToReceipts />
        <div className="flex flex-col min-h-[70dvh] justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="flex max-w-sm flex-col justify-between gap-10">
            {" "}
            <div className="flex flex-col gap-2 w-[500px] ">
              <SectionTitle
                align="left"
                className="max-w-fit  "
                title={title}
                titleContinued=""
                description={description}
              />
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left md:text-center text-primary-800">
                Contact Details
              </h3>

              <ul className="ml-4 list-disc text-primary-800">
                <li className="flex gap-1">
                  <span className="font-bold ">Phone: </span>
                  <span dangerouslySetInnerHTML={{ __html: phone }}></span>
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex max-w-3xl h-fit flex-col gap-6 border p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input type="text" id="firstname" placeholder="First Name" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input type="text" id="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" placeholder="Subject" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea placeholder="Type your message here." id="message" />
            </div>
            <Button className="w-full">Let’s Talk</Button>
          </div>
        </div>
        <CTABanner />
        <BackersPanel />
        <FaqPanel className="bg-transparent" />
      </section>
    </DarkPanel>
  );
};

export default Contact2;
