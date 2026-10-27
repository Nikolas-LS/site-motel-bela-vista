import IconBed from '~icons/solar/bed-bold'
import IconCrown from '~icons/solar/crown-bold'
import IconFire from '~icons/solar/fire-bold'
import IconHeart from '~icons/solar/heart-bold'
import IconStar from '~icons/solar/star-bold'
import luxo1 from '@/assets/images/suites/luxo/1.jpg'
import luxo2 from '@/assets/images/suites/luxo/2.jpg'
import luxo3 from '@/assets/images/suites/luxo/3.jpg'
import luxo4 from '@/assets/images/suites/luxo/4.jpg'
import luxo5 from '@/assets/images/suites/luxo/5.jpg'
import miniSuite1 from '@/assets/images/suites/mini-suite/1.jpg'
import miniSuite2 from '@/assets/images/suites/mini-suite/2.jpg'
import miniSuite3 from '@/assets/images/suites/mini-suite/3.jpg'
import miniSuite4 from '@/assets/images/suites/mini-suite/4.jpg'
import miniSuite5 from '@/assets/images/suites/mini-suite/5.jpg'
import standard1 from '@/assets/images/suites/standard/1.jpg'
import standard2 from '@/assets/images/suites/standard/2.jpg'
import standard3 from '@/assets/images/suites/standard/3.jpg'
import standard4 from '@/assets/images/suites/standard/4.jpg'
import standard5 from '@/assets/images/suites/standard/5.jpg'
import suite1 from '@/assets/images/suites/suite/1.jpg'
import suite2 from '@/assets/images/suites/suite/2.jpg'
import suite3 from '@/assets/images/suites/suite/3.jpg'
import suite4 from '@/assets/images/suites/suite/4.jpg'
import suite5 from '@/assets/images/suites/suite/5.jpg'
import suite6 from '@/assets/images/suites/suite/6.jpg'
import suite7 from '@/assets/images/suites/suite/7.jpg'
import suite8 from '@/assets/images/suites/suite/8.jpg'
import suite9 from '@/assets/images/suites/suite/9.jpg'
import suite10 from '@/assets/images/suites/suite/10.jpg'
import suite11 from '@/assets/images/suites/suite/11.jpg'
import superLuxo1 from '@/assets/images/suites/super-luxo/1.jpg'
import superLuxo2 from '@/assets/images/suites/super-luxo/2.jpg'
import superLuxo3 from '@/assets/images/suites/super-luxo/3.jpg'
import superLuxo4 from '@/assets/images/suites/super-luxo/4.jpg'
import superLuxo5 from '@/assets/images/suites/super-luxo/5.jpg'

// A ordem desta lista é a ordem dos cards na página.
// TODO: trocar as fotos ilustrativas (Unsplash) pelas fotos reais e definir descrições reais.
export const suites = [
  {
    name: 'Standard',
    icon: IconBed,
    image: standard2,
    images: [standard2, standard1, standard5, standard4, standard3],
    desc: 'Conforto essencial e reservado para dois.',
    prices: [
      { label: '1 hora', value: 'R$ 65' },
      { label: 'Pernoite', value: 'R$ 115' },
      { label: 'Hora excedente', value: 'R$ 10' },
    ],
  },
  {
    name: 'Luxo',
    icon: IconStar,
    image: luxo1,
    images: [luxo1, luxo2, luxo3, luxo4, luxo5],
    desc: 'Decoração refinada e ambiente amplo.',
    prices: [
      { label: '1 hora', value: 'R$ 90' },
      { label: 'Pernoite', value: 'R$ 140', note: 'com hidro' },
      { label: 'Hora excedente', value: 'R$ 10' },
    ],
  },
  {
    name: 'Super Luxo',
    icon: IconCrown,
    image: superLuxo2,
    images: [superLuxo2, superLuxo1, superLuxo5, superLuxo3, superLuxo4],
    desc: 'Máximo conforto, espaço e requinte.',
    prices: [
      { label: '2 horas', value: 'R$ 120' },
      { label: 'Pernoite', value: 'R$ 160', note: 'com hidro' },
      { label: 'Hora excedente', value: 'R$ 10' },
    ],
  },
  {
    name: 'Mini-Suíte',
    icon: IconHeart,
    image: miniSuite1,
    images: [miniSuite1, miniSuite2, miniSuite3, miniSuite4, miniSuite5],
    desc: 'Espaço charmoso e intimista para relaxar.',
    prices: [
      { label: '2 horas', value: 'R$ 155' },
      { label: 'Pernoite', value: 'R$ 195', note: 'com hidro' },
      { label: 'Hora excedente', value: 'R$ 10' },
    ],
  },
  {
    name: 'Suíte',
    icon: IconFire,
    image: suite8,
    images: [suite8, suite3, suite2, suite4, suite7, suite10, suite11, suite5, suite6, suite1, suite9],
    desc: 'Mais amplitude e sofisticação para a noite.',
    prices: [
      { label: '2 horas', value: 'R$ 210' },
      { label: 'Pernoite', value: 'R$ 270', note: 'com hidro' },
      { label: 'Hora excedente', value: 'R$ 15' },
    ],
  },
]
