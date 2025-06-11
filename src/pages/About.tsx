import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="max-w-7xl mx-auto p-4 relative min-h-screen">
      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        aria-label="Close"
      >
        <XMarkIcon className="h-6 w-6 text-gray-600" />
      </button>

      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="text-4xl font-bold text-[#4F46E5] mb-8 text-center">About Tajmahal</h1>
        
        {/* Hero Section */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Restaurant interior"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-[#4F46E5]">Tajmahal</span>, where we bring you authentic flavors and a dining experience like no other. Our passion for culinary excellence is reflected in every dish we serve.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, our restaurant was born from a simple idea: to create a space where food lovers could enjoy traditional recipes with a modern twist.
              </p>
              <p className="text-gray-600">
                What started as a small family-owned establishment has grown into a beloved destination for food enthusiasts across the city.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Philosophy</h2>
              <p className="text-gray-600 mb-4">
                We believe in the power of fresh, locally-sourced ingredients to transform simple meals into extraordinary experiences.
              </p>
              <p className="text-gray-600">
                Every dish tells a story - of the farmers who grow our produce, the artisans who craft our ingredients, and the chefs who bring it all together.
              </p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Meet Our Team</h3>
            <p className="text-gray-600">
              Our team of experienced chefs brings years of culinary expertise from around the world. We're proud to have industry veterans who have trained in Michelin-starred restaurants alongside young talents bringing fresh perspectives to our kitchen.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#4F46E5] text-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">What Our Guests Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <p className="italic mb-2">"The best dining experience I've had this year! The flavors were incredible."</p>
              <p className="font-medium">- Sarah M.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <p className="italic mb-2">"Authentic, flavorful, and beautifully presented. Will definitely return!"</p>
              <p className="font-medium">- James L.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;