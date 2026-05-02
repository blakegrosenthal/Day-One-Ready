import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileText,
  HelpCircle,
  Home,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  NotebookPen,
  Phone,
  Send,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'

type View = 'hr' | 'group' | 'profile' | 'newHire' | 'reminders'
type HireStatus = 'Ready' | 'At risk' | 'Blocked' | 'Not started' | 'Needs HR help'
type NewHireStep = 'overview' | 'id' | 'device' | 'tax' | 'help'

type Hire = {
  name: string
  role: string
  location: string
  startDate: string
  status: HireStatus
  blockingIssue: string
  lastActivity: string
  suggestedAction: string
}

type Reminder = {
  category: string
  person: string
  title: string
  message: string
}

const hires: Hire[] = [
  {
    name: 'Ana Rivera',
    role: 'Food Service Associate',
    location: 'Austin, TX',
    startDate: 'Monday, May 12',
    status: 'Ready',
    blockingIssue: 'None',
    lastActivity: 'Completed all steps today',
    suggestedAction: 'No action needed',
  },
  {
    name: 'Maria Lopez',
    role: 'Food Service Associate',
    location: 'Austin, TX',
    startDate: 'Monday, May 12',
    status: 'At risk',
    blockingIssue: 'ID not confirmed, device access not confirmed',
    lastActivity: 'Opened checklist 2 hours ago',
    suggestedAction: 'Send SMS and offer support call',
  },
  {
    name: 'James Carter',
    role: 'Food Service Associate',
    location: 'Austin, TX',
    startDate: 'Monday, May 12',
    status: 'Blocked',
    blockingIssue: 'ID appears expired',
    lastActivity: 'Uploaded ID yesterday',
    suggestedAction: 'Contact before start date',
  },
  {
    name: 'Marcus Hill',
    role: 'Food Service Associate',
    location: 'Austin, TX',
    startDate: 'Monday, May 12',
    status: 'Not started',
    blockingIssue: 'Has not opened onboarding link',
    lastActivity: 'Invite sent 2 days ago',
    suggestedAction: 'Send reminder by SMS',
  },
  {
    name: 'Sofia Nguyen',
    role: 'Food Service Associate',
    location: 'Austin, TX',
    startDate: 'Monday, May 12',
    status: 'At risk',
    blockingIssue: 'Tax forms incomplete',
    lastActivity: 'Started forms today',
    suggestedAction: 'Send form guidance',
  },
  {
    name: 'Daniel Brooks',
    role: 'Food Service Associate',
    location: 'Austin, TX',
    startDate: 'Monday, May 12',
    status: 'At risk',
    blockingIssue: 'First-day instructions not viewed',
    lastActivity: 'Completed documents yesterday',
    suggestedAction: 'Send first-day reminder',
  },
]

const reminders: Reminder[] = [
  {
    category: 'ID issues',
    person: 'Maria Lopez',
    title: 'ID not confirmed',
    message:
      'Hi Maria, your first day is Monday. Please confirm your ID before then so we can avoid onboarding delays. Open your readiness checklist here.',
  },
  {
    category: 'Not started',
    person: 'Marcus Hill',
    title: 'Onboarding not started',
    message:
      'Hi Marcus, your onboarding checklist is ready. Please open it today so we can make sure you are prepared for your first day.',
  },
  {
    category: 'Tax forms',
    person: 'Sofia Nguyen',
    title: 'Tax forms incomplete',
    message:
      'Hi Sofia, your tax forms are still incomplete. The checklist will walk you through what information you need.',
  },
  {
    category: 'Device readiness',
    person: 'Maria Lopez',
    title: 'Device readiness not confirmed',
    message:
      'Hi Maria, please confirm what device and internet access you will use for onboarding. If you need help, let us know.',
  },
  {
    category: 'Start date soon',
    person: 'All not-ready hires',
    title: 'Final readiness reminder',
    message:
      'Your first day is coming up. Please review your arrival details and complete any remaining steps.',
  },
]

const navItems = [
  { id: 'hr', label: 'HR Dashboard', icon: Home },
  { id: 'group', label: 'Start Group', icon: Users },
  { id: 'profile', label: 'New Hire Profile', icon: UserRound },
  { id: 'newHire', label: 'New Hire View', icon: Phone },
  { id: 'reminders', label: 'Reminder Center', icon: Send },
] satisfies Array<{ id: View; label: string; icon: typeof Home }>

function App() {
  const [activeView, setActiveView] = useState<View>(() => getViewFromHash())
  const [newHireStep, setNewHireStep] = useState<NewHireStep>('overview')

  useEffect(() => {
    const syncHash = () => setActiveView(getViewFromHash())
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#172033]">
      <div className="mx-auto flex min-h-screen max-w-[1680px] flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/95 px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#0f766e] text-white">
              <ClipboardCheck size={21} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Prototype</p>
              <h1 className="text-lg font-semibold text-slate-950">Day-One Ready</h1>
            </div>
          </div>

          <nav className="no-scrollbar mt-4 flex gap-2 overflow-x-auto lg:mt-8 lg:grid lg:overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activeView === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id)
                    window.location.hash = item.id
                  }}
                  className={`flex min-w-max items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition lg:min-w-0 ${
                    active
                      ? 'border-[#0f766e] bg-[#ecfdf5] text-[#0f766e]'
                      : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600 lg:block">
            <p className="font-semibold text-slate-900">Zerocater Austin</p>
            <p>12 accepted hires for 10 roles.</p>
            <p className="mt-2">Start date: Monday, May 12</p>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {activeView === 'hr' && <HrDashboard />}
          {activeView === 'group' && <StartGroup />}
          {activeView === 'profile' && <NewHireProfile />}
          {activeView === 'newHire' && (
            <NewHireView activeStep={newHireStep} onStepChange={setNewHireStep} />
          )}
          {activeView === 'reminders' && <ReminderCenter />}
        </section>
      </div>
    </main>
  )
}

function getViewFromHash(): View {
  const hash = window.location.hash.replace('#', '')
  return navItems.some((item) => item.id === hash) ? (hash as View) : 'hr'
}

function HrDashboard() {
  return (
    <div className="grid gap-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <p className="text-sm font-semibold text-[#0f766e]">Onboarding Readiness Assistant</p>
            <h2 className="mt-2 max-w-4xl text-3xl font-semibold text-slate-950 sm:text-4xl">
              Reduce over-hiring and last-minute onboarding failures
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
              A day-one readiness tool that helps new hires show up prepared and helps HR catch
              problems before they become first-day failures.
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">
              Most onboarding tools manage paperwork. This helps HR know who is actually ready, who
              is at risk, and what is blocking each person before the first day.
            </p>
          </div>
          <div className="rounded-lg border border-[#bae6fd] bg-[#f0f9ff] p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#0369a1] text-white">
                <CalendarDays size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">Current start group</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Zerocater is onboarding 12 new hires for 10 Food Service Associate roles in
                  Austin, TX.
                </p>
                <p className="mt-2 text-sm font-semibold text-[#0369a1]">
                  Start date: Monday, May 12
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Needed" value="10" icon={Users} />
        <MetricCard label="Offers accepted" value="12" icon={BadgeCheck} />
        <MetricCard label="Ready" value="8" tone="green" icon={ShieldCheck} />
        <MetricCard label="At risk" value="3" tone="amber" icon={AlertTriangle} />
        <MetricCard label="Blocked" value="1" tone="red" icon={ShieldAlert} />
        <MetricCard label="Starts in" value="3 days" icon={Clock3} />
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-amber-500 text-white">
              <AlertTriangle size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-slate-950">
                Only 8 of 10 needed hires are fully ready.
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                Keep 2 backup candidates warm until at least 10 hires are ready.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
            Open actions <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <ReadinessTable />

      <section className="grid gap-4 xl:grid-cols-[1fr_0.78fr]">
        <InfoPanel
          title="How this is different"
          body="Most onboarding tools help manage paperwork, e-signatures, and employee records. Onboarding Readiness Assistant focuses on the operational question HR needs answered before day one: who is ready, who is at risk, and what is blocking them?"
          bullets={[
            'Shows readiness before the start date',
            'Flags blockers like expired IDs, incomplete forms, phone-only access, and unopened onboarding links',
            'Helps HR act before day-one failures happen',
            'Supports over-hiring decisions by showing how many accepted hires are actually ready',
            'Guides new hires one step at a time instead of overwhelming them with a giant checklist',
          ]}
        />
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Feature boundaries</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This prototype does not replace I-9, E-Verify, payroll, tax advice, or your HRIS.
                It helps HR catch readiness issues earlier and guide new hires through the process.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

function StartGroup() {
  const actions = [
    'Contact James about expired ID today',
    'Send SMS reminder to Marcus, who has not opened onboarding',
    'Offer Maria a 10-minute support call',
    'Send Sofia tax form guidance',
    'Keep 2 backup candidates warm until readiness target is met',
  ]

  return (
    <div className="grid gap-5">
      <PageHeader
        eyebrow="Start group"
        title="Austin Food Service Associate Start Group"
        description="A live readiness view for the Monday start group, focused on the hires needed to safely staff the role."
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Needed" value="10" icon={Users} />
        <MetricCard label="Offers accepted" value="12" icon={BadgeCheck} />
        <MetricCard label="Fully ready" value="8" tone="green" icon={ShieldCheck} />
        <MetricCard label="At risk" value="3" tone="amber" icon={AlertTriangle} />
        <MetricCard label="Blocked" value="1" tone="red" icon={ShieldAlert} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Readiness target</h3>
            <p className="mt-1 text-sm text-slate-600">8 of 10 required hires ready</p>
          </div>
          <p className="text-sm font-semibold text-amber-700">2 more needed by Monday</p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-lg bg-slate-100">
          <div className="h-full w-[80%] rounded-lg bg-[#0f766e]" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChecklistPanel
          title="Start group risk summary"
          items={[
            '2 more hires must become ready before Monday',
            '1 hire is blocked by an expired ID issue',
            '3 hires need action before the start date',
            'Backup candidates should stay warm until 10 hires are fully ready',
          ]}
        />
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">Recommended HR actions</h3>
          <div className="mt-4 grid gap-3">
            {actions.map((action) => (
              <div
                key={action}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <span className="text-sm font-medium text-slate-700">{action}</span>
                <button
                  type="button"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
                  aria-label={`Open action: ${action}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

function NewHireProfile() {
  return (
    <div className="grid gap-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-semibold text-slate-950">Maria Lopez</h2>
              <StatusBadge status="At risk" />
            </div>
            <p className="mt-2 text-base font-semibold text-slate-700">Food Service Associate</p>
            <p className="mt-1 text-sm text-slate-600">Austin, TX</p>
            <p className="mt-1 text-sm text-slate-600">Start date: Monday, May 12</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionButton icon={MessageSquare} label="Send SMS reminder" primary />
            <ActionButton icon={Check} label="Mark contacted" />
            <ActionButton icon={CalendarDays} label="Schedule support call" />
            <ActionButton icon={NotebookPen} label="Add admin note" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">Readiness summary</h3>
          <div className="mt-4 grid gap-3">
            <SummaryRow label="Progress" value="4 of 7 steps complete" />
            <SummaryRow label="Missing" value="ID confirmation, device readiness, tax forms" />
            <SummaryRow label="Last activity" value="2 hours ago" />
            <SummaryRow label="Preferred contact" value="SMS" />
            <SummaryRow label="Language preference" value="English" />
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <IssuePanel
            title="Critical blockers"
            tone="red"
            items={['ID not confirmed', 'Device access not confirmed']}
          />
          <IssuePanel
            title="Incomplete steps"
            tone="amber"
            items={['Tax forms incomplete', 'First-day instructions not viewed']}
          />
        </section>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">Suggested HR action</h3>
          <div className="mt-4 grid gap-3">
            {[
              'Send SMS reminder',
              'Offer support call',
              'Confirm whether ID is valid before Friday',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#0f766e]">
                  <Check size={15} />
                </span>
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">Timeline</h3>
          <div className="mt-4 grid gap-4">
            {[
              'Offer accepted',
              'Onboarding invite sent',
              'Legal name confirmed',
              'Tax forms started',
              'ID step opened but not completed',
            ].map((item, index) => (
              <div key={item} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex size-8 items-center justify-center rounded-lg border text-sm font-semibold ${
                      index < 3
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-amber-200 bg-amber-50 text-amber-700'
                    }`}
                  >
                    {index + 1}
                  </span>
                  {index < 4 && <span className="mt-1 h-6 w-px bg-slate-200" />}
                </div>
                <p className="pt-1 text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

function NewHireView({
  activeStep,
  onStepChange,
}: {
  activeStep: NewHireStep
  onStepChange: (step: NewHireStep) => void
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(330px,430px)_1fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mx-auto max-w-[390px] overflow-hidden rounded-lg border border-slate-200 bg-[#fbfcfd] shadow-sm">
          <div className="border-b border-slate-200 bg-white px-4 py-3">
            <div className="mx-auto h-1 w-14 rounded-lg bg-slate-200" />
          </div>
          <div className="min-h-[720px] p-4">{renderNewHireStep(activeStep, onStepChange)}</div>
        </div>
      </section>

      <section className="grid content-start gap-4">
        <PageHeader
          eyebrow="New hire mobile flow"
          title="Maria sees one clear next step"
          description="The new-hire side is intentionally simpler than the HR dashboard, so Maria can resolve blockers without facing a giant checklist."
        />
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">New hire screens</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: Home },
              { id: 'id', label: 'ID readiness', icon: ShieldCheck },
              { id: 'device', label: 'Device', icon: MonitorSmartphone },
              { id: 'tax', label: 'Tax forms', icon: FileText },
              { id: 'help', label: 'Help', icon: HelpCircle },
            ].map((item) => {
              const Icon = item.icon
              const active = activeStep === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onStepChange(item.id as NewHireStep)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
                    active
                      ? 'border-[#0f766e] bg-[#ecfdf5] text-[#0f766e]'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </section>
        <section className="rounded-lg border border-violet-200 bg-violet-50 p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-violet-600 text-white">
              <CircleHelp size={18} />
            </span>
            <div>
              <h3 className="font-semibold text-slate-950">Admin impact</h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                If Maria taps that she is unsure, has an expired ID, or needs help, HR sees a
                precise readiness flag before Monday.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

function ReminderCenter() {
  const filters = ['All reminders', 'ID issues', 'Not started', 'Tax forms', 'Device readiness', 'Start date soon']
  const [activeFilter, setActiveFilter] = useState('All reminders')
  const filteredReminders = useMemo(
    () =>
      activeFilter === 'All reminders'
        ? reminders
        : reminders.filter((reminder) => reminder.category === activeFilter),
    [activeFilter],
  )

  return (
    <div className="grid gap-5">
      <PageHeader
        eyebrow="HR actions"
        title="Reminder Center"
        description="Fast, specific reminders tied to readiness blockers, not a generic onboarding nudge."
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`min-w-max rounded-lg border px-3 py-2 text-sm font-semibold ${
                activeFilter === filter
                  ? 'border-[#0f766e] bg-[#ecfdf5] text-[#0f766e]'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredReminders.map((reminder) => (
          <article
            key={`${reminder.title}-${reminder.person}`}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#0f766e]">{reminder.category}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-950">{reminder.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{reminder.person}</p>
              </div>
              <div className="flex gap-2">
                <ActionIcon icon={MessageSquare} label="Send SMS" />
                <ActionIcon icon={Mail} label="Send email" />
                <ActionIcon icon={Check} label="Mark as contacted" />
              </div>
            </div>
            <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              {reminder.message}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ActionButton icon={MessageSquare} label="Send SMS" primary />
              <ActionButton icon={Mail} label="Send email" />
              <ActionButton icon={Check} label="Mark as contacted" />
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function renderNewHireStep(activeStep: NewHireStep, onStepChange: (step: NewHireStep) => void) {
  if (activeStep === 'id') return <IdReadinessStep />
  if (activeStep === 'device') return <DeviceStep />
  if (activeStep === 'tax') return <TaxStep />
  if (activeStep === 'help') return <HelpRequestStep />
  return <NewHireHome onStepChange={onStepChange} />
}

function NewHireHome({ onStepChange }: { onStepChange: (step: NewHireStep) => void }) {
  const checklist = [
    ['Confirm legal name', 'Complete'],
    ['Check your ID', 'Needs attention'],
    ['Complete required forms', 'In progress'],
    ['Confirm device and internet', 'Not started'],
    ['Review first-day instructions', 'Not started'],
    ['Confirm arrival details', 'Not started'],
    ['Ask for help if stuck', 'Available anytime'],
  ] as const

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Welcome, Maria</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Let's get you ready for your first day. We'll take it one step at a time.
        </p>
      </div>
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-950">4 of 7 steps complete</p>
          <StatusBadge status="At risk" />
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-lg bg-slate-100">
          <div className="h-full w-[57%] rounded-lg bg-[#0f766e]" />
        </div>
        <p className="mt-3 text-sm font-medium text-slate-700">
          Your first day is Monday, May 12
        </p>
        <p className="mt-1 text-sm text-amber-700">At risk: 3 steps need attention</p>
      </section>

      <section className="grid gap-2">
        {checklist.map(([label, status]) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (label.includes('ID')) onStepChange('id')
              if (label.includes('device')) onStepChange('device')
              if (label.includes('forms')) onStepChange('tax')
              if (label.includes('help')) onStepChange('help')
            }}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">{label}</p>
              <p
                className={`mt-1 text-xs font-semibold ${
                  status === 'Complete'
                    ? 'text-emerald-700'
                    : status === 'Needs attention'
                      ? 'text-red-700'
                      : status === 'In progress'
                        ? 'text-blue-700'
                        : 'text-slate-500'
                }`}
              >
                {status}
              </p>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        ))}
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-slate-950">Next step: Check your ID</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Make sure your ID is not expired and the name matches your legal name. If you are not
          sure, ask HR before your first day.
        </p>
        <div className="mt-3 grid gap-2">
          {['My ID is valid', 'My ID is expired', "I'm not sure", 'I need help'].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onStepChange(label === 'I need help' ? 'help' : 'id')}
              className="inline-flex items-center justify-between rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
            >
              {label}
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function IdReadinessStep() {
  const [expired, setExpired] = useState("I'm not sure")
  const [nameMatch, setNameMatch] = useState('Yes')
  const [available, setAvailable] = useState('Yes')
  const hasIssue = expired !== 'No' || nameMatch !== 'Yes' || available !== 'Yes'

  return (
    <StepLayout title="Check your ID">
      <p className="text-sm leading-6 text-slate-600">
        To complete onboarding, your ID must be valid and not expired. The name should match the
        legal name you entered.
      </p>
      <QuestionGroup
        label="Is your ID expired?"
        options={['No', 'Yes', "I'm not sure"]}
        value={expired}
        onChange={setExpired}
      />
      <QuestionGroup
        label="Does the name on your ID match your legal name?"
        options={['Yes', 'No', "I'm not sure"]}
        value={nameMatch}
        onChange={setNameMatch}
      />
      <QuestionGroup
        label="Do you have your ID available for onboarding?"
        options={['Yes', 'No', 'I need help']}
        value={available}
        onChange={setAvailable}
      />
      <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        If your ID is expired or you are not sure, contact HR before your start date so they can
        help you avoid delays.
      </p>
      {hasIssue && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold leading-6 text-red-700">
          ID issue detected. HR should contact new hire before start date.
        </p>
      )}
      <div className="grid gap-2">
        <button className="rounded-lg bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white">
          Save and continue
        </button>
        <button className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
          I need help
        </button>
      </div>
    </StepLayout>
  )
}

function DeviceStep() {
  const [device, setDevice] = useState('Phone only')
  const [internet, setInternet] = useState('Yes')
  const [help, setHelp] = useState('No')
  const phoneOnly = device === 'Phone only'

  return (
    <StepLayout title="Confirm your device and internet">
      <QuestionGroup
        label="What device will you use to complete onboarding?"
        options={['Laptop/Desktop', 'Tablet', 'Phone only', 'I do not have access']}
        value={device}
        onChange={setDevice}
      />
      {phoneOnly && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
          Some onboarding steps may be easier on a laptop or tablet. If you only have a phone, HR
          can help you prepare.
        </p>
      )}
      <QuestionGroup
        label="Do you have reliable internet for onboarding?"
        options={['Yes', 'No', "I'm not sure"]}
        value={internet}
        onChange={setInternet}
      />
      <QuestionGroup
        label="Do you need help finding a way to complete onboarding?"
        options={['Yes', 'No']}
        value={help}
        onChange={setHelp}
      />
      {phoneOnly && (
        <p className="rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm font-semibold text-violet-700">
          Device risk: phone only
        </p>
      )}
      <button className="rounded-lg bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white">
        Save and continue
      </button>
    </StepLayout>
  )
}

function TaxStep() {
  return (
    <StepLayout title="Complete required tax forms">
      <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-800">
        This guide explains what information the form is asking for. It does not tell you what tax
        choices to make.
      </p>
      {[
        ['What this form is for', 'It collects required information before you start work.'],
        ['What information you may need', 'Your legal name, address, Social Security number, and filing details.'],
        ['What to do if you are unsure', 'Pause and ask HR for help understanding the form fields.'],
        ['Contact HR if you are stuck', 'You can ask for help before your start date.'],
      ].map(([title, body]) => (
        <section key={title} className="rounded-lg border border-slate-200 bg-white p-3">
          <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
        </section>
      ))}
      <div className="grid gap-2">
        <button className="rounded-lg bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white">
          Continue forms
        </button>
        <button className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
          I need help
        </button>
        <button className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
          Mark as completed
        </button>
      </div>
    </StepLayout>
  )
}

function HelpRequestStep() {
  const [selected, setSelected] = useState('My ID is expired')
  const options = [
    'My ID is expired',
    'I do not understand a form',
    'I do not have a computer',
    'I cannot access the link',
    'I need to reschedule',
    'Something else',
  ]

  return (
    <StepLayout title="What do you need help with?">
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`rounded-lg border px-3 py-3 text-left text-sm font-semibold ${
              selected === option
                ? 'border-violet-300 bg-violet-50 text-violet-800'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-semibold text-emerald-800">
            Thanks. HR will see this and can help before your first day.
          </p>
        </section>
      )}
      <section className="rounded-lg border border-violet-200 bg-violet-50 p-3">
        <p className="text-xs font-bold uppercase text-violet-700">Admin preview</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-950">Maria Lopez</span>
          <StatusBadge status="Needs HR help" />
        </div>
      </section>
    </StepLayout>
  )
}

function StepLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <div>
        <p className="text-xs font-bold uppercase text-[#0f766e]">Day-One Ready</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function QuestionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-semibold text-slate-950">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-lg border px-3 py-2.5 text-left text-sm font-semibold ${
              value === option
                ? 'border-[#0f766e] bg-[#ecfdf5] text-[#0f766e]'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function ReadinessTable() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">New hire readiness</h3>
          <p className="mt-1 text-sm text-slate-500">Problems are framed as action items before day one.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
          Export brief <ArrowRight size={15} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1080px] w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              {[
                'New hire',
                'Role',
                'Location',
                'Start date',
                'Readiness status',
                'Blocking issue',
                'Last activity',
                'Suggested action',
              ].map((heading) => (
                <th key={heading} className="px-4 py-3">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hires.map((hire) => (
              <tr key={hire.name} className="align-top">
                <td className="px-4 py-4 font-semibold text-slate-950">{hire.name}</td>
                <td className="px-4 py-4 text-slate-600">{hire.role}</td>
                <td className="px-4 py-4 text-slate-600">{hire.location}</td>
                <td className="px-4 py-4 text-slate-600">{hire.startDate}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={hire.status} />
                </td>
                <td className="max-w-[240px] px-4 py-4 text-slate-700">{hire.blockingIssue}</td>
                <td className="px-4 py-4 text-slate-600">{hire.lastActivity}</td>
                <td className="max-w-[230px] px-4 py-4 font-medium text-slate-800">
                  {hire.suggestedAction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#0f766e]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
    </section>
  )
}

function MetricCard({
  label,
  value,
  tone = 'slate',
  icon: Icon,
}: {
  label: string
  value: string
  tone?: 'slate' | 'green' | 'amber' | 'red'
  icon: typeof Users
}) {
  const toneClasses = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className={`flex size-10 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon size={19} />
        </span>
        <p className="text-2xl font-semibold text-slate-950">{value}</p>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-600">{label}</p>
    </section>
  )
}

function StatusBadge({ status }: { status: HireStatus }) {
  const classes: Record<HireStatus, string> = {
    Ready: 'status-ready',
    'At risk': 'status-risk',
    Blocked: 'status-blocked',
    'Not started': 'status-started',
    'Needs HR help': 'status-help',
  }

  return (
    <span
      className={`inline-flex w-max items-center rounded-md border px-2.5 py-1 text-xs font-bold ${classes[status]}`}
    >
      {status}
    </span>
  )
}

function ActionButton({
  icon: Icon,
  label,
  primary = false,
}: {
  icon: typeof Send
  label: string
  primary?: boolean
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
        primary
          ? 'border-[#0f766e] bg-[#0f766e] text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  )
}

function ActionIcon({ icon: Icon, label }: { icon: typeof Send; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    >
      <Icon size={16} />
    </button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">{value}</p>
    </div>
  )
}

function IssuePanel({
  title,
  tone,
  items,
}: {
  title: string
  tone: 'red' | 'amber'
  items: string[]
}) {
  const toneClasses = tone === 'red' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
  const iconClasses = tone === 'red' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'

  return (
    <section className={`rounded-lg border p-5 shadow-sm ${toneClasses}`}>
      <div className="flex items-center gap-3">
        <span className={`flex size-9 items-center justify-center rounded-lg ${iconClasses}`}>
          <AlertTriangle size={18} />
        </span>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-lg bg-white/75 px-3 py-2 text-sm font-semibold text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </section>
  )
}

function ChecklistPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#0f766e]">
              <Check size={14} />
            </span>
            <p className="text-sm leading-6 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function InfoPanel({
  title,
  body,
  bullets,
}: {
  title: string
  body: string
  bullets: string[]
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#0f766e] text-white">
              <Check size={14} />
            </span>
            <p className="text-sm leading-6 text-slate-700">{bullet}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
