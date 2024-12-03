export const siteMetadata = {
    companyName: 'Najlepszy Trening',
    siteUrl: 'https://najlepszytrening.pl',
    author: 'Ireneusz Maruszewski',
    city: 'Łódź',
    email: 'kontakt@najlepszytrening.pl',
    phone: '+48 XXX XXX XXX',
    address: 'Pełny adres w Łodzi'
  }
  
  export const createMetadata = (title: string, description: string) => ({
    title: `${title} | ${siteMetadata.companyName}`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'pl_PL',
      url: siteMetadata.siteUrl,
    }
  })