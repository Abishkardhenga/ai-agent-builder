
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import type { CSSProperties } from 'react'

// console.log("tesaat")


const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'

  return (
    <Sonner
      theme={(resolvedTheme ?? 'light') as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': isDarkMode ? '#0f172a' : 'white',
          '--normal-text': isDarkMode ? '#f8fafc' : '#0f172a',
          '--normal-border': isDarkMode ? '#334155' : '#e2e8f0',
          '--border-radius': '0.75rem',
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
