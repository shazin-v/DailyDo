import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white p-6 md:p-5 fixed bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-2">
            Daily Do &copy; {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex space-x-3 mt-4 md:mt-0">
          {/* {process.env.NEXT_PUBLIC_PORTFOLIO_URL && ( */}
            <a
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded hover:scale-110 transition"
            >
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-white text-xl w-5 h-5"
              />
            </a>
          {/* )} */}
          {/* {process.env.NEXT_PUBLIC_LINKEDIN_URL && ( */}
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded hover:scale-110 transition"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-white text-xl  w-5 h-5"
              />
            </a>
          {/* )} */}
          {/* {process.env.NEXT_PUBLIC_GITHUB_URL && ( */}
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded hover:scale-110 transition"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-white text-xl  w-5 h-5"
              />
            </a>
          {/* )} */}
        </div>
      </div>
    </footer>
  );
}
