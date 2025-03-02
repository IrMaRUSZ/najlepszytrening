  export const siteMetadata = {
      companyName: 'Najlepszy Trening',
      siteUrl: 'https://www.najlepszytrening.pl',
      author: 'Ireneusz Maruszewski',
      city: 'Łódź',
      email: 'maruszewskiirek@gmail.pl',
      phone: '+48 737 730 868',
      address: 'Gojawiczyńskiej 26, 93-253 Łódź'
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