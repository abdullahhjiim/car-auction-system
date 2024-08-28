import Link from "next/link";

const BreadCrumbs = ({ classProperty, breadCumbsArr }) => {

    if(breadCumbsArr?.length > 0) {
        return (
            <div className={`p-4 shadow-2xl my-2 flex justify-end ${classProperty}`}>
              <ol className="flex items-center whitespace-nowrap">
                {breadCumbsArr?.map((item, index) => {
                  if (item?.link) {
                    return (
                      <li className="inline-flex items-center" key={index}>
                        <Link
                          className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                          href={item?.link}
                        >
                          {item?.text}
                        </Link>
                        <svg
                          className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="inline-flex items-center text-sm font-semibold text-gray-800 truncate"
                        aria-current="page"
                        key={index}
                      >
                        {item?.text}
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
          );
    }
 
};

export default BreadCrumbs;
