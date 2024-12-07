"use client";




import Link from "next/link";
import Image from "next/image";
import SignInButton from "@/components/okto/utls";

const Header = () => {


  // useEffect(() => {
  //     if (!provider.wallet.publicKey) {
  //         router.push('/')
  //     }
  //   },[])


  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-[#62626235] backdrop-blur-xl">
      <div className="flex p-4 my-2 md:gap-32 lg:gap-64 justify-between items-center  h-16">
        <div className=" flex items-center justify-center sm:items-stretch sm:justify-start">
          {/* logo thinggg */}
          <div className="flex-shrink-0 flex items-center pl-4 lg:pl-6 ">
            <Link href="/">
              <Image
                className="block  h-16 w-auto"
                src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg"
                alt="Workflow"
                width={64}
                height={64}
              />
              
            </Link>
          </div>
          {/* Toggle thingg */}
        </div>
        <div
          // className={`hidden sm:${provider.wallet.publicKey ? "flex" : "hidden"} pl-28 justify-center items-center`}
        >
         
        </div>
        <div className="flex flex-col-reverse justify-center items-center sm:flex sm:flex-row gap-2 right-0">
        <SignInButton/>
        </div>
        {/* <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                            <button type="button" className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div> */}
      </div>
    </nav>
  );
};

export default Header;
