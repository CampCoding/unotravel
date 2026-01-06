import React, { useState } from 'react'

export default function VisasSidebar({ activeTab, onTabChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const tabs = [
    "Instructions",
    "Application Form",
    "Document Upload",
  
    "Approved",
  ];

  // SVG icons for each tab
  const getTabIcon = (tabName) => {
    const iconProps = {
      className: `shrink-0 w-5 h-5 transition duration-75 ${activeTab === tabName
        ? "text-white"
        : "text-[var(--main-light-color)] group-hover:text-[var(--main-dark-color)]"
      }`,
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor"
    };

    switch (tabName) {
      case "Instructions":
        return (
          <svg {...iconProps} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      case "Application Form":
        return (
          <svg {...iconProps} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
          </svg>
        );
      case "Document Upload":
        return (
          <svg {...iconProps} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
     
      case "Review & Submit":
        return (
          <svg {...iconProps} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case "Approved":
        return (
          <svg {...iconProps} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg {...iconProps} viewBox="0 0 18 18">
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
          </svg>
        );
    }
  };

  return (
    <div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-[var(--main-light-color)] !rounded-lg sm:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className={`rounded-lg p-2 top-0 left-0 z-40 shadow-md bg-white w-82 h-screen px-4 py-4 transition-transform duration-300 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto">
          <div className="flex items-center p-2 text-[var(--main-dark-color)] !rounded-lg group">
            <h3 className="text-lg font-[var(--font-filson-bold)] mb-3">
              Application Progress
            </h3>
          </div>

          <ul className="space-y-2 font-medium">
            {tabs.map((tab) => (
              <li key={tab}>
                <a
                  href="#"
                  onClick={() => onTabChange(tab)}
                  className={`flex items-center p-2 !rounded-lg group transition ${activeTab === tab
                      ? "bg-[var(--main-light-color)] text-white"
                      : "text-[var(--main-dark-color)] hover:bg-gray-100"
                    }`}
                >
                  {getTabIcon(tab)}

                  <span className="flex-1 ms-3 whitespace-nowrap">{tab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>


      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-400/70 bg-opacity-40 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  )
}
