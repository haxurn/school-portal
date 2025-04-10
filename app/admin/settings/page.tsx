import { createClient } from "@/lib/supabase/server"
import { SiteSettings } from "@/components/admin/site-settings"

export default async function SettingsPage() {
  const supabase = createClient()

  // Fetch site settings
  const { data: settings } = await supabase.from("site_settings").select("*")

  // Convert settings array to object
  const settingsObject: Record<string, string> = {}
  settings?.forEach((setting) => {
    settingsObject[setting.key] = setting.value
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">Configure global settings for the school portal.</p>
      </div>

      <SiteSettings initialSettings={settingsObject} />
    </div>
  )
}
