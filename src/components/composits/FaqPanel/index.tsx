"use client";
import React, { useState, useMemo } from "react";
import DarkPanel from "../DarkPanel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionTitle from "../SectionTitle";
import { cn } from "@/lib/utils";
import { ChevronDown, SearchIcon } from "lucide-react";
import { faqs } from "./data";
import { Input } from "@/components/ui/input";

function FaqPanel({ className }: { className?: string }) {
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <DarkPanel className={cn("min-h-fit pb-24 -mt-14", className)}>
      <SectionTitle
        title="Frequently Asked"
        titleContinued="Questions"
        description="Find clear, concise answers to common questions and get the information you need fast and hassle-free."
      />

      <div className="layout-container mt-10">
        <div className="flex justify-center items-center gap-2 lg:gap-6 mb-6">
          <Input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-8 h-18 text-primary dark:text-white bg-white dark:bg-background max-w-2xl"
          />
          <SearchIcon className="text-primary h-6 w-6 mb-8" />
        </div>

        <Accordion type="single" collapsible>
          {filteredFaqs.length === 0 ? (
            <p className="text-muted-foreground text-sm mt-4">
              No matching questions found.
            </p>
          ) : (
            filteredFaqs.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="px-4 py-2 border-[1px] my-4 border-card-foreground/20 rounded-3xl hover:decoration-none bg-card transition-colors ease-in-out duration-150 hover:bg-card/80 data-[state=open]:bg-card-radial text-card-foreground data-[state=open]:text-primary"
              >
                <AccordionTrigger
                  className={cn(
                    "text-left flex items-center gap-4 text-2xl",
                    "w-full [&>svg]:transition-transform",
                  )}
                >
                  <ChevronDown className="h-6 w-6 transition-transform duration-300 group-data-[state=open]:rotate-90" />
                  <span className="flex-1 text-left">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-lg tracking-normal leading-6 font-normal">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>
    </DarkPanel>
  );
}

export default FaqPanel;
