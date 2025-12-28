// components/AboutSection.jsx
import React from "react";
import {
  Flower2,
  Heart,
  Sprout,
  Users,
  Shield,
  Star,
  Award,
  Globe,
  Package,
  Truck,
  Clock,
  CheckCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const AboutSection = () => {
  return (
    <section
      id="about"
      className=" py-20 bg-gradient-to-b from-stone-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 shadow-sm mb-8">
            <Flower2 size={20} className="text-amber-600" />
            <span className="text-sm font-medium text-stone-700">
              About Roselle Studio
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6">
            Crafting Timeless Beauty Since 2015
          </h1>

          <p className="text-lg text-stone-600 mb-8 leading-relaxed">
            At Roselle Studio, we transform artificial flowers into everlasting
            art. Our handcrafted arrangements bring nature&apos;s elegance into your
            space without the maintenance, offering beauty that lasts for years.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-amber-600" />
              <span className="text-stone-700 font-medium">
                Premium Quality
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-amber-600" />
              <span className="text-stone-700 font-medium">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-amber-600" />
              <span className="text-stone-700 font-medium">Handcrafted</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-100 to-stone-100 flex items-center justify-center mb-6">
              <Star size={24} className="text-amber-700" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Our Mission
            </h2>
            <p className="text-stone-600 mb-6">
              To revolutionize artificial floral design by creating pieces so
              lifelike and beautiful, they bring the joy of fresh flowers
              without the limitations of nature. We combine traditional
              craftsmanship with innovative materials to deliver enduring
              elegance.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="text-amber-600 mt-1 flex-shrink-0"
                />
                <span className="text-stone-700">
                  Create hyper-realistic floral arrangements
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="text-amber-600 mt-1 flex-shrink-0"
                />
                <span className="text-stone-700">
                  Use sustainable, durable materials
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="text-amber-600 mt-1 flex-shrink-0"
                />
                <span className="text-stone-700">
                  Make luxury floral decor accessible
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl p-8 shadow-lg border border-amber-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-stone-800 to-stone-900 flex items-center justify-center mb-6">
              <Globe size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Our Vision
            </h2>
            <p className="text-stone-600 mb-6">
              To become the world&apos;s most trusted source for premium artificial
              flowers, recognized for our unparalleled quality, design
              innovation, and commitment to sustainable luxury. We envision
              homes and businesses worldwide adorned with our timeless
              creations.
            </p>
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-stone-700 italic">
                &quot;Where artificial meets art, and beauty becomes everlasting.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us - Feature Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Why Choose Roselle Studio?
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover the difference between ordinary artificial flowers and
              our meticulously crafted collections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Package size={24} />,
                title: "Premium Materials",
                description:
                  "We use only the highest quality silk, latex, and preserved botanicals that mimic nature&apos;s finest details.",
                color: "from-amber-100 to-stone-100",
              },
              {
                icon: <Clock size={24} />,
                title: "Lasting Beauty",
                description:
                  "Unlike fresh flowers, our arrangements maintain their vibrancy for years with minimal maintenance.",
                color: "from-stone-100 to-amber-100",
              },
              {
                icon: <Sprout size={24} />,
                title: "Allergy-Friendly",
                description:
                  "Perfect for those with allergies or pets. Enjoy floral beauty without pollen or fragrance concerns.",
                color: "from-amber-50 to-stone-50",
              },
              {
                icon: <Truck size={24} />,
                title: "Worldwide Delivery",
                description:
                  "Carefully packaged and shipped globally. Your arrangement arrives ready to display, looking perfect.",
                color: "from-stone-50 to-amber-50",
              },
              {
                icon: <Shield size={24} />,
                title: "Quality Guarantee",
                description:
                  "Every piece is backed by our 2-year craftsmanship warranty. We stand behind our quality.",
                color: "from-amber-100 to-stone-100",
              },
              {
                icon: <Users size={24} />,
                title: "Expert Design Team",
                description:
                  "Our florists combine artistic vision with botanical accuracy for truly authentic arrangements.",
                color: "from-stone-100 to-amber-100",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.color} rounded-xl p-6 border border-stone-200 hover:border-stone-300 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                  <div className="text-amber-700">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Process */}
        <div className="mb-20 bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl p-8 md:p-12 border border-stone-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              The Roselle Studio Process
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Each arrangement undergoes our meticulous 4-step creation process
              to ensure perfection in every detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Inspiration & Design",
                desc: "Drawing from nature&apos;s beauty to create unique designs",
              },
              {
                step: "02",
                title: "Material Selection",
                desc: "Choosing premium fabrics and botanicals for realism",
              },
              {
                step: "03",
                title: "Hand Assembly",
                desc: "Skilled artisans carefully craft each arrangement",
              },
              {
                step: "04",
                title: "Quality Check",
                desc: "Rigorous inspection to ensure perfection before shipping",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-stone-800 to-stone-900 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials/Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { number: "9+", label: "Years of Excellence", suffix: "" },
            { number: "10K+", label: "Happy Customers", suffix: "" },
            { number: "99%", label: "Satisfaction Rate", suffix: "" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-stone-900 mb-2">
                {stat.number}
                {stat.suffix}
              </div>
              <div className="text-stone-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Timeless Beauty
          </h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have transformed their spaces with
            our premium artificial flower collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="px-8 py-3 bg-white text-stone-900 rounded-lg hover:bg-stone-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Browse Collections
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Enhanced SEO Content Section */}
        <div className="mt-20 pt-12 border-t border-stone-200/60">
          <div className="max-w-6xl mx-auto">
            {/* SEO Content Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-stone-400"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                The Art of Artificial Floral Design
              </h2>
              <p className="text-stone-500 text-lg max-w-3xl mx-auto">
                Discover why Roselle Studio is the premier choice for luxury
                artificial flowers and how our creations can transform your
                space.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-10 mb-12">
              {/* Left Column - Main Content */}
              <div className="space-y-8">
                {/* Card 1 */}
                <div className="bg-gradient-to-br from-amber-50/50 to-stone-50/50 rounded-xl p-8 border border-stone-200/50 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-stone-800 to-stone-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">✿</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-2">
                        Premium Artificial Flowers for Lasting Elegance
                      </h3>
                      <p className="text-stone-600 leading-relaxed">
                        At Roselle Studio, we specialize in creating{" "}
                        <span className="font-semibold text-stone-800">
                          luxury artificial flowers
                        </span>{" "}
                        that capture the delicate beauty of nature while
                        offering practical benefits for modern living. Our
                        collections feature{" "}
                        <span className="font-semibold text-stone-800">
                          handcrafted floral arrangements
                        </span>{" "}
                        perfect for home decor, wedding venues, corporate
                        spaces, and special occasions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-br from-stone-50/50 to-amber-50/50 rounded-xl p-8 border border-stone-200/50 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-bold">🌸</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-2">
                        Unmatched Quality & Realism
                      </h3>
                      <p className="text-stone-600 leading-relaxed">
                        Unlike traditional fresh flowers, our{" "}
                        <span className="font-semibold text-stone-800">
                          high-quality artificial blooms
                        </span>{" "}
                        require no watering, never wilt, and maintain their
                        vibrant colors year-round. Each piece is designed with
                        meticulous attention to detail, ensuring{" "}
                        <span className="font-semibold text-stone-800">
                          realistic texture and appearance
                        </span>{" "}
                        that rivals live flowers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Benefits */}
              <div>
                <div className="sticky top-8">
                  <div className="bg-gradient-to-br from-stone-800/95 to-stone-900/95 rounded-xl p-8 text-white shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Sparkles size={20} className="text-amber-300" />
                      <span>Why Choose Artificial Flowers?</span>
                    </h3>

                    <div className="space-y-5">
                      {[
                        {
                          icon: "💰",
                          title: "Cost-Effective",
                          desc: "One-time investment for years of enduring beauty",
                        },
                        {
                          icon: "🌱",
                          title: "Hypoallergenic",
                          desc: "Perfect for allergy sufferers & sensitive environments",
                        },
                        {
                          icon: "🎨",
                          title: "Versatile Styling",
                          desc: "Works beautifully in any room regardless of lighting",
                        },
                        {
                          icon: "🌍",
                          title: "Eco-Conscious",
                          desc: "Eliminates water waste & pesticide use",
                        },
                        {
                          icon: "✈️",
                          title: "Travel-Friendly",
                          desc: "Maintains perfection through shipping & handling",
                        },
                      ].map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                            {benefit.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-amber-50 mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-stone-300 text-sm">
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Section */}
            <div className="pt-10 border-t border-stone-200/50">
              <h3 className="text-2xl font-bold text-stone-900 mb-8 text-center">
                Perfect For Every Setting
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🏡",
                    title: "Home Decor",
                    desc: "Elevate living spaces with timeless floral arrangements",
                  },
                  {
                    icon: "💒",
                    title: "Weddings & Events",
                    desc: "Stunning centerpieces that last beyond the celebration",
                  },
                  {
                    icon: "🏢",
                    title: "Office Spaces",
                    desc: "Professional elegance without maintenance worries",
                  },
                  {
                    icon: "🛍️",
                    title: "Retail & Hospitality",
                    desc: "Create welcoming atmospheres that impress clients",
                  },
                ].map((application, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                      {application.icon}
                    </div>
                    <h4 className="font-bold text-stone-900 mb-2">
                      {application.title}
                    </h4>
                    <p className="text-sm text-stone-600">{application.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-12 text-center">
              <p className="text-stone-600 mb-6 text-lg">
                Ready to transform your space with everlasting floral beauty?
              </p>
              <a
                href="/allproducts"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-lg hover:from-stone-900 hover:to-stone-950 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <Flower2 size={24} />
                <span>Explore Our Collections</span>
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;