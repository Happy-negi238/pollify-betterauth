import { pollVoteGet, pollVotePost } from "@/better-auth/api";
import type { AnswersType, QuestionType } from "@/better-auth/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Globe, Loader2 } from "lucide-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import Error from "./error";
import Success from "./succes";
import Result from "./result";

type VoteForm = {
  answerId: string;
};

const PollVote = () => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswersType>([]);
  const [fingerPrintId, setFingerPrintId] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const { register, handleSubmit, watch } = useForm<VoteForm>();

  const params = useParams() as { poll_code?: string };
  const pollCode = params.poll_code;

  useEffect(() => {
    if (!pollCode) return;

    const pollVoteHandler = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();

        setFingerPrintId(result.visitorId);

        const response = await pollVoteGet(pollCode, result.visitorId);

        const { alreadyVote } = response.data;
        console.log(response.data.answers);
        if (alreadyVote) {
          setAlreadyVoted(true);
        }

        setQuestion(response.data.question);
        setAnswers(response.data.answers);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 410) {
            setError(true);
          }
        }
      }
    };

    pollVoteHandler();
  }, [params.poll_code]);

  const onSubmit = async (votePayload: VoteForm) => {
    if (!pollCode || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await pollVotePost(
        pollCode,
        votePayload.answerId,
        fingerPrintId,
      );
      const { data } = response;

      if (data.id) {
        setAlreadyVoted(true);
      }
      // console.log(data.data.id)
      // console.log(data.data.votes)
    } finally {
      setIsSubmitting(false);
    }
  };

  const selected = watch("answerId");

  if (alreadyVoted) {
    return <Success message="You have voted successfully!" />;
  }

  if (question?.status === "ended") {
    return <Result answer={answers} />;
  }

  if (!question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Fetching the Questions
      </div>
    );
  }

  return (
    <section className="mx-auto flex min-h-[85vh] max-w-xl items-center px-5 py-10">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">
              {question.title}
            </h1>
            <div className="flex items-center gap-4">
              <span
                className="flex items-center gap-1 border border-blue-300/30 rounded-md bg-blue-50 
                    px-3 py-1 text-sm font-medium text-blue-600"
              >
                <Globe size={16} />{" "}
                {question.visibility.charAt(0).toUpperCase() +
                  question.visibility.slice(1)}
              </span>

              <span
                className={`flex items-center gap-1 rounded-md px-3 py-1 text-sm 
                            font-medium border border-green-300/30
                            ${
                              question.status === "live"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full  
                                    ${question.status === "live" ? "bg-green-500 text-green-500" : "bg-red-500 text-red-500"}`}
                />
                {question.status.charAt(0).toUpperCase() +
                  question.status.slice(1)}
              </span>
            </div>
          </div>

          {question.description && (
            <p className="mt-3 text-slate-500">{question.description}</p>
          )}

          <h3>Q. {question.question}</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {answers.map((answer) => (
            <label
              key={answer.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                selected === answer.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <input
                type="radio"
                value={answer.id}
                {...register("answerId", {
                  required: true,
                })}
                className="h-3 w-3 accent-blue-600"
              />

              <span className="text-sm font-medium text-slate-700">
                {answer.title}
              </span>
            </label>
          ))}

          <button
            type="submit"
            disabled={!selected || isSubmitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-md 
                        font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Vote"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PollVote;
