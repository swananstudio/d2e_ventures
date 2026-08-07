import {
  Button,
  Dialog,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLenis } from "lenis/react";

interface TermsConditionProps {
  trigger: React.ReactNode;
}

const TermsCondition = ({ trigger }: TermsConditionProps) => {
  const lenis = useLenis();

  const bodyText = {
    fontSize: "15px",
    lineHeight: "1.9",
    color: "gray.700",
  };

  const sectionHeading = {
    fontSize: "18px",
    fontWeight: "700",
    color: "gray.900",
    mt: 2,
  };

  return (
    <Dialog.Root
      size="xl"
      onOpenChange={(details) => {
        if (details.open) {
          lenis?.stop();
        } else {
          lenis?.start();
        }
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content
            maxH="80vh"
            maxW="750px"
            borderRadius="20px"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Dialog.CloseTrigger asChild></Dialog.CloseTrigger>

            <Dialog.Header
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={4}
            >
              <Dialog.Title
                textAlign="center"
                w="100%"
                fontSize="30px"
                fontWeight="700"
                color="gray.800"
              >
                Terms & Conditions
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body
              py={6}
              px={8}
              overflowY="auto"
              overscrollBehavior="contain"
              scrollBehavior="smooth"
              data-lenis-prevent
              css={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
                flex: "1 1 auto",
                minHeight: 0,
              }}
            >
              <VStack align="start" gap={5}>
                <Text fontSize="15px" color="gray.600" fontWeight="500">
                  <b>Effective Date:</b> July 2026
                </Text>

                <Text {...bodyText}>
                  Welcome to the website of D2E Ventures Pvt. Ltd. By accessing
                  or using this website, you agree to comply with these Terms &
                  Conditions.
                </Text>

                <Text {...sectionHeading}>Company Information</Text>

                <Text {...bodyText}>
                  D2E Ventures Pvt. Ltd.
                  <br />
                  Shop No. G2, Classic Gloria Commercial Complex,
                  <br />
                  Near MNGL CNG Pump, Yewalewadi,
                  <br />
                  Pune – 411048, Maharashtra, India.
                  <br />
                  <br />
                  Phone: +91 82650 68887
                  <br />
                  Email: d2eventurespvtltd@gmail.com
                </Text>

                <Text {...sectionHeading}>Website Usage</Text>

                <Text {...bodyText}>
                  The information provided on this website is for general
                  informational purposes only.
                </Text>

                <Text {...bodyText}>You agree not to:</Text>

                <Text {...bodyText}>
                  • Misuse or attempt to hack the website.
                  <br />
                  • Copy or reproduce website content without written permission.
                  <br />
                  • Use the website for unlawful purposes.
                  <br />
                  • Upload malicious software or harmful content.
                </Text>

                <Text {...sectionHeading}>Intellectual Property</Text>

                <Text {...bodyText}>All content including:</Text>

                <Text {...bodyText}>
                  • Logo
                  <br />
                  • Images
                  <br />
                  • Designs
                  <br />
                  • Floor Plans
                  <br />
                  • Drawings
                  <br />
                  • Text
                  <br />
                  • Graphics
                  <br />
                  • Videos
                  <br />
                  • Brand Identity
                </Text>

                <Text {...bodyText}>
                  are the intellectual property of D2E Ventures Pvt. Ltd.
                  unless otherwise stated.
                </Text>

                <Text {...bodyText}>
                  No material may be copied, reproduced or distributed without
                  prior written consent.
                </Text>

                <Text {...sectionHeading}>Project Information</Text>

                <Text {...bodyText}>
                  All project images, renderings, layouts, floor plans, pricing
                  and specifications displayed on this website are indicative
                  only.
                </Text>

                <Text {...bodyText}>
                  Actual designs, dimensions, materials and specifications may
                  change depending on site conditions, client requirements and
                  approvals.
                </Text>

                <Text {...sectionHeading}>Quotations & Estimates</Text>

                <Text {...bodyText}>
                  Any estimate, quotation or consultation provided through the
                  website does not constitute a legally binding agreement.
                </Text>

                <Text {...bodyText}>Final pricing shall be based on:</Text>

                <Text {...bodyText}>
                  • Site Visit
                  <br />
                  • Scope of Work
                  <br />
                  • Material Selection
                  <br />
                  • Design Approval
                  <br />
                  • Written Agreement
                </Text>

                <Text {...sectionHeading}>Third-Party Links</Text>

                <Text {...bodyText}>
                  Our website may contain links to third-party websites.
                </Text>

                <Text {...bodyText}>
                  We are not responsible for the content, privacy practices or
                  availability of such websites.
                </Text>

                <Text {...sectionHeading}>Limitation of Liability</Text>

                <Text {...bodyText}>
                  D2E Ventures Pvt. Ltd. shall not be liable for any direct,
                  indirect or consequential damages arising from:
                </Text>

                <Text {...bodyText}>
                  • Use of this website
                  <br />
                  • Reliance on website information
                  <br />
                  • Website downtime
                  <br />
                  • Technical issues
                </Text>

                <Text {...sectionHeading}>Governing Law</Text>

                <Text {...bodyText}>
                  These Terms shall be governed by the laws of India.
                </Text>

                <Text {...bodyText}>
                  Any disputes shall be subject to the exclusive jurisdiction of
                  the courts of Pune, Maharashtra.
                </Text>

                <Text fontWeight="bold">Changes</Text>

                <Text {...bodyText}>
                  We reserve the right to modify these Terms & Conditions at any
                  time without prior notice.
                </Text>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer borderTop="1px solid" borderColor="gray.200" pt={4}>
              <Dialog.ActionTrigger asChild>
                <Button
                  bg="black"
                  color="white"
                  px={8}
                  _hover={{
                    bg: "gray.800",
                  }}
                >
                  Close
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default TermsCondition;