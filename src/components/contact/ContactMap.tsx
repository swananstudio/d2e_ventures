import { Flex } from "@chakra-ui/react";

const ContactMap = () => {
    return (
        <Flex
            w="100%"
            justifyContent="center"
            py={{ base: 10, md: 16 }}
            px={{ base: "5%", lg: "8%" }}
        >
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8890510502624!2d73.89159547545685!3d18.44334598263529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebd4ee435af1%3A0xcee1144a72a2c8f2!2sClassic%20Gloria!5e0!3m2!1sen!2sin!4v1783863508132!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{
                    border: 0,
                    borderRadius: "20px",
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </Flex>
    );
};

export default ContactMap;