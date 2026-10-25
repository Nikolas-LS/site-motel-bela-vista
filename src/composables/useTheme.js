import { ref } from 'vue'

const STORAGE_KEY = 'theme'
const THEME_COLORS = { light: '#d9d9d9', dark: '#0f0d10' }

const systemQuery = window.matchMedia('(prefers-color-scheme: dark)')
const theme = ref(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

function apply(next) {
  theme.value = next
  document.documentElement.dataset.theme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next])
}

// Sem escolha salva, o site acompanha o tema do aparelho, inclusive se ele mudar com a página aberta.
systemQuery.addEventListener('change', (event) => {
  if (!readStored()) apply(event.matches ? 'dark' : 'light')
})

// O tema inicial é definido por um script em index.html, antes da página aparecer (evita o "piscar").
export function useTheme() {
  const toggle = () => {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    apply(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // armazenamento bloqueado (aba anônima): a troca vale só até recarregar
    }
  }

  return { theme, toggle }
}
