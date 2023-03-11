
import type { Defu } from 'defu'


declare const inlineConfig = {}
type ResolvedAppConfig = Defu<typeof inlineConfig, []>

declare module 'nuxt/schema' {
  interface AppConfig extends ResolvedAppConfig { }
}
