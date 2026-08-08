import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Trash2, Plus, Users, Lock, Loader2 } from "lucide-react";
import type { PollFormValues, Visibility } from "./types";
import { createPoll } from "@/better-auth/api";
import { useNavigate } from "react-router-dom";

// ---------------------
// Static config
// ---------------------

const DURATION_PRESETS = [30, 60, 120, 300, 600];

const VISIBILITY_OPTIONS: {
  value: Visibility;
  label: string;
  description: string;
  icon: typeof Users;
}[] = [
  {
    value: "public",
    label: "Anonymous",
    description: "Anyone can vote without identity.",
    icon: Users,
  },
  {
    value: "private",
    label: "Private",
    description: "Only invited users can vote.",
    icon: Lock,
  },
];

const MIN_ANSWERS = 2;
const MAX_ANSWERS = 6;

// ------------------------------
// Component
// -------------------------------

export function Polls() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState<PollFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PollFormValues>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      durationSeconds: 60,
      visibility: "public",
      question: "",
      answers: [
        { title: "", isCorrect: false },
        { title: "", isCorrect: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const durationSeconds = watch("durationSeconds");
  // const visibility = watch("visibility");
  const answers = watch("answers");

  // Duplicate detection (case-insensitive, trimmed) computed live so we can
  // flag every offending input, not just the second occurrence.
  const duplicateIndexes = (() => {
    const seen = new Map<string, number>();
    const dupes = new Set<number>();
    answers.forEach((a, i) => {
      const key = a.title.trim().toLowerCase();
      if (!key) return;
      if (seen.has(key)) {
        dupes.add(seen.get(key)!);
        dupes.add(i);
      } else {
        seen.set(key, i);
      }
    });
    return dupes;
  })();

  const onSubmit = async (formValue: PollFormValues) => {
    if (duplicateIndexes.size > 0) return;
    setIsSubmitting(true);

    try {
      const response = await createPoll(formValue);
      const { data } = response;

      navigate(`/poll-detail/${data.data.dashboardCode}`);
      setSubmitted(formValue);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectCorrectAnswer = (index: number) => {
    fields.forEach((_, i) =>
      setValue(`answers.${i}.isCorrect`, i === index, {
        shouldValidate: true,
      }),
    );
  };

  const answersError =
    fields.length < MIN_ANSWERS
      ? `Add at least ${MIN_ANSWERS} answers.`
      : duplicateIndexes.size > 0
        ? "Answers must be unique."
        : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Create New Poll
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create engaging polls and collect responses instantly.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* ---------------------------------------------------------- */}
          {/* Poll Details                                               */}
          {/* ---------------------------------------------------------- */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Poll Details
            </h2>

            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-900"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Which frontend framework do you prefer?"
                className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 ${
                  errors.title
                    ? "border-red-500"
                    : "border-slate-200 focus:border-blue-600"
                }`}
                {...register("title", {
                  required: "Title is required.",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Title must be at most 50 characters.",
                  },
                })}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-red-500">{errors.title?.message}</p>
                <p className="text-xs text-slate-400">
                  {watch("title")?.length ?? 0}/50
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-900"
              >
                Description <span>( optional )</span>
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Tell voters what this poll is about..."
                className={`mt-1.5 w-full resize-none rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 ${
                  errors.description
                    ? "border-red-500"
                    : "border-slate-200 focus:border-blue-600"
                }`}
                {...register("description", {
                  maxLength: {
                    value: 100,
                    message: "Description must be at most 100 characters.",
                  },
                })}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-red-500">
                  {errors.description?.message}
                </p>
                <p className="text-xs text-slate-400">
                  {watch("description")?.length ?? 0}/100
                </p>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Poll Settings                                              */}
          {/* ---------------------------------------------------------- */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Poll Settings
            </h2>

            <div className="mt-4">
              <label
                htmlFor="durationSeconds"
                className="block text-sm font-medium text-slate-900"
              >
                Duration (seconds)
              </label>
              <input
                id="durationSeconds"
                type="number"
                min={5}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                {...register("durationSeconds", {
                  required: "Duration is required.",
                  valueAsNumber: true,
                  min: { value: 5, message: "Minimum duration is 5 seconds." },
                })}
              />
              {errors.durationSeconds && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.durationSeconds.message}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {DURATION_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() =>
                      setValue("durationSeconds", preset, {
                        shouldValidate: true,
                      })
                    }
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      durationSeconds === preset
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {preset}s
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <span className="block text-sm font-medium text-slate-900">
                Visibility
              </span>
              <Controller
                control={control}
                name="visibility"
                render={({ field }) => (
                  <div className="mt-1.5 grid gap-3 sm:grid-cols-3">
                    {VISIBILITY_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const active = field.value === option.value;
                      return (
                        <label
                          key={option.value}
                          className={`relative flex cursor-pointer flex-col gap-2 rounded-lg border p-3 transition-colors ${
                            active
                              ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            checked={active}
                            onChange={() => field.onChange(option.value)}
                          />
                          <span className="flex items-center gap-2">
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                active ? "border-blue-600" : "border-slate-300"
                              }`}
                            >
                              {active && (
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                              )}
                            </span>
                            <Icon
                              className={`h-4 w-4 ${
                                active ? "text-blue-600" : "text-slate-400"
                              }`}
                            />
                            <span className="text-sm font-medium text-slate-900">
                              {option.label}
                            </span>
                          </span>
                          <span className="text-xs text-slate-500">
                            {option.description}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              />
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Question                                                   */}
          {/* ---------------------------------------------------------- */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Question</h2>
            <div className="mt-4">
              <input
                type="text"
                placeholder="What is your favourite frontend framework?"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 ${
                  errors.question
                    ? "border-red-500"
                    : "border-slate-200 focus:border-blue-600"
                }`}
                {...register("question", {
                  required: "Question is required.",
                  minLength: {
                    value: 5,
                    message: "Question must be at least 5 characters.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Question must be at most 100 characters.",
                  },
                })}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-red-500">
                  {errors.question?.message}
                </p>
                <p className="text-xs text-slate-400">
                  {watch("question")?.length ?? 0}/100
                </p>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Answers                                                    */}
          {/* ---------------------------------------------------------- */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                Answers
              </h2>
              <span className="text-xs text-slate-500">
                Minimum {MIN_ANSWERS} required &middot; {fields.length}/
                {MAX_ANSWERS}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {fields.map((field, index) => {
                const isDuplicate = duplicateIndexes.has(index);
                const fieldError = errors.answers?.[index]?.title;
                const isCorrect = answers[index]?.isCorrect ?? false;
                return (
                  <div key={field.id}>
                    <label
                      htmlFor={`answers.${index}.title`}
                      className="block text-sm font-medium text-slate-900"
                    >
                      Answer {index + 1}
                    </label>
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={isCorrect}
                        onChange={() => selectCorrectAnswer(index)}
                        className="h-3.5 w-3.5 accent-blue-600"
                      />
                      <span className={isCorrect ? "text-blue-600" : ""}>
                        Correct answer
                      </span>
                    </label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <input
                        id={`answers.${index}.title`}
                        type="text"
                        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 ${
                          fieldError || isDuplicate
                            ? "border-red-500"
                            : "border-slate-200 focus:border-blue-600"
                        }`}
                        {...register(`answers.${index}.title`, {
                          validate: (value) =>
                            value.trim().length > 0 ||
                            "Answer cannot be empty.",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        disabled={fields.length <= MIN_ANSWERS}
                        className="shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
                        aria-label={`Delete answer ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {fieldError && (
                      <p className="mt-1 text-xs text-red-500">
                        {fieldError.message}
                      </p>
                    )}
                    {!fieldError && isDuplicate && (
                      <p className="mt-1 text-xs text-red-500">
                        This answer is a duplicate.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {answersError && (
              <p className="mt-3 text-xs text-red-500">{answersError}</p>
            )}

            <button
              type="button"
              onClick={() => append({ title: "", isCorrect: false })}
              disabled={fields.length >= MAX_ANSWERS}
              className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              <Plus className="h-4 w-4" />
              Add Another Answer
            </button>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Actions                                                    */}
          {/* ---------------------------------------------------------- */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm 
                font-semibold text-white shadow-[inset_0_2px_1px_rgba(96,165,250,0.8)] text-shadow-2xs text-shadow-black/40
                ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-600/90"}`}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-18 animate-spin" />
                </span>
              ) : (
                "Create Poll"
              )}
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-900">
              Submitted payload
            </p>
            <pre className="mt-2 overflow-x-auto text-xs text-slate-500">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Polls;
