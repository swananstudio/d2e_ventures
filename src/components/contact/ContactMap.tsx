import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { contact_office_surrounding } from '../../assets/assets'
const ContactMap = () => {
    return (
        <Flex
            w="100%"
            justify="center"
            mt={0}
            pt={0}
            pb={{ base: 14, md: '110px' }}
            px={{ base: "5%", lg: "8%" }}
        // flexDirection={'column'}
        >
            <Grid w='100%' gapY={14} gapX={'50px'} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                <GridItem >
                    <video
                        // ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "cover",
                            borderRadius: "20px"
                        }}
                    >
                        <source src={contact_office_surrounding} type="video/webm" />
                    </video>
                </GridItem>
                <GridItem
                    boxShadow="0 5px 25px rgba(0,0,0,.06)"
                    colSpan={{ base: 1, lg: 2 }}>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.886818987388!2d73.8941924!3d18.4434473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb2bf4834db7%3A0xc87b3ad076cfd7b1!2sD2E%20Ventures%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1784914796530!5m2!1sen!2sin"
                        width="100%"
                        height="350px"
                        style={{
                            border: 0,
                            borderRadius: "20px",
                            boxShadow: "0 5px 25px rgba(0,0,0,.06)"

                        }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </GridItem>
            </Grid>


        </Flex>
    );
};

export default ContactMap;