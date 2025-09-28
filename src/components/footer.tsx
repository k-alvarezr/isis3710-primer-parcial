
import { useTranslations } from 'next-intl';  

const Footer = () => {
  const t = useTranslations();  

  return (
    <footer className="bg-[#11463B] text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>{t('footer.rightsReserved')}</p>  
        <p className="text-right">{t('footer.developedBy')}</p> 
      </div>
    </footer>
  );
};

export default Footer;
