import {MapPin,Phone,Mail,ShoppingBasket} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" border-t mt-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <ShoppingBasket className="text-white" size={20} />
              </div>

              <h2 className="text-2xl font-bold text-green-700">GroceryMart</h2>
            </div>

            <p className="mt-5 text-gray-500 leading-7">
              GroceryMart delivers fresh fruits, vegetables, dairy products,
              beverages, snacks, and daily essentials directly to your doorstep
              at the best prices.
            </p>

            <div className="flex gap-4 mt-6">
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer hover:bg-green-600 hover:text-white duration-300"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-7 p-1 sm:p-0 md:p-0 ">Shop</h3>

            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-green-600 cursor-pointer">
                Fresh Vegetables
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Fresh Fruits
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Dairy Products
              </li>

              <li className="hover:text-green-600 cursor-pointer">Bakery</li>
              <li className="hover:text-green-600 cursor-pointer">Beverages</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-5">Company</h3>

            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-green-600 cursor-pointer">About Us</li>

              <li className="hover:text-green-600 cursor-pointer">Careers</li>

              <li className="hover:text-green-600 cursor-pointer">Blog</li>

              <li className="hover:text-green-600 cursor-pointer">
                Contact Us
              </li>

              <li className="hover:text-green-600 cursor-pointer">FAQs</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-5">Customer Service</h3>

            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-green-600 cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Shipping Policy
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Return Policy
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-green-600 cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 border-b py-2 mt-10 w-full ">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center">
              <MapPin size={20} />
            </div>

            <div>
              <h4 className="font-semibold text-lg">Address</h4>
              <p className="text-gray-500">123 Green Market Street</p>
              <p className="text-gray-500">Bareilly, Uttar Pradesh</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center">
              <Phone size={20} />
            </div>

            <div>
              <h4 className="font-semibold text-lg">Phone</h4>
              <p className="text-gray-500">+91 9876543210</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center">
              <Mail size={20} />
            </div>

            <div>
              <h4 className="font-semibold text-lg">Email</h4>
              <p className="text-gray-500 break-all">support@grocerymart.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5">
          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} GroceryMart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
