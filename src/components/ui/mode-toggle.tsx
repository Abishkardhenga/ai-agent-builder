import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="btn-secondary w-full min-w-[170px] justify-center sm:w-auto"
    >
      {isDarkMode ? (
        <>
          <Sun className="size-4" aria-hidden />
          Light mode
        </>
      ) : (
        <>
          <Moon className="size-4" aria-hidden />
          Dark mode
        </>
      )}
    </button>
  )
}
