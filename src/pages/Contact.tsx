
import { Flex } from '@chakra-ui/react';
import Contact_info from '../components/contact/Contact_info';
import ContactHeroSection from './../components/contact/ContactHeroSection';
import ContactMap from '../components/contact/ContactMap';
import Footer from '../layout/Footer';
const Contact = () => {
    return (
        <Flex w='100%' flexDirection={'column'} bgGradient={' linear-gradient(261deg, rgba(200, 169, 107, 0.1) 0%, rgba(200, 169, 107, 0.05) 30%, rgba(200, 169, 107, 0.05) 70%, rgba(200, 169, 107, 0.1) 100%)'}>
            <ContactHeroSection />
            <Contact_info />
            <ContactMap />
            <Footer />
        </Flex>
    )
}

export default Contact