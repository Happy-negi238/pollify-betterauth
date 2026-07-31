import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-600 md:flex-row">
        <p>© {new Date().getFullYear()} Pollify. All rights reserved.</p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Happy-negi238/pollify-betterauth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 transition hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.387 7.86 10.91.575.106.785-.25.785-.556 0-.274-.01-1-.016-1.962-3.197.695-3.872-1.54-3.872-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.044-.714.08-.7.08-.7 1.154.082 1.761 1.185 1.761 1.185 1.026 1.757 2.692 1.25 3.348.956.103-.743.402-1.25.731-1.538-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.449-2.281 1.184-3.085-.119-.29-.513-1.458.112-3.04 0 0 .965-.309 3.162 1.178a10.97 10.97 0 0 1 5.756 0c2.196-1.487 3.16-1.178 3.16-1.178.627 1.582.233 2.75.115 3.04.737.804 1.183 1.83 1.183 3.085 0 4.417-2.688 5.389-5.248 5.673.413.355.781 1.055.781 2.126 0 1.536-.014 2.774-.014 3.152 0 .31.207.668.79.554C20.21 21.384 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
            </svg>
          </a>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <span>Made with</span>
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span>for better polling.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
