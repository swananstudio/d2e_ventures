import {
  Button,

  Dialog,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

interface PrivacyPolicyProps {
  trigger: React.ReactNode;
}

const PrivacyPolicy = ({ trigger }: PrivacyPolicyProps) => {
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
    <Dialog.Root size="xl" scrollBehavior="inside">
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content
            maxH="80vh"
            maxW="750px"
            borderRadius="20px"
            overflow="hidden"
          >
            <Dialog.CloseTrigger asChild>

            </Dialog.CloseTrigger>

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
                Privacy Policy
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body py={6} px={8}
              overflowY="auto"
              scrollBehavior="smooth">
              <VStack align="start" gap={5}>
                <Text
                  fontSize="15px"
                  color="gray.600"
                  fontWeight="500"

                ><b>Effective Date:</b> July 2026</Text>

                <Text {...bodyText}>
                  D2E Ventures Pvt. Ltd. values your privacy and is committed to
                  protecting your personal information.
                </Text>

                <Text {...sectionHeading}>
                  Information We Collect
                </Text>

                <Text {...bodyText}>
                  • Name<br />
                  • Phone Number<br />
                  • Email Address<br />
                  • Property Location<br />
                  • Project Details<br />
                  • Messages submitted through contact forms
                </Text>

                <Text {...bodyText}>
                  We may also collect limited technical information such as:
                </Text>

                <Text {...bodyText}>
                  • IP Address<br />
                  • Browser Type<br />
                  • Device Information<br />
                  • Website Usage Statistics
                </Text>

                <Text {...sectionHeading}>
                  How We Use Your Information
                </Text>

                <Text {...bodyText}>
                  We use your information to:
                </Text>

                <Text {...bodyText}>
                  • Respond to enquiries<br />
                  • Schedule consultations<br />
                  • Provide quotations<br />
                  • Improve our services<br />
                  • Contact you regarding your project<br />
                  • Send important updates
                </Text>

                <Text {...bodyText}>
                  We do not sell your personal information to third parties.
                </Text>

                <Text {...sectionHeading}>
                  Cookies
                </Text>

                <Text {...bodyText}>
                  Our website may use cookies to improve user experience and
                  website performance.
                </Text>

                <Text {...bodyText}>
                  You may disable cookies through your browser settings.
                </Text>

                <Text {...sectionHeading}>
                  Data Security
                </Text>

                <Text {...bodyText}>
                  We take reasonable technical and administrative measures to
                  safeguard your information. However, no method of internet
                  transmission is completely secure.
                </Text>

                <Text {...sectionHeading}>
                  Sharing Information
                </Text>

                <Text {...bodyText}>
                  We may share information only when:
                </Text>

                <Text {...bodyText}>
                  • Required by law<br />
                  • Necessary to provide requested services<br />
                  • Working with trusted professional partners under confidentiality obligations
                </Text>

                <Text {...sectionHeading}>
                  External Websites
                </Text>

                <Text {...bodyText}>
                  Our website may contain links to external websites. We are not
                  responsible for their privacy practices.
                </Text>

                <Text {...sectionHeading}>
                  Your Rights
                </Text>

                <Text {...bodyText}>
                  You may request to access, correct or delete your personal
                  information where legally permissible.
                </Text>

                <Text {...sectionHeading}>
                  Contact
                </Text>

                <Text {...bodyText}>
                  D2E Ventures Pvt. Ltd.<br />
                  Shop No. G2, Classic Gloria Commercial Complex,<br />
                  Near MNGL CNG Pump,<br />
                  Yewalewadi, Pune – 411048<br /><br />
                  Phone: +91 82650 68887<br />
                  Email: d2eventurespvtltd@gmail.com
                </Text>

                <Text {...sectionHeading}>
                  Policy Updates
                </Text>

                <Text {...bodyText}>
                  This Privacy Policy may be updated periodically. Continued use
                  of the website constitutes acceptance of the revised policy.
                </Text>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer
              borderTop="1px solid"
              borderColor="gray.200"
              pt={4}
            >
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

export default PrivacyPolicy;