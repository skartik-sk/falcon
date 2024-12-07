"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-3xl relative">
        {/* Gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 rounded-lg blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 rounded-lg" />

        {/* Content */}
        <div className="relative bg-black/50 backdrop-blur-sm rounded-lg border border-purple-900/50 p-6">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border-purple-900/50 px-2">
              <AccordionTrigger className="text-white hover:text-purple-400 transition-colors">
                How does anonymous sharing work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our platform uses blockchain technology to ensure your identity
                remains completely private. When you share a story, it's
                encrypted and stored without any connection to your personal
                information. Even we can't trace who posted what!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-purple-900/50 px-2">
              <AccordionTrigger className="text-white hover:text-purple-400 transition-colors">
                Is my data really secure?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We use state-of-the-art encryption and decentralized storage to
                protect your data. Your stories are split into fragments and
                distributed across the network, making it virtually impossible
                for anyone to piece together your identity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-purple-900/50 px-2">
              <AccordionTrigger className="text-white hover:text-purple-400 transition-colors">
                How do I earn rewards?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                You can earn tokens by actively participating in the community -
                sharing your stories, providing supportive comments, and helping
                others. The more value you add to the community, the more tokens
                you earn. These tokens can be used for premium features or
                exchanged for other cryptocurrencies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-purple-900/50 px-2">
              <AccordionTrigger className="text-white hover:text-purple-400 transition-colors">
                What kind of support can I expect?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our community is built on empathy and mutual support. You'll
                find people who have gone through similar experiences and are
                willing to listen and share advice. We also have AI-powered
                content moderation to ensure a safe and supportive environment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-purple-900/50 px-2">
              <AccordionTrigger className="text-white hover:text-purple-400 transition-colors">
                Can I delete my shared stories?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes, you have full control over your content. While your stories
                are anonymous, you can always access and delete them using your
                encrypted key. Once deleted, the content is permanently removed
                from our decentralized network.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
