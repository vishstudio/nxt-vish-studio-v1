'use client';

import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight, CalendarCheck, CalendarDays, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useTinaPage } from '@/src/hooks/tina/usePage';
import { getBookCallPage } from '@/src/lib/content';
import { createCallBooking } from '@/src/lib/firebase';
import { getIcon } from '@/src/lib/icons';
import { BookCallConfirmationModal } from '../book-call-confirmation-modal/book-call-confirmation-modal';
import { Button } from '../ui/button/button';
import { FormField } from '../form-field/form-field';
import { SectionTitle } from '../ui/section-title/section-title';

const timezone = 'Indian/Mauritius';
const timeSlots = ['09:30', '10:00', '10:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const selectedSlotClassName = 'border-white bg-white text-black hover:bg-white hover:text-black shadow-none';

function getMauritiusDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(date);

  return {
    year: parts.find((part) => part.type === 'year')?.value ?? '',
    month: parts.find((part) => part.type === 'month')?.value ?? '',
    day: parts.find((part) => part.type === 'day')?.value ?? '',
    weekday: parts.find((part) => part.type === 'weekday')?.value ?? '',
  };
}

function toDateValue(date: Date) {
  const { year, month, day } = getMauritiusDateParts(date);
  return `${year}-${month}-${day}`;
}

function getNextWeekdayDateValue() {
  const cursor = new Date();

  while (true) {
    cursor.setDate(cursor.getDate() + 1);
    const parts = getMauritiusDateParts(cursor);
    const date = new Date(`${parts.year}-${parts.month}-${parts.day}T12:00:00`);
    const dayOfWeek = date.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      return `${parts.year}-${parts.month}-${parts.day}`;
    }
  }
}

function parseDateValue(value: string) {
  return new Date(`${value}T12:00:00`);
}

function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function buildCalendarDays(monthDate: Date, minimumDateValue: string) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmptyDays = (firstDate.getDay() + 6) % 7;
  const cells: {
    key: string;
    label: string;
    value?: string;
    disabled?: boolean;
  }[] = Array.from({ length: leadingEmptyDays }, (_, index) => ({
    key: `empty-${year}-${month}-${index}`,
    label: '',
    disabled: true,
  }));

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const value = `${year}-${padDatePart(month + 1)}-${padDatePart(day)}`;

    cells.push({
      key: value,
      label: String(day),
      value,
      disabled: value < minimumDateValue || dayOfWeek === 0 || dayOfWeek === 6,
    });
  }

  return cells;
}

function formatDisplayTime(value: string) {
  const [hour, minute] = value.split(':');
  return minute === '00' ? `${Number(hour)}h` : `${Number(hour)}h${minute}`;
}

function getBookingErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'permission-denied'
  ) {
    return 'Booking storage permissions are not live yet. Please deploy the latest Firestore rules for the bookings collection, or email hello@vish.studio.';
  }

  return error instanceof Error ? error.message : fallback;
}

export const BookCall = () => {
  const { data: content, tinaField, rawPage } = useTinaPage('book-call.json', getBookCallPage());
  const today = useMemo(() => toDateValue(new Date()), []);
  const firstAvailableDate = useMemo(() => getNextWeekdayDateValue(), []);
  const [selectedDate, setSelectedDate] = useState(firstAvailableDate);
  const [visibleMonth, setVisibleMonth] = useState(() => parseDateValue(firstAvailableDate));
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth, firstAvailableDate), [firstAvailableDate, visibleMonth]);
  const canGoToPreviousMonth = `${visibleMonth.getFullYear()}-${padDatePart(visibleMonth.getMonth() + 1)}` > today.slice(0, 7);

  const goToMonth = (direction: -1 | 1) => {
    setVisibleMonth((currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const id = await createCallBooking({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        selectedDate,
        selectedTime,
        timezone,
      });
      setBookingId(id);
    } catch (bookingError) {
      setError(getBookingErrorMessage(bookingError, content.errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <p
            className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent"
            data-tina-field={tinaField('label')}
          >
            {content.label}
          </p>
          <SectionTitle size="lg" className="max-w-3xl" tinaField={tinaField('heading')}>
            {content.heading}
          </SectionTitle>
          <p
            className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl"
            data-tina-field={tinaField('description')}
          >
            {content.description}
          </p>

          <div className="mt-12 hidden md:grid gap-4">
            {content.highlights.map((item, index) => {
              const Icon = getIcon(item.icon);
              const rawItem = rawPage?.highlights?.[index];

              return (
                <div key={item.title} className="flex gap-4 border-t border-white/10 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      className="font-display text-xl font-medium text-white"
                      data-tina-field={rawItem ? tinaField(rawItem, 'title') : undefined}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="mt-2 font-sans text-sm leading-relaxed text-gray-400"
                      data-tina-field={rawItem ? tinaField(rawItem, 'description') : undefined}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 hidden lg:flex flex-col items-start rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-vish-accent" aria-hidden="true" />
                <h2 className="font-display text-2xl font-medium text-white md:text-3xl" data-tina-field={tinaField('scopeHeading')}>
                  {content.scopeHeading}
                </h2>
              </div>
              <p className="max-w-2xl font-sans text-base leading-relaxed text-gray-400" data-tina-field={tinaField('scopeDescription')}>
                {content.scopeDescription}
              </p>
            </div>
            <Button
              href="/start-project"
              variant="outline"
              size="lg"
              className="mt-7 w-full font-mono text-xs font-semibold uppercase tracking-widest sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" />}
              tinaField={tinaField('scopeCtaLabel')}
            >
              {content.scopeCtaLabel}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-medium text-white" data-tina-field={tinaField('formHeading')}>
                {content.formHeading}<span className="text-vish-accent">.</span>
              </h2>
              <p className="mt-1 font-sans text-sm text-gray-500" data-tina-field={tinaField('timezoneLabel')}>
                {content.timezoneLabel}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="block font-sans text-base font-medium text-white" data-tina-field={tinaField('dateLabel')}>
                {content.dateLabel}<span className="ml-1 text-white/45">*</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => goToMonth(-1)}
                  disabled={!canGoToPreviousMonth}
                  ariaLabel="Show previous month"
                  className="h-9 w-9 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => goToMonth(1)}
                  ariaLabel="Show next month"
                  className="h-9 w-9 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-medium text-white">{formatMonthLabel(visibleMonth)}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500" data-tina-field={tinaField('weekdaysLabel')}>{content.weekdaysLabel}</p>
              </div>
              <div className="mt-5 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-widest text-gray-500">
                {weekdayLabels.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {calendarDays.map((date) => {
                  const isSelected = selectedDate === date.value;

                  if (!date.value) {
                    return <div key={date.key} className="aspect-square" aria-hidden="true" />;
                  }

                  return (
                    <Button
                      key={date.key}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => date.value && setSelectedDate(date.value)}
                      disabled={date.disabled}
                      ariaSelected={isSelected}
                      ariaLabel={`Select ${date.value}`}
                      className={`aspect-square rounded-2xl p-0 font-mono text-xs ${isSelected ? selectedSlotClassName : ''}`}
                    >
                      {date.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 block font-sans text-base font-medium text-white" data-tina-field={tinaField('timeLabel')}>
              {content.timeLabel}<span className="ml-1 text-white/45">*</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTime(slot)}
                  ariaSelected={selectedTime === slot}
                  className={`rounded-2xl py-3 font-mono text-xs ${selectedTime === slot ? selectedSlotClassName : ''}`}
                >
                  {formatDisplayTime(slot)}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            <FormField
              id="booking-name"
              label={content.nameLabel}
              value={name}
              onChange={setName}
              autoComplete="name"
              required
              requiredIndicatorClassName="text-white/45"
            />
            <FormField
              id="booking-email"
              label={content.emailLabel}
              value={email}
              onChange={setEmail}
              type="email"
              autoComplete="email"
              required
              requiredIndicatorClassName="text-white/45"
            />
            <FormField id="booking-company" label={content.companyLabel} value={company} onChange={setCompany} autoComplete="organization" />
          </div>

          {error ? (
            <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 font-sans text-sm leading-relaxed text-red-200">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="cta"
            size="lg"
            disabled={isSubmitting}
            icon={<CalendarCheck className="h-4 w-4" />}
            className="mt-8 w-full font-mono text-xs font-semibold uppercase tracking-widest"
            tinaField={tinaField('submitLabel')}
          >
            {isSubmitting ? content.submittingLabel : content.submitLabel}
          </Button>
        </form>

        <div className="flex lg:hidden flex-col items-start rounded-2xl border border-white/8 bg-white/[0.02] p-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-vish-accent" aria-hidden="true" />
              <h2 className="font-display text-2xl font-medium text-white md:text-3xl" data-tina-field={tinaField('scopeHeading')}>
                {content.scopeHeading}
              </h2>
            </div>
            <p className="max-w-2xl font-sans text-base leading-relaxed text-gray-400" data-tina-field={tinaField('scopeDescription')}>
              {content.scopeDescription}
            </p>
          </div>
          <Button
            href="/start-project"
            variant="outline"
            size="lg"
            className="mt-7 w-full font-mono text-xs font-semibold uppercase tracking-widest sm:w-auto"
            icon={<ArrowRight className="h-4 w-4" />}
            tinaField={tinaField('scopeCtaLabel')}
          >
            {content.scopeCtaLabel}
          </Button>
        </div>

      </div>

      <BookCallConfirmationModal
        isOpen={Boolean(bookingId)}
        bookingId={bookingId}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        email={email}
        content={content.confirmation}
        onClose={() => setBookingId('')}
      />
    </>
  );
}
