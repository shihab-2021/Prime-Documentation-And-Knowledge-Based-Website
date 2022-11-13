import React from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactHeroSection from '../ContactHeroSection/ContactHeroSection';

const ContactMain = () => {
    return (
        <div>
            <ContactHeroSection></ContactHeroSection>
            <ContactForm></ContactForm>
        </div>
    );
};

export default ContactMain;