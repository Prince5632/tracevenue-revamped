import CardImage from "../../assets/packageCard/card1.jpeg";
import Button from "../../components/common/Button.jsx";
function PackageInfo(props) {
  return (
    <>
      <main
        className="
          pt-[65px] p-[10px] pb-[200px]
          lg:px-[40px]
        "
      >
        <div
          className="
            pt-[32px]
            lg:flex lg:justify-between
          "
        >
          <div>
            <h1
              className="
                mb-2
                text-[18px] text-[#000000] font-bold
                md:text-[32px]
              "
            >
              {props.heading}
            </h1>
            <p
              className="
                text-[13px] text-[#666666] font-semibold
              "
            >
              {props.description}
            </p>
          </div>
          <div
            className="
              lg:flex lg:justify-center lg:items-center
            "
          >
            <button
              className="
                min-w-[190px]
                px-[25px] py-[4px] mt-2
                text-[#Ff5722]
                bg-white
                border border-[#FF5722] rounded-[30px]
                cursor-pointer
                !text-[16px] !font-bold
                lg:mt-0
              "
            >
              Plan New Event
              <i
                className="
                  fa-solid fa-arrow-right
                "
              ></i>
            </button>
          </div>
        </div>
        <div
          className="
            h-[3px] w-full
            mt-6 mb-[20px]
            bg-[#F0F0F4]
            rounded-[30px]
            sm:h-[5px]
          "
        ></div>
        <div>
          <div
            className="
              mb-[10px]
              md:flex md:justify-between
            "
          >
            <h2
              className="
                text-[18px] text-[#000000] font-semibold
                md:text-[20px]
              "
            >
              {props.subHeading}
            </h2>
            <div
              className="
                flex flex-col
                mt-2
              "
            >
              <span
                className="
                  text-[22px] text-[#ff6b35] font-bold text-start
                  md:text-end
                "
              >
                &#8377;{props.price}
              </span>
              <span
                className="
                  text-[11px] text-[#888888] font-bold text-start
                  md:text-end
                "
              >
                Lumpsum
              </span>
            </div>
          </div>
          <div
            className="
              flex flex-wrap
              py-[8px] px-[12px] mb-[10px]
              bg-[#f8f9fa]
              rounded-[6px]
              gap-3
            "
          >
            {props.services.map((item) =>
              item.content == "Services included" ? (
                <div
                  className="
                    flex
                    px-[10px] py-[4px]
                    text-[#ff6b35]
                    bg-[#fff5f0]
                    rounded-[12px]
                    justify-center items-center gap-[6px]
                  "
                >
                  <i
                    className={`
                      text-[14px]
                      ${item.class}
                    `}
                  ></i>
                  <span
                    className="
                      text-[12px] text-[#555555]
                    "
                  >
                    {item.content}
                  </span>
                </div>
              ) : (
                <div
                  className="
                    flex
                    text-[#ff6b35]
                    justify-center items-center gap-[6px]
                  "
                >
                  <i
                    className={`
                      text-[14px]
                      ${item.class}
                    `}
                  ></i>
                  <span
                    className="
                      text-[12px] text-[#555555]
                    "
                  >
                    {item.content}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div
          className="
            py-[16px]
            gap-[20px]
            lg:flex
          "
        >
          <div
            style={{ background: `url(${CardImage})` }}
            className="
              h-[200px] w-full
              bg-center bg-no-repeat
              rounded-[30px]
              relative group !bg-cover
              sm:min-w-[400px]
              lg:h-[272px]
              2xl:max-w-[600px]
            "
          >
            <div
              className="
                absolute top-6 right-6
              "
            >
              <div
                className="
                  flex
                  h-10 w-10
                  p-2
                  bg-white
                  rounded-full
                  opacity-0 transition-all
                  justify-center items-center group-hover:opacity-50 hover:opacity-100 duration-1000 ease-in-out
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="mdi-google-lens"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="
                    h-6 w-6
                    text-[#2db9e4]
                    fill-current
                  "
                >
                  <path d="M6,2H18A4,4 0 0,1 22,6V12H20V6A2,2 0 0,0 18,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H12V22H6A4,4 0 0,1 2,18V6A4,4 0 0,1 6,2M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M18,16A2,2 0 0,1 20,18A2,2 0 0,1 18,20A2,2 0 0,1 16,18A2,2 0 0,1 18,16Z" />
                </svg>
              </div>
              <div
                className="
                  flex
                  h-10 w-10
                  mt-2 p-2
                  bg-white
                  rounded-full
                  opacity-0 transition-all
                  justify-center items-center group-hover:opacity-50 hover:opacity-100 duration-1000 ease-in-out
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    h-6 w-6
                    text-[#2db9e4]
                    fill-current
                  "
                >
                  <path
                    d="M15.4998 7.00015C16.8253 7.00015 17.9099 8.03169 17.9945 9.33578L17.9998 9.50015V10.2569C17.6927 10.0034 17.3576 9.78247 16.9998 9.59962V9.50015C16.9998 8.72046 16.4049 8.07971 15.6443 8.00702L15.4998 8.00015H9.50015C8.72046 8.00015 8.07971 8.59504 8.00702 9.35569L8.00015 9.50015V15.4998C8.00015 16.2795 8.59504 16.9203 9.35569 16.993L9.50015 16.9998H9.5998C9.78267 17.3576 10.0036 17.6927 10.2572 17.9998H9.50015C8.17467 17.9998 7.09012 16.9683 7.00547 15.6642L7.00015 15.4998V9.50015C7.00015 8.17467 8.03169 7.09012 9.33578 7.00547L9.50015 7.00015H15.4998Z"
                    fill="#2db9e4"
                  />
                  <path
                    d="M12.662 3.6952L12.7097 3.8526L13.285 6.00002H12.249L11.7438 4.11142C11.542 3.35829 10.8015 2.89334 10.048 3.02L9.90666 3.05076L4.11142 4.60359C3.35829 4.80539 2.89334 5.54584 3.02 6.29939L3.05076 6.4407L4.60359 12.2359C4.77852 12.8888 5.35821 13.3251 6.00032 13.3472L6.00043 14.3478C4.97347 14.3269 4.03623 13.6696 3.68984 12.6653L3.63766 12.4948L2.08483 6.69952C1.74177 5.4192 2.45745 4.10462 3.6952 3.68534L3.8526 3.63766L9.64784 2.08483C10.8748 1.75606 12.1332 2.39965 12.605 3.54324L12.662 3.6952Z"
                    fill="#2db9e4"
                  />
                  <path
                    d="M19.0002 14.5001C19.0002 16.9854 16.9855 19.0001 14.5002 19.0001C12.015 19.0001 10.0002 16.9854 10.0002 14.5001C10.0002 12.0148 12.015 10.0001 14.5002 10.0001C16.9855 10.0001 19.0002 12.0148 19.0002 14.5001ZM15.0002 12.5001C15.0002 12.224 14.7764 12.0001 14.5002 12.0001C14.2241 12.0001 14.0002 12.224 14.0002 12.5001V14.0001H12.5002C12.2241 14.0001 12.0002 14.224 12.0002 14.5001C12.0002 14.7763 12.2241 15.0001 12.5002 15.0001H14.0002V16.5001C14.0002 16.7763 14.2241 17.0001 14.5002 17.0001C14.7764 17.0001 15.0002 16.7763 15.0002 16.5001V15.0001H16.5002C16.7764 15.0001 17.0002 14.7763 17.0002 14.5001C17.0002 14.224 16.7764 14.0001 16.5002 14.0001H15.0002V12.5001Z"
                    fill="#2db9e4"
                  />
                </svg>
              </div>
              <div
                className="
                  flex
                  h-10 w-10
                  mt-2 p-2
                  bg-white
                  rounded-full
                  opacity-0 transition-all
                  justify-center items-center group-hover:opacity-50 hover:opacity-100 duration-1000 ease-in-out
                "
              >
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 16 16"
                  fill="#2db9e4"
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    h-6 w-6
                    text-[#2db9e4]
                    fill-current
                  "
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  />
                </svg>
              </div>
            </div>
            <div
              className="
                flex flex-wrap z-20
                absolute bottom-2 left-2 gap-2
              "
            >
              {props.cuisines.map((item, index) => (
                <span
                  key={index}
                  className="
                    px-[10px] py-[4px]
                    text-[#333333] text-[11px] font-bold
                    bg-white
                    rounded-[30px]
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div
            className="
              w-full
              mt-6
              sm:mt-0
            "
          >
            <div
              className="
                m-[16px] px-[16px]
                border-l-[3px] border-[#ff6b35]
              "
            >
              <h4
                className="
                  mb-[8px]
                  text-[13px] text-[#ff6b35]
                "
              >
                INCLUSIONS
              </h4>
              <div
                className="
                  grid grid-cols-2 grid-row-3
                  gap-x-4 gap-y-2
                "
              >
                {props.cardInfo.map((item, i) => (
                  <div
                    key={i}
                    className="
                      mb-[2px]
                      text-[12px] text-[#1a1a1a] font-semibold
                    "
                  >
                    {item.cardHeading}
                    <ul
                      className="
                        !list-disc marker:text-[#ff6b35] !list-inside
                      "
                    >
                      {item.cardItems.map((list, index) => (
                        <li
                          key={index}
                          className="
                            py-[1px] pl-[12px]
                            text-[12px] text-[#444444]
                          "
                        >
                          {list}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="
                flex flex-wrap
                py-[8px] px-[12px] mb-[10px]
                bg-[#f8f9fa]
                rounded-[6px]
                gap-3
              "
            >
              {props.services.map((item) =>
                item.content == "Services included" ? (
                  <div
                    className="
                      flex
                      px-[10px] py-[4px]
                      text-[#ff6b35]
                      bg-[#fff5f0]
                      rounded-[12px]
                      justify-center items-center gap-[6px]
                    "
                  >
                    <i
                      className={`
                        text-[14px]
                        ${item.class}
                      `}
                    ></i>
                    <span
                      className="
                        text-[12px] text-[#555555]
                      "
                    >
                      {item.content}
                    </span>
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      text-[#ff6b35]
                      justify-center items-center gap-[6px]
                    "
                  >
                    <i
                      className={`
                        text-[14px]
                        ${item.class}
                      `}
                    ></i>
                    <span
                      className="
                        text-[12px] text-[#555555]
                      "
                    >
                      {item.content}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div
          className="
            mb-[32px] p-[20px]
            bg-[#f8f9fa]
            rounded-[12px]
          "
        >
          <h4
            className="
              mb-[16px]
              text-[#1a1a1a] text-[18px] font-bold
            "
          >
            Cuisines
          </h4>
          <div
            className="
              flex flex-wrap
              gap-4
            "
          >
            {props.cuisines.map((item, index) => (
              <span
                key={index}
                className="
                  px-[16px] py-[8px]
                  text-[#333333] text-[14px] font-semibold
                  bg-[#ffffff]
                  rounded-[30px] border border-[#e0e0e0]
                  transition-all
                  duration-200 ease-in gam
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div
          className="
            flex z-50
            px-2
            fixed bottom-0 right-0 left-0 justify-center
            md:bottom-8
          "
        >
          <div
            className="
              flex flex-col
              w-full max-w-[800px]
              py-[12px] px-[24px]
              bg-[#ffffff]
              border border-[rgba(0,0,0,0.05)]
              shadow-[0_8px_32px_#0000001f]
              items-center gap-[20px]
              md:rounded-[16px] md:!flex-row md:justify-between
            "
          >
            <div
              className="
                flex
                w-full
                font-semibold
                justify-center items-center gap-[16px]
                sm:justify-start
                md:w-auto md:justify-between
              "
            >
              <div
                className="
                  flex
                  h-[48px] w-[48px]
                  text-[16px] text-[#ff4000]
                  bg-[linear-gradient(135deg,#fff5f0_0%,#ffe8de_100%)]
                  rounded-[12px]
                  justify-center items-center
                  sm:text-[20px]
                "
              >
                <i
                  class="
                    fa-solid fa-paper-plane
                  "
                ></i>
              </div>
              <div
                className="
                  sm:w-full
                  md:w-auto
                "
              >
                <h4
                  className="
                    mb-[4px]
                    text-[#1a1a1a] text-[13px] font-bold
                    sm:text-[16px]
                  "
                >
                  Send to Match Venues
                </h4>
                <p
                  className="
                    hidden
                    text-[#666666] text-[13px] font-semibold
                    md:inline
                  "
                >
                  Get personalized quotes from venues
                </p>
              </div>
            </div>
            <div
              className="
                flex flex-col
                w-full
                items-center gap-[12px]
                md:w-auto
                lg:!flex-row
              "
            >
              <button
                className="
                  w-full
                  px-[20px] py-[12px]
                  text-[#ff4000] text-[16px]
                  rounded-[30px] border border-[rgb(255,64,0)]
                  cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                  !font-bold hover:translate-y-[-2px] duration-300 ease-in
                  sm:px-[32px] sm:py-[16px]
                  md:w-auto
                "
              >
                Preview Enquiry
              </button>
              <button
                className="
                  flex items-center justify-center
                  w-full
                  px-[20px] py-[12px]
                  text-[#ffffff] text-[16px]
                  bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)]
                  rounded-[30px] border border-[rgb(255,64,0)]
                  cursor-pointer transition-all shadow-[0_6px_28px_#ff400073]
                  !font-bold hover:translate-y-[-2px] duration-300 ease-in group 
                  sm:px-[32px] sm:py-[16px]
                  md:w-auto
                "
              >
                Raise Enquiry
                <i
                  class="
                    ml-1
                    text-[14px] text-[#ffffff]
                    transition-transform transition-all
                    fa-solid fa-arrow-right group-hover:translate-x-1 duration-300 ease-in !font-extrabold
                  "
                ></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default PackageInfo;
