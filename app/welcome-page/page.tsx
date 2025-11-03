"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const WelcomePage = () => {
  const router = useRouter();
  const handleRedirect = (path: string) => router.push(path);

  return (
    <div className="bg-[#0A2540] text-[#FFFFFF] font-sans w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/d3/d5/24/d3d524fa1eadee6075b8a6c893e02e49.jpg")',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        {/* Neon gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF00FF]/20 to-[#00CFFF]/20 mix-blend-overlay animate-pulse-slow z-0"></div>

        {/* Floating Neon Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-[#FF00FF]/40 blur-2xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
            style={{ top: "20%", left: "10%" }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-[#00CFFF]/40 blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
            style={{ top: "60%", left: "70%" }}
          />
        </div>

        {/* Hero Text */}
        <div className="text-center px-6 max-w-3xl relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            Welcome to <span className="text-[#FF00FF]">Finchoice Loans</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8 text-[#FFFFFF]/90"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={1}
          >
            Fast, secure, and transparent loans for South Africans — right at your
            fingertips.
          </motion.p>
          <motion.div
            className="flex justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            custom={2}
          >
            <button
              className="bg-gradient-to-r from-[#FF00FF] to-[#00CFFF] text-[#FFFFFF] font-bold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform hover:shadow-2xl"
              onClick={() => handleRedirect("/register")}
            >
              Apply Now
            </button>
            <button
              className="border border-[#FFFFFF] px-10 py-4 rounded-2xl font-semibold hover:bg-[#FFFFFF] hover:text-[#0A2540] transition shadow-lg"
              onClick={() => handleRedirect("/about")}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 px-6 bg-[#0A2540]/90 backdrop-blur-sm">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#FFFFFF]"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          Our Services
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Personal Loans",
              description: "Flexible loans tailored to your personal needs.",
            },
            {
              title: "Business Loans",
              description:
                "Empowering your business growth with reliable financing.",
            },
            {
              title: "Education Loans",
              description: "Invest in your future with our education loan plans.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="p-8 bg-[#FFFFFF]/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-[#FFFFFF]/20"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={index}
            >
              <div className="w-full h-40 mb-4 bg-[#FFFFFF]/20 rounded-lg flex items-center justify-center text-[#FFFFFF]/50">
                <span>Image Placeholder</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-[#FFFFFF]/70">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-28 px-6 bg-[#0A2540]">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#FFFFFF]"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          What Our Customers Say
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              name: "John D.",
              review:
                "Finchoice Loans made the process so easy and stress-free!",
              rating: 5,
            },
            {
              name: "Sarah K.",
              review: "I got my loan approved in no time. Highly recommend!",
              rating: 4,
            },
            {
              name: "Lerato M.",
              review: "Transparent and reliable service. Thank you!",
              rating: 5,
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              className="p-8 bg-[#00CFFF]/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl border border-[#FFFFFF]/20"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={index}
            >
              <div className="w-16 h-16 rounded-full bg-[#FFFFFF]/20 mb-4 flex items-center justify-center text-[#FFFFFF]/50">
                <span>Avatar</span>
              </div>
              <p className="mb-4 text-[#FFFFFF]/80">"{review.review}"</p>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-[#FF00FF]" />
                ))}
              </div>
              <p className="mt-4 font-semibold text-[#FFFFFF]/90">- {review.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-28 px-6 bg-[#0A2540] text-[#FFFFFF]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About Us</h2>
          <p className="text-lg md:text-xl leading-relaxed text-[#FFFFFF]/80">
            At Finchoice Loans, we combine innovation and trust to provide fast,
            secure, and transparent loans. Our mission is to empower South
            Africans to achieve their financial goals with ease. We focus on a
            seamless experience, minimal paperwork, and instant approvals.
          </p>
          <div className="w-full h-60 mt-8 bg-[#FFFFFF]/20 rounded-lg flex items-center justify-center text-[#FFFFFF]/50">
            <span>About Image Placeholder</span>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-28 px-6 bg-[#FF00FF] text-[#FFFFFF]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-[#FFFFFF]/90">
            Join thousands of South Africans who trust Finchoice Loans for their
            financial needs.
          </p>
          <button
            className="bg-[#FFFFFF] text-[#0A2540] px-10 py-4 rounded-2xl font-semibold hover:bg-[#00CFFF] hover:text-[#FFFFFF] transition shadow-xl hover:scale-105"
            onClick={() => handleRedirect("/register")}
          >
            Apply Now
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default WelcomePage;
