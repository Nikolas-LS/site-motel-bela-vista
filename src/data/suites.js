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
// TODO: trocar as fotos ilustrativas (Unsplash) pelas fotos reais e definir descrições e valores reais.
export const suites = [
  {
    name: 'Standard',
    icon: IconBed,
    image: standard2,
    images: [standard2, standard1, standard5, standard4, standard3],
    desc: 'Conforto essencial em um ambiente aconchegante e reservado, ideal para um momento a dois.',
    price: 'Consulte',
  },
  {
    name: 'Luxo',
    icon: IconStar,
    image: luxo1,
    images: [luxo1, luxo2, luxo3, luxo4, luxo5],
    desc: 'Decoração refinada, ambiente amplo e comodidades superiores.',
    price: 'Consulte',
  },
  {
    name: 'Super Luxo',
    icon: IconCrown,
    image: superLuxo2,
    images: [superLuxo2, superLuxo1, superLuxo5, superLuxo3, superLuxo4],
    desc: 'Nossa experiência mais completa: máximo conforto, espaço e requinte.',
    price: 'Consulte',
  },
  {
    name: 'Mini-Suíte',
    icon: IconHeart,
    image: miniSuite1,
    images: [miniSuite1, miniSuite2, miniSuite3, miniSuite4, miniSuite5],
    desc: 'Espaço charmoso e intimista, com tudo o que você precisa para relaxar.',
    price: 'Consulte',
  },
  {
    name: 'Suíte',
    icon: IconFire,
    image: suite8,
    images: [suite8, suite3, suite2, suite4, suite7, suite10, suite11, suite5, suite6, suite1, suite9],
    desc: 'Mais amplitude e sofisticação para tornar a noite ainda mais especial.',
    price: 'Consulte',
  },
]
