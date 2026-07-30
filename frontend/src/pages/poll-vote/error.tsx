import { AlertTriangle } from "lucide-react";

const Error = () => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-lg">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Poll Has Expired
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        This poll is no longer accepting votes because the voting period has
                        ended.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Error;
