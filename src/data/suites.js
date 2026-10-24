import IconBed from '~icons/solar/bed-bold'
import IconCrown from '~icons/solar/crown-bold'
import IconFire from '~icons/solar/fire-bold'
import IconHeart from '~icons/solar/heart-bold'
import IconStar from '~icons/solar/star-bold'
import luxo from '@/assets/images/suites/luxo.jpg'
import miniSuite from '@/assets/images/suites/mini-suite.jpg'
import standard from '@/assets/images/suites/standard.jpg'
import suite from '@/assets/images/suites/suite.jpg'
import superLuxo from '@/assets/images/suites/super-luxo.jpg'

// A ordem desta lista é a ordem dos cards na página.
// TODO: trocar as fotos ilustrativas (Unsplash) pelas fotos reais e definir descrições e valores reais.
export const suites = [
  {
    name: 'Standard',
    icon: IconBed,
    image: standard,
    desc: 'Conforto essencial em um ambiente aconchegante e reservado, ideal para um momento a dois.',
    price: 'Consulte',
  },
  {
    name: 'Luxo',
    icon: IconStar,
    image: luxo,
    desc: 'Decoração refinada, ambiente amplo e comodidades superiores.',
    price: 'Consulte',
  },
  {
    name: 'Super Luxo',
    icon: IconCrown,
    image: superLuxo,
    desc: 'Nossa experiência mais completa: máximo conforto, espaço e requinte.',
    price: 'Consulte',
  },
  {
    name: 'Mini-Suíte',
    icon: IconHeart,
    image: miniSuite,
    desc: 'Espaço charmoso e intimista, com tudo o que você precisa para relaxar.',
    price: 'Consulte',
  },
  {
    name: 'Suíte',
    icon: IconFire,
    image: suite,
    desc: 'Mais amplitude e sofisticação para tornar a noite ainda mais especial.',
    price: 'Consulte',
  },
]
