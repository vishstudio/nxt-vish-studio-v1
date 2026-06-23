"use client";

import { createProjectBrief } from "@/src/lib/firebase";
import {
  AnswerValue,
  BriefQuestion,
  pricingByService,
  questionsByService,
  ServiceSlug,
  services,
} from "@/src/lib/project-brief";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronUp,
  ShieldCheck,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BriefConfirmationModal } from "../brief-confirmation-modal/brief-confirmation-modal";
import { FormField } from "../form-field/form-field";
import { Button } from "../ui/button/button";

const steps = ["Service", "Package", "Project brief", "Contact", "Review"];
const serviceLabels: Record<ServiceSlug, string> = {
  website: "Website",
  "mobile-apps": "Mobile Apps",
  softwares: "Software",
  branding: "Branding",
};
const stepHeadings = [
  {
    title: "Choose a service",
    intro:
      "Answer a few focused questions so we can understand your goals and recommend the right scope.",
  },
  {
    title: "Choose a package",
    intro:
      "Pick the starting scope that feels closest to your project. We can refine the final scope after reviewing your brief.",
  },
  {
    title: "Tell us about the project",
    intro:
      "Share the context, goals, features, and constraints that will help us understand what needs to be built.",
  },
  {
    title: "How can we reach you",
    intro:
      "Add your contact details so the studio can follow up after reviewing the project brief.",
  },
  {
    title: "Review your brief",
    intro:
      "Check the service, package, project answers, and contact details before submitting your brief.",
  },
];

type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  company: string;
};
type BriefFormValues = {
  service: ServiceSlug | "";
  packageName: string;
  answers: Record<string, AnswerValue | undefined>;
  contact: ContactDetails;
};
type SubmissionState = "idle" | "submitting" | "success" | "error";

const initialContact: ContactDetails = {
  name: "",
  email: "",
  phone: "",
  company: "",
};
const defaultValues: BriefFormValues = {
  service: "",
  packageName: "",
  answers: {},
  contact: initialContact,
};

function Choice({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="md"
      onClick={onClick}
      ariaSelected={selected}
      className={`w-full justify-between rounded-2xl border px-5 py-5 text-left ${selected
        ? "border-vish-accent bg-vish-accent/[0.07] text-white"
        : "border-white/10 bg-white/[0.02] hover:border-white/25"
        }`}
    >
      <span className="pr-6">
        <span className="block font-display text-lg font-medium normal-case tracking-normal">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block font-sans text-sm font-normal normal-case tracking-normal text-gray-400">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected
          ? "border-vish-accent bg-vish-accent text-black"
          : "border-white/30"
          }`}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
    </Button>
  );
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: BriefQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}) {
  if (question.type === "text" || question.type === "textarea") {
    return (
      <FormField
        id={question.id}
        label={question.label}
        hint={question.hint}
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
        required={question.required}
        multiline={question.type === "textarea"}
      />
    );
  }

  const selectedValues = Array.isArray(value) ? value : [];
  return (
    <fieldset>
      <legend className="mb-2 font-sans text-base font-medium text-white">
        {question.label}
        {question.required ? (
          <span className="ml-1 text-vish-accent">*</span>
        ) : null}
      </legend>
      {question.hint ? (
        <p className="mb-3 text-sm text-gray-500">{question.hint}</p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options?.map((option) => {
          const selected =
            question.type === "multiple"
              ? selectedValues.includes(option)
              : value === option;
          const handleClick = () => {
            if (question.type === "single") onChange(option);
            else {
              onChange(
                selected
                  ? selectedValues.filter((item) => item !== option)
                  : [...selectedValues, option],
              );
            }
          };

          return (
            <Choice
              key={option}
              label={option}
              selected={selected}
              onClick={handleClick}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export function BriefForm() {
  const [step, setStep] = useState(0);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [briefId, setBriefId] = useState("");
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<BriefFormValues>({
      defaultValues,
      mode: "onChange",
    });

  const service = watch("service");
  const packageName = watch("packageName");
  const answers = watch("answers");
  const contactName = watch("contact.name") ?? "";
  const contactEmail = watch("contact.email") ?? "";
  const contactPhone = watch("contact.phone") ?? "";
  const contactCompany = watch("contact.company") ?? "";
  const contact = useMemo(
    () => ({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      company: contactCompany,
    }),
    [contactCompany, contactEmail, contactName, contactPhone],
  );
  const packages = service ? pricingByService[service] ?? [] : [];
  const questions = service ? questionsByService[service] : [];
  const selectedPackage = packages.find((plan) => plan.name === packageName);
  const currentHeading = stepHeadings[step];

  const scrollToPageTop = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(service);
    if (step === 1) return Boolean(selectedPackage);
    if (step === 2) {
      return questions
        .filter(
          (question) =>
            question.required &&
            (question.type === "text" || question.type === "textarea"),
        )
        .every((question) => {
          const value = answers[question.id];
          return typeof value === "string" && value.trim().length > 0;
        });
    }
    if (step === 3) {
      return (
        contact.name.trim().length > 0 &&
        /\S+@\S+\.\S+/.test(contact.email) &&
        contact.phone.replace(/\D/g, "").length >= 5
      );
    }
    return true;
  }, [answers, contact, questions, selectedPackage, service, step]);

  const chooseService = (slug: ServiceSlug) => {
    if (slug === service) return;
    setValue("service", slug, { shouldDirty: true, shouldValidate: true });
    setValue("packageName", "", { shouldDirty: true, shouldValidate: true });
    setValue("answers", {}, { shouldDirty: true, shouldValidate: true });
  };

  const updateAnswer = (questionId: string, value: AnswerValue) => {
    setValue(
      "answers",
      {
        ...answers,
        [questionId]: value,
      },
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const submitBrief = async (values: BriefFormValues) => {
    if (!values.service || !selectedPackage) return;
    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      const id = await createProjectBrief({
        service: {
          slug: values.service,
          label: serviceLabels[values.service],
        },
        package: {
          name: selectedPackage.name,
          label: selectedPackage.label,
          price: selectedPackage.discountedPrice || selectedPackage.price,
          delivery: selectedPackage.delivery,
        },
        answers: values.answers,
        questionnaire: questions.map((question) => ({
          id: question.id,
          label: question.label,
          answer: values.answers[question.id] ?? null,
        })),
        contact: values.contact,
      });
      setBriefId(id);
      setSubmissionState("success");
      setIsProgressOpen(false);
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your brief. Please try again.",
      );
    }
  };

  const onSubmit: SubmitHandler<BriefFormValues> = async (values) => {
    if (!canContinue) return;
    if (step === steps.length - 1) await submitBrief(values);
    else {
      setStep((current) => Math.min(current + 1, steps.length - 1));
      setIsProgressOpen(false);
      scrollToPageTop();
    }
  };

  const closeConfirmation = () => {
    setSubmissionState("idle");
    setBriefId("");
    setErrorMessage("");
    setStep(0);
    setIsProgressOpen(false);
    reset(defaultValues);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-12 pb-32 lg:grid-cols-[minmax(0,1fr)_280px] xl:gap-16"
      >
        <main className="min-w-0">
          <div className="mb-10 border-b border-white/10 pb-12 md:pb-16 ">
            <span className="font-mono text-xs uppercase tracking-widest text-vish-accent">
              Step {step + 1} of {steps.length}
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
              {currentHeading.title}
              <span className="text-vish-accent">.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-md">
              {currentHeading.intro}
            </p>
          </div>

          {step === 0 ? (
            <div className="space-y-3">
              {services.map((item) => (
                <Choice
                  key={item.slug}
                  label={item.label}
                  description={item.description}
                  selected={service === item.slug}
                  onClick={() => chooseService(item.slug)}
                />
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4">
              {packages.map((plan) => (
                <Choice
                  key={plan.name}
                  label={`${plan.name} — ${plan.discountedPrice || plan.price
                    }`}
                  description={`${plan.tagline} Delivery: ${plan.delivery}.`}
                  selected={packageName === plan.name}
                  onClick={() =>
                    setValue("packageName", plan.name, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-10">
              {questions.map((question) => (
                <QuestionField
                  key={question.id}
                  question={question}
                  value={answers[question.id]}
                  onChange={(value) => updateAnswer(question.id, value)}
                />
              ))}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-7 sm:grid-cols-2">
              <Controller
                name="contact.name"
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field }) => (
                  <FormField
                    id="name"
                    label="Full name"
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="name"
                    required
                  />
                )}
              />
              <Controller
                name="contact.company"
                control={control}
                render={({ field }) => (
                  <FormField
                    id="company"
                    label="Company / organisation"
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="organization"
                  />
                )}
              />
              <Controller
                name="contact.email"
                control={control}
                rules={{
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                }}
                render={({ field }) => (
                  <FormField
                    id="email"
                    label="Email address"
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="email"
                    required
                  />
                )}
              />
              <Controller
                name="contact.phone"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => value.replace(/\D/g, "").length >= 5,
                }}
                render={({ field }) => (
                  <FormField
                    id="phone"
                    label="Telephone number"
                    type="tel"
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="tel"
                    required
                  />
                )}
              />
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-8">
              <ReviewSection
                title="Service and package"
                lines={[
                  service ? serviceLabels[service] : "",
                  selectedPackage
                    ? `${selectedPackage.name} — ${selectedPackage.discountedPrice ||
                    selectedPackage.price
                    }`
                    : "",
                  selectedPackage?.delivery
                    ? `Delivery: ${selectedPackage.delivery}`
                    : "",
                ]}
              />
              <ReviewSection
                title="Contact"
                lines={[
                  contact.name,
                  contact.company,
                  contact.email,
                  contact.phone,
                ]}
              />
              <ReviewSection
                title="Project brief"
                lines={questions.map((question) => {
                  const answer = answers[question.id];
                  return `${question.label}: ${Array.isArray(answer)
                    ? answer.join(", ")
                    : answer || "Not provided"
                    }`;
                })}
              />
            </div>
          ) : null}

          {errorMessage ? (
            <p
              role="alert"
              className="mt-8 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
            >
              {errorMessage}
            </p>
          ) : null}
        </main>

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:sticky lg:top-32">
          <h3 className="font-display text-xl font-medium text-white">
            Your selection
          </h3>
          <dl className="mt-6 space-y-5 text-sm">
            <SummaryItem
              label="Service"
              value={service ? serviceLabels[service] : "Not selected"}
            />
            <SummaryItem
              label="Package"
              value={
                selectedPackage
                  ? `${selectedPackage.name} — ${selectedPackage.discountedPrice || selectedPackage.price
                  }`
                  : "Not selected"
              }
            />
          </dl>
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <ShieldCheck className="h-4 w-4 text-vish-accent" /> Your data is
              secure
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Your details are used only to review this brief and contact you
              about the project.
            </p>
          </div>
        </aside>

        <div className="fixed inset-x-0 bottom-4 z-[85] px-4 md:bottom-6">
          <div className="relative mx-auto max-w-4xl">
            {isProgressOpen ? (
              <div
                id="brief-progress-panel"
                className="absolute inset-x-0 bottom-[calc(100%+0.75rem)] overflow-hidden rounded-3xl border border-white/10 bg-black/95 p-5 shadow-2xl shadow-black/70 backdrop-blur-xl md:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-vish-accent">
                      Project brief progress
                    </p>
                    <h3 className="mt-1 font-display text-xl font-medium text-white">
                      Step {step + 1} of {steps.length}
                    </h3>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsProgressOpen(false)}
                    ariaLabel="Close project brief progress"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ol className="grid gap-2 md:grid-cols-5">
                  {steps.map((label, index) => (
                    <li
                      key={label}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 md:block ${index === step
                        ? "border-vish-accent bg-vish-accent/[0.08] text-white"
                        : index < step
                          ? "border-white/15 bg-white/[0.03] text-gray-300"
                          : "border-white/8 text-gray-600"
                        }`}
                    >
                      <span
                        className={`font-mono text-xs ${index === step ? "text-vish-accent" : ""
                          }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-sm font-medium md:mt-2 md:block">
                        {label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-black/85 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl md:gap-4 md:px-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsProgressOpen((current) => !current)}
                ariaExpanded={isProgressOpen}
                ariaControls="brief-progress-panel"
                ariaLabel={`Open project brief progress. Step ${step + 1
                  } of ${steps.length}: ${steps[step]}`}
                className="min-w-0 gap-2 px-3 text-left"
              >
                <span className="font-mono text-xs text-vish-accent">
                  {String(step + 1).padStart(2, "0")}
                </span>
                <span className="hidden truncate font-sans text-sm text-white sm:inline">
                  {steps[step]}
                </span>
                <ChevronUp
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isProgressOpen ? "rotate-180" : ""
                    }`}
                />
              </Button>

              <div className="flex items-center gap-2">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setStep((current) => current - 1);
                      setIsProgressOpen(false);
                      scrollToPageTop();
                    }}
                    icon={<ArrowLeft className="h-4 w-4" />}
                    iconPosition="left"
                    ariaLabel="Back to previous step"
                    className="px-3"
                  >
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                ) : null}
                <Button
                  type="submit"
                  variant="cta"
                  size="md"
                  disabled={
                    !canContinue || submissionState === "submitting"
                  }
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="px-5 sm:px-6"
                >
                  {step === 4
                    ? submissionState === "submitting"
                      ? "Submitting…"
                      : "Submit"
                    : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <BriefConfirmationModal
        isOpen={submissionState === "success"}
        briefId={briefId}
        onClose={closeConfirmation}
      />
    </>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-gray-500">{label}</dt>
      <dd className="mt-1 text-white">{value}</dd>
    </div>
  );
}

function ReviewSection({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-display text-2xl font-medium text-white">{title}</h3>
      <div className="mt-5 space-y-2">
        {lines.filter(Boolean).map((line) => (
          <p key={line} className="text-sm leading-relaxed text-gray-400">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
