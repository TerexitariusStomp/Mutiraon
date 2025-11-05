export async function generateMetadata(): Promise<Metadata> {
  const ck = await cookies();
  const lang = ck.get('lang')?.value === 'en' ? 'en' : 'pt';
  if (lang === 'en') {
    return {
      title: "🌳 Mutiraon: Brazil's Impact Backed Stablecoin",
      description: "Decentralized stablecoin backed by environmental impact tokens",
    };
  }
  return {
    title: "🌳 Mutiraon: Stablecoin de Impacto do Brasil",
    description: "Stablecoin descentralizada lastreada por tokens de impacto ambiental",
  };
}
