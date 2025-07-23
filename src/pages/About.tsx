import React from 'react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 relative min-h-screen">
      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-4xl mx-auto pt-16 sm:pt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4F46E5] mb-8 text-center">À propos du Taj Mahal</h1>

        {/* Section Hero */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Intérieur du restaurant"
            className="w-full h-56 sm:h-64 object-cover"
          />
        </div>

        {/* Contenu principal */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            Bienvenue au <span className="font-semibold text-[#4F46E5]">Taj Mahal</span>, où nous vous proposons des saveurs authentiques et une expérience culinaire unique. Notre passion pour l'excellence culinaire se reflète dans chaque plat que nous servons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                Fondé en 2023, notre restaurant est né d'une idée simple : créer un espace où les amateurs de gastronomie pourraient savourer des recettes traditionnelles avec une touche moderne.
              </p>
              <p className="text-gray-600">
                Ce qui a commencé comme un petit établissement familial est devenu une adresse prisée des gourmets de toute la ville.
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Notre Philosophie</h2>
              <p className="text-gray-600 mb-4">
                Nous croyons au pouvoir des ingrédients frais et locaux pour transformer des plats simples en expériences extraordinaires.
              </p>
              <p className="text-gray-600">
                Chaque plat raconte une histoire - celle des agriculteurs qui cultivent nos produits, des artisans qui préparent nos ingrédients et des chefs qui assemblent le tout.
              </p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-5 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Notre Équipe</h3>
            <p className="text-gray-600">
              Notre équipe de chefs expérimentés apporte des années d'expertise culinaire du monde entier. Nous sommes fiers de compter parmi nous des vétérans formés dans des restaurants étoilés au Michelin aux côtés de jeunes talents apportant des perspectives fraîches à notre cuisine.
            </p>
          </div>
        </div>

        {/* Témoignages */}
        <div className="bg-[#4F46E5] text-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">Ce que disent nos clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <p className="italic mb-2">"La meilleure expérience culinaire de l'année ! Les saveurs étaient incroyables."</p>
              <p className="font-medium">- Sarah M.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <p className="italic mb-2">"Authentique, savoureux et magnifiquement présenté. Je reviendrai certainement !"</p>
              <p className="font-medium">- James L.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;