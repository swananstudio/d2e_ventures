import DevelopmentStage from "../components/services/DevelopmentStage"
import ClientTrust from "../components/services/ClientTrust"
import DevelopmentSolutions from "../components/services/DevelopmentSolutions"
import ServicesHeroSection from "../components/services/ServicesHeroSection"
import Footer from "../layout/Footer"

const Services = () => {
    return (
        <>
            <ServicesHeroSection />
            <DevelopmentSolutions />
            <ClientTrust />
            <DevelopmentStage />
            <Footer />
        </>
    )
}

export default Services