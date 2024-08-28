"use client";
import seller from "@/public/become_a_seller.png";
import carShape from "@/public/car-shape.png";
import svg1 from "@/public/rnd/svg1.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const BecomeSeller = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <section className="become_buyer_section mt-20 py-12 md:p-20 overflow-x-hidden">
      <div className="container relative">
        <div className="absolute -top-[30px] md:-top-[7%] left-1/2 -translate-x-1/2">
          <Image src={carShape} alt="car" />
        </div>
        <motion.div
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 2,
            },
          }}
          className="absolute top-16 left-0 z-[-1] "
        >
          <Image
            src={svg1}
            alt="svg image"
            height={300}
            width={300}
            className="max-w-full -ml-8  -mt-32"
          />
        </motion.div>
        <div className="top-heading flex flex-col justify-center items-center">
          <h3 className="text-red-500 font-bold text-2xl tracking-wider">
            Steps to Signup
          </h3>
          <motion.h2
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
              },
            }}
            className="text-5xl font-bold tracking-wide m-4"
          >
            Become a Seller
          </motion.h2>
          <p>
            It is super easy to become a seller at Gulf Cars Auction. Just
            follow these straightforward instructions
          </p>
        </div>
        <div className="content-section flex flex-col lg:flex-row justify-between items-center  gap-32 relative mt-8">
          <div className="section-right w-full">
            <ul className="flex flex-col gap-4">
              <motion.li
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 1,
                  },
                }}
                className="flex items-start"
              >
                <div className="w-8 h-8 ring-4 ring-red-100 flex items-center justify-center rounded-full bg-red-500 text-white mr-4">
                  <span className="font-bold text-center">1</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">Sign Up:</h2>
                  <ul>
                    <li className="flex items-center gap-2  mb-2">
                      <span className="h-2 w-2 rounded-full bg-black"></span>
                      Click the Register Button
                    </li>
                    <li className="flex items-start gap-2  mb-2">
                      {" "}
                      <span className="h-2 w-2 rounded-full bg-black mt-2"></span>
                      <p className="flex-1">
                        Fill out the registration form with accurate details
                        including your name, contact information, and upload the
                        necessary documents that proves your identity.
                      </p>
                    </li>
                    <li className="flex items-start gap-2  mb-2">
                      {" "}
                      <span className="h-2 w-2 rounded-full bg-black mt-2"></span>
                      <p className="flex-1">
                        Agree to our terms and conditions to complete the
                        registration process.
                      </p>
                    </li>
                    <li className="flex items-start gap-2  mb-2">
                      {" "}
                      <span className="h-2 w-2 rounded-full bg-black mt-2"></span>
                      <p className="flex-1">
                        After successful registration, submit a security
                        deposit. This deposit is necessary to present your
                        vehicle to wide range of credible buyers as well as
                        secure your listed vehicle
                      </p>
                    </li>
                  </ul>
                </div>
              </motion.li>

              <motion.li
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 1,
                  },
                }}
                className="flex items-start"
              >
                <div className="w-8 h-8 ring-4 ring-red-100 flex items-center justify-center rounded-full bg-red-500 text-white mr-4">
                  <span className="font-bold text-center">2</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">
                    Car Listing and Approval:
                  </h2>
                  <ul>
                    <li className="flex items-start gap-2  mb-2">
                      <span className="h-2 w-2 rounded-full bg-black mt-2"></span>
                      <p className="flex-1">
                        Once your account is activated and the deposit is
                        received, you can upload your vehicle details.
                      </p>
                    </li>
                    <li className="flex items-start gap-2  mb-2">
                      {" "}
                      <span className="h-2 w-2 rounded-full bg-black mt-2"></span>
                      <p className="flex-1">
                        You will be informed once your car is approved and
                        listed in auction.
                      </p>
                    </li>
                    <li className="flex items-start gap-2  mb-2">
                      {" "}
                      <span className="h-2 w-2 rounded-full bg-black mt-2"></span>
                      <p className="flex-1">
                        Be aware and keep eye on the auction. Once your car is
                        sold to the highest bidder, you are required to pursue
                        the vehicle ownership transfer process.
                      </p>
                    </li>
                  </ul>
                </div>
              </motion.li>

              <motion.li
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 1,
                  },
                }}
                className="flex items-start"
              >
                <div className="w-8 h-8 ring-4 ring-red-100 flex items-center justify-center rounded-full bg-red-500 text-white mr-4">
                  <span className="font-bold text-center">3</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">
                    Payment Process:
                  </h2>
                  <ul>
                    <li className="flex items-center gap-2  mb-2">
                      <span className="h-2 w-2 rounded-full bg-black"></span>
                      Gulf Cars Auction will pay you the amount either in cash
                      or via cheque.
                    </li>
                  </ul>
                </div>
              </motion.li>
            </ul>

            {!isAuthenticated && (
              <div className="mt-4 flex justify-end">
                <Link
                  href={"/registration"}
                  className="px-2 py-1 text-sm bg-primary text-white rounded hover:bg-opacity-70 duration-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="section-left w-full relative">
            <motion.div
              initial={{
                opacity: 0,
                x: 100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                },
              }}
            >
              <Image
                src={seller}
                alt="auction image"
                className="max-w-full rounded-md"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSeller;
