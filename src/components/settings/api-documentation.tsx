'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Copy,
  Check,
  BookOpen,
  Code2,
  Send,
  Users,
  MessageSquare,
  Radio,
  Webhook,
  Terminal,
  ShieldCheck,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ApiDocumentation() {
  const [origin, setOrigin] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const baseUrl = origin ? `${origin}/api/v1` : 'https://your-crm-domain.com/api/v1';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview & Base URL Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/30 text-primary gap-1">
              <Sparkles className="size-3" />
              REST API v1
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Third-Party CRM Ready
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Third-Party CRM Integration & REST API Documentation
          </CardTitle>
          <CardDescription className="text-sm">
            Connect any external CRM, ERP, or marketing automation platform (HubSpot, Salesforce, Zoho, LeadSquared, Zapier, Make, n8n, or custom backend) to send WhatsApp messages, sync leads, and receive live webhooks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-background/80 p-3">
              <span className="text-muted-foreground block text-xs font-medium">Base URL</span>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <code className="text-foreground break-all font-mono text-xs">{baseUrl}</code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 shrink-0"
                  onClick={() => copyToClipboard(baseUrl, 'Base URL')}
                >
                  {copiedKey === 'Base URL' ? (
                    <Check className="size-3.5 text-green-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-background/80 p-3">
              <span className="text-muted-foreground block text-xs font-medium">Authentication Header</span>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <code className="text-foreground break-all font-mono text-xs">
                  Authorization: Bearer &lt;YOUR_API_KEY&gt;
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 shrink-0"
                  onClick={() =>
                    copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'Auth header')
                  }
                >
                  {copiedKey === 'Auth header' ? (
                    <Check className="size-3.5 text-green-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Workflow Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 font-medium">
              <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-md">
                <Send className="size-4" />
              </div>
              <span className="text-sm">Trigger WhatsApp Alerts</span>
            </div>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Send instant WhatsApp order confirmations, appointment reminders, lead follow-ups, or OTPs directly from your CRM workflows.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 font-medium">
              <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-md">
                <Users className="size-4" />
              </div>
              <span className="text-sm">Sync Contacts & Leads</span>
            </div>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Automatically sync leads and customers from your website forms or CRM with deduplication by phone number.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 font-medium">
              <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-md">
                <Webhook className="size-4" />
              </div>
              <span className="text-sm">Real-time Webhook Events</span>
            </div>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Receive customer replies and delivery statuses back into your CRM in real time to keep timelines in sync.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints Documentation Tabs */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary size-5" />
            <CardTitle className="text-base font-semibold">API Endpoints Reference</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Select an endpoint below to inspect request parameters, authentication scopes, and copy-paste ready code examples.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="messages" className="w-full">
            <div className="border-b px-4 pt-3">
              <TabsList className="bg-transparent p-0 flex-wrap justify-start gap-1">
                <TabsTrigger
                  value="messages"
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs gap-1.5"
                >
                  <Send className="size-3.5" />
                  Send Message
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs gap-1.5"
                >
                  <Users className="size-3.5" />
                  Sync Contacts
                </TabsTrigger>
                <TabsTrigger
                  value="conversations"
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs gap-1.5"
                >
                  <MessageSquare className="size-3.5" />
                  Conversations
                </TabsTrigger>
                <TabsTrigger
                  value="broadcasts"
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs gap-1.5"
                >
                  <Radio className="size-3.5" />
                  Broadcasts
                </TabsTrigger>
                <TabsTrigger
                  value="webhooks"
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground text-xs gap-1.5"
                >
                  <Webhook className="size-3.5" />
                  Webhooks
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB 1: SEND MESSAGE */}
            <TabsContent value="messages" className="p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-mono text-xs">
                    POST
                  </Badge>
                  <code className="font-mono text-sm font-semibold">/api/v1/messages</code>
                </div>
                <Badge variant="outline" className="text-xs">
                  Required Scope: <span className="font-mono text-primary ml-1">messages:send</span>
                </Badge>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Send a WhatsApp message to any customer. You provide an <strong>E.164 phone number</strong> (with country code, e.g. <code className="text-xs">+14155550123</code> or <code className="text-xs">+919876543210</code>). The API automatically finds or creates the contact and conversation.
              </p>

              {/* Code Snippets */}
              <CodeExample
                baseUrl={baseUrl}
                endpoint="/messages"
                method="POST"
                body={{
                  to: '+14155550123',
                  type: 'text',
                  text: 'Hi John! Your appointment with Acme CRM has been confirmed for tomorrow at 10:00 AM.',
                }}
                templateBody={{
                  to: '+14155550123',
                  type: 'template',
                  template: {
                    name: 'order_status_update',
                    language: 'en_US',
                    params: ['ORDER-9876', 'Shipped'],
                  },
                }}
                response={{
                  data: {
                    message_id: '8a221fca-31d7-4221-9a74-d4b9f2982d1c',
                    whatsapp_message_id: 'wamid.HBgLMTQxNTU1NTAxMjM...',
                    conversation_id: 'f942bc0b-d018-49e0-8110-8b4e7a2b9183',
                    contact_id: '3c8e41bf-50e5-4f40-8b83-b672bebf1552',
                    contact_created: true,
                  },
                }}
              />
            </TabsContent>

            {/* TAB 2: SYNC CONTACTS */}
            <TabsContent value="contacts" className="p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-mono text-xs">
                    POST
                  </Badge>
                  <code className="font-mono text-sm font-semibold">/api/v1/contacts</code>
                </div>
                <Badge variant="outline" className="text-xs">
                  Required Scope: <span className="font-mono text-primary ml-1">contacts:write</span>
                </Badge>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Sync a contact/lead into WhatsApp CRM. Performs <strong>smart deduplication by phone number</strong>: if the contact already exists, their tags are updated without creating duplicates or altering existing conversation history.
              </p>

              <CodeExample
                baseUrl={baseUrl}
                endpoint="/contacts"
                method="POST"
                body={{
                  phone: '+14155550123',
                  name: 'Jane Smith',
                  email: 'jane@example.com',
                  company: 'Acme Corp',
                  tags: ['hubspot-lead', 'high-priority', 'enterprise'],
                }}
                response={{
                  data: {
                    id: '3c8e41bf-50e5-4f40-8b83-b672bebf1552',
                    phone: '+14155550123',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    company: 'Acme Corp',
                    tags: [
                      { id: 'tag_1', name: 'hubspot-lead', color: '#3b82f6' },
                      { id: 'tag_2', name: 'high-priority', color: '#ef4444' },
                    ],
                    created_at: '2026-11-27T12:00:00Z',
                  },
                }}
              />
            </TabsContent>

            {/* TAB 3: CONVERSATIONS */}
            <TabsContent value="conversations" className="p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 font-mono text-xs">
                    GET
                  </Badge>
                  <code className="font-mono text-sm font-semibold">/api/v1/conversations</code>
                </div>
                <Badge variant="outline" className="text-xs">
                  Required Scope: <span className="font-mono text-primary ml-1">conversations:read</span>
                </Badge>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Retrieve list of conversations or inspect message history (<code className="text-xs">GET /api/v1/conversations/:id/messages</code>) to display complete WhatsApp chat transcripts directly on your CRM lead cards.
              </p>

              <CodeExample
                baseUrl={baseUrl}
                endpoint="/conversations?status=open"
                method="GET"
                response={{
                  data: [
                    {
                      id: 'f942bc0b-d018-49e0-8110-8b4e7a2b9183',
                      status: 'open',
                      last_message_at: '2026-11-27T12:05:00Z',
                      contact: {
                        id: '3c8e41bf-50e5-4f40-8b83-b672bebf1552',
                        name: 'Jane Smith',
                        phone: '+14155550123',
                      },
                    },
                  ],
                  meta: { next_cursor: null },
                }}
              />
            </TabsContent>

            {/* TAB 4: BROADCASTS */}
            <TabsContent value="broadcasts" className="p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-mono text-xs">
                    POST
                  </Badge>
                  <code className="font-mono text-sm font-semibold">/api/v1/broadcasts</code>
                </div>
                <Badge variant="outline" className="text-xs">
                  Required Scope: <span className="font-mono text-primary ml-1">broadcasts:send</span>
                </Badge>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Launch batch marketing or transactional template campaigns to lists of contacts exported from your CRM.
              </p>

              <CodeExample
                baseUrl={baseUrl}
                endpoint="/broadcasts"
                method="POST"
                body={{
                  name: 'CRM Webinar Invite',
                  template_name: 'event_invitation',
                  template_language: 'en_US',
                  recipients: [
                    { phone: '+14155550123', params: ['Jane', 'Dec 1st'] },
                    { phone: '+14155550999', params: ['Alex', 'Dec 1st'] },
                  ],
                }}
                response={{
                  data: {
                    broadcast_id: 'b7123490-e819-4882-b91c-7164923184ef',
                    name: 'CRM Webinar Invite',
                    status: 'processing',
                    total_recipients: 2,
                  },
                }}
              />
            </TabsContent>

            {/* TAB 5: WEBHOOKS */}
            <TabsContent value="webhooks" className="p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-mono text-xs">
                    POST
                  </Badge>
                  <code className="font-mono text-sm font-semibold">/api/v1/webhooks</code>
                </div>
                <Badge variant="outline" className="text-xs">
                  Required Scope: <span className="font-mono text-primary ml-1">webhooks:manage</span>
                </Badge>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Register your external CRM's webhook URL to receive real-time events. WACRM signs payloads with HMAC-SHA256 for secure verification.
              </p>

              <CodeExample
                baseUrl={baseUrl}
                endpoint="/webhooks"
                method="POST"
                body={{
                  url: 'https://your-crm.example.com/api/whatsapp-webhook',
                  events: ['message.received', 'message.delivered', 'message.read'],
                  secret: 'your-webhook-verification-secret',
                }}
                response={{
                  data: {
                    id: 'wh_9124801b7a2e41',
                    url: 'https://your-crm.example.com/api/whatsapp-webhook',
                    events: ['message.received', 'message.delivered', 'message.read'],
                    active: true,
                  },
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Response Codes & Rate Limits */}
      <Card className="bg-card/40">
        <CardContent className="pt-4 pb-4">
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="space-y-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-primary" />
                Rate Limiting
              </span>
              <p className="text-muted-foreground">
                Default limit is <strong>120 requests/minute</strong> per API key. Rate limit status is returned in standard HTTP headers: <code className="text-[11px]">X-RateLimit-Remaining</code> and <code className="text-[11px]">Retry-After</code>.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Info className="size-3.5 text-primary" />
                Standard JSON Responses
              </span>
              <p className="text-muted-foreground">
                All successful responses return <code className="text-[11px]">{`{ "data": ... }`}</code>. Errors always return <code className="text-[11px]">{`{ "error": { "code": "...", "message": "..." } }`}</code> with appropriate HTTP status codes (400, 401, 403, 404, 429).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Code example helper with language switcher and one-click copy
function CodeExample({
  baseUrl,
  endpoint,
  method,
  body,
  templateBody,
  response,
}: {
  baseUrl: string;
  endpoint: string;
  method: string;
  body?: Record<string, unknown>;
  templateBody?: Record<string, unknown>;
  response: Record<string, unknown>;
}) {
  const [lang, setLang] = useState<'curl' | 'js' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  const fullUrl = `${baseUrl}${endpoint}`;

  let code = '';

  if (lang === 'curl') {
    if (method === 'GET') {
      code = `curl -X GET "${fullUrl}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`;
    } else {
      code = `curl -X ${method} "${fullUrl}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(body || {}, null, 2)}'`;
    }
  } else if (lang === 'js') {
    if (method === 'GET') {
      code = `const response = await fetch('${fullUrl}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const data = await response.json();
console.log(data);`;
    } else {
      code = `const response = await fetch('${fullUrl}', {
  method: '${method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${JSON.stringify(body || {}, null, 2)})
});

const result = await response.json();
console.log(result);`;
    }
  } else if (lang === 'python') {
    if (method === 'GET') {
      code = `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
print(response.json())`;
    } else {
      code = `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = ${JSON.stringify(body || {}, null, 4)}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code snippet copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Code Header & Language Selector */}
      <div className="rounded-lg border bg-muted/40 overflow-hidden">
        <div className="flex items-center justify-between border-b bg-muted/60 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <Terminal className="text-muted-foreground size-3.5" />
            <span className="text-muted-foreground text-xs font-mono">Example Request</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLang('curl')}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                lang === 'curl'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              cURL
            </button>
            <button
              onClick={() => setLang('js')}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                lang === 'js'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setLang('python')}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                lang === 'python'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Python
            </button>
            <Button
              size="icon"
              variant="ghost"
              className="size-6 ml-2 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
            </Button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-3 overflow-x-auto">
          <pre className="text-foreground font-mono text-xs leading-relaxed">{code}</pre>
        </div>
      </div>

      {/* Response Preview */}
      <div className="rounded-lg border bg-muted/20 overflow-hidden">
        <div className="border-b bg-muted/40 px-3 py-1 text-muted-foreground text-[11px] font-mono">
          Example 200/201 Response JSON
        </div>
        <div className="p-3 overflow-x-auto">
          <pre className="text-muted-foreground font-mono text-xs leading-relaxed">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
