import Image from "next/image";

const Logo = () => {
  return (
    <>
      <a href="/" className="hover:opacity-80 transition-opacity duration-300">
        <span className="flex items-center justify-start gap-2">
          <svg
            id="logo-6"
            width="45"
            height="32"
            viewBox="0 0 6 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M15.45 6.64999V2.39999H2.05V31.6H15.45V27.35C12.705 27.35 10.0724 26.2595 8.13144 24.3185C6.19044 22.3775 5.1 19.745 5.1 17C5.1 14.255 6.19044 11.6224 8.13144 9.68144C10.0724 7.74044 12.705 6.64999 15.45 6.64999V6.64999Z"
              className="ccustom"
              fill="#0284C7"
            ></path>{" "}
            <path
              d="M15.45 6.64999V27.35C18.195 27.35 20.8276 26.2595 22.7686 24.3185C24.7096 22.3775 25.8 19.745 25.8 17C25.8 14.255 24.7096 11.6224 22.7686 9.68144C20.8276 7.74044 18.195 6.64999 15.45 6.64999V6.64999Z"
              className="ccustom"
              fill="#0284C7"
            ></path>{" "}
          </svg>
          <span className="text-lg font-bold text-sky-800">LMS</span>
        </span>
      </a>
    </>
  );
};

export default Logo;
