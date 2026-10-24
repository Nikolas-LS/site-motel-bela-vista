import { site } from '@/data/site'

const DEFAULT_MESSAGE = 'Olá! Gostaria de informações sobre o Motel Bela Vista.'
const RESERVATION_MESSAGE = 'Olá! Gostaria de fazer uma reserva no Motel Bela Vista.'

export const whatsappLink = (message = DEFAULT_MESSAGE) =>
  `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(message)}`

export const reservationLink = () => whatsappLink(RESERVATION_MESSAGE)

export const suiteLink = (suiteName) =>
  whatsappLink(`Olá! Gostaria de saber mais sobre a suíte ${suiteName}.`)
