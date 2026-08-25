import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { QrContentState, QrContentType } from "@/features/qr/types"

type ContentPanelProps = {
  state: QrContentState
  onChange: (patch: Partial<QrContentState>) => void
}

const contentTypes: { value: QrContentType; label: string }[] = [
  { value: "url", label: "URL" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "wifi", label: "Wi-Fi" },
]

export function ContentPanel({ state, onChange }: ContentPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel className="text-label font-medium text-muted-foreground">
          Content type
        </FieldLabel>
        <Select
          value={state.contentType}
          onValueChange={(value) =>
            onChange({ contentType: value as QrContentType })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {state.contentType === "url" ? (
        <Field>
          <FieldLabel className="text-label font-medium text-muted-foreground">
            URL
          </FieldLabel>
          <Input
            value={state.url}
            onChange={(event) => onChange({ url: event.target.value })}
            placeholder="https://example.com"
          />
        </Field>
      ) : null}

      {state.contentType === "text" ? (
        <Field>
          <FieldLabel className="text-label font-medium text-muted-foreground">
            Text
          </FieldLabel>
          <Textarea
            value={state.text}
            onChange={(event) => onChange({ text: event.target.value })}
            rows={4}
          />
        </Field>
      ) : null}

      {state.contentType === "email" ? (
        <>
          <Field>
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Email address
            </FieldLabel>
            <Input
              type="email"
              value={state.email}
              onChange={(event) => onChange({ email: event.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Subject (optional)
            </FieldLabel>
            <Input
              value={state.emailSubject}
              onChange={(event) =>
                onChange({ emailSubject: event.target.value })
              }
            />
          </Field>
        </>
      ) : null}

      {state.contentType === "phone" ? (
        <Field>
          <FieldLabel className="text-label font-medium text-muted-foreground">
            Phone number
          </FieldLabel>
          <Input
            type="tel"
            value={state.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
          />
        </Field>
      ) : null}

      {state.contentType === "wifi" ? (
        <>
          <Field>
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Network name
            </FieldLabel>
            <Input
              value={state.wifiSsid}
              onChange={(event) => onChange({ wifiSsid: event.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Password
            </FieldLabel>
            <Input
              type="password"
              value={state.wifiPassword}
              onChange={(event) =>
                onChange({ wifiPassword: event.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Encryption
            </FieldLabel>
            <Select
              value={state.wifiEncryption}
              onValueChange={(value) =>
                onChange({
                  wifiEncryption: value as QrContentState["wifiEncryption"],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">None</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field className="flex-row items-center justify-between">
            <FieldLabel className="text-label font-medium text-muted-foreground">
              Hidden network
            </FieldLabel>
            <Switch
              checked={state.wifiHidden}
              onCheckedChange={(wifiHidden) => onChange({ wifiHidden })}
            />
          </Field>
        </>
      ) : null}
    </div>
  )
}
