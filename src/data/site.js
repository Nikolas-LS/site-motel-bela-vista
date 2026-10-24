// Dados do motel centralizados. Itens marcados com TODO são provisórios
// e precisam ser substituídos pelas informações reais.
export const site = {
  name: 'Motel Bela Vista',
  phoneDigits: '5551995163956', // WhatsApp e ligação
  phoneDisplay: '(51) 99516-3956',
  phone2Digits: '555135686976',
  phone2Display: '(51) 3568-6976',
  // Endereço do Guia Telefone (fonte única): confirmar no Google Maps
  address: ['Avenida Parobé, 5511 - Scharlau', 'São Leopoldo - RS'],
  // TODO: URL de incorporação do Google Maps (Compartilhar > Incorporar mapa)
  mapEmbedUrl: 'https://www.google.com/maps?q=Motel+Bela+Vista+Avenida+Parob%C3%A9+5511+S%C3%A3o+Leopoldo+RS&output=embed',
  mapsLink: 'https://www.google.com/maps/place/Motel+Bela+Vista/data=!4m2!3m1!1s0x95195cc49acabad7:0x3cc7f577378cc129',
  hours: 'Aberto 24 horas, todos os dias',
  instagram: 'https://www.instagram.com/motelbelavista/',
  facebook: 'https://www.facebook.com/motelbelavista/?locale=pt_BR',
}

export const whatsappLink = (msg = 'Olá! Gostaria de informações sobre o Motel Bela Vista.') =>
  `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(msg)}`

export const navLinks = [
  { label: 'O Motel', href: '#sobre' },
  { label: 'Suítes', href: '#suites' },
  { label: 'Comodidades', href: '#comodidades' },
  { label: 'Localização', href: '#localizacao' },
]

export const marquee = ['Privacidade total', 'Discrição', 'Conforto', 'Atendimento 24h', 'Higiene impecável', 'Ambientes românticos', 'Estacionamento privativo']

export const stats = [
  { value: '24', suffix: 'h', label: 'Atendimento' },
  { value: '100', suffix: '%', label: 'Discrição' },
  { value: '365', suffix: '', label: 'Dias por ano' },
]

// TODO: descrições provisórias e valores reais das suítes
export const suites = [
  { image: 'standard', icon: 'bed', name: 'Standard', desc: 'Conforto essencial em um ambiente aconchegante e reservado, ideal para um momento a dois.', price: 'Consulte', tag: 'Conforto' },
  { image: 'luxo', icon: 'star', name: 'Luxo', desc: 'Decoração refinada, ambiente amplo e comodidades superiores.', price: 'Consulte', tag: 'Luxo' },
  { image: 'super-luxo', icon: 'crown', name: 'Super Luxo', desc: 'Nossa experiência mais completa: máximo conforto, espaço e requinte.', price: 'Consulte', tag: 'Premium' },
  { image: 'mini-suite', icon: 'heart', name: 'Mini-Suíte', desc: 'Espaço charmoso e intimista, com tudo o que você precisa para relaxar.', price: 'Consulte', tag: 'Charme' },
  { image: 'suite', icon: 'fire', name: 'Suíte', desc: 'Mais amplitude e sofisticação para tornar a noite ainda mais especial.', price: 'Consulte', tag: 'Romance' },
]

export const comforts = [
  { icon: 'shield-check', title: 'Privacidade e sigilo', desc: 'Entrada reservada e atendimento discreto do início ao fim.' },
  { icon: 'garage', title: 'Garagem privativa', desc: 'Vaga coberta e reservada, direto para a sua suíte.' },
  { icon: 'wind', title: 'Climatização', desc: 'Ar-condicionado em todas as suítes para o seu conforto.' },
  { icon: 'tv', title: 'Entretenimento', desc: 'TV com canais por assinatura e som ambiente.' },
  { icon: 'cup-hot', title: 'Room service', desc: 'Cardápio de bebidas e petiscos servidos com discrição.' },
  { icon: 'clock-circle', title: 'Sempre aberto', desc: 'Atendemos 24 horas, todos os dias do ano.' },
]
