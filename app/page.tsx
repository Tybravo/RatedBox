"use client";

import { MapPin, Star, Info } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

// Dummy data for restrooms
const RESTROOMS = [
  { id: 1, lat: 20, left: 20, status: "Clean", rating: 5, address: "Central Market, Lagos", color: "text-green-600" },
  { id: 2, lat: 40, left: 60, status: "Average", rating: 3, address: "Ojota Bus Stop", color: "text-yellow-500" },
  { id: 3, lat: 70, left: 30, status: "Dirty", rating: 1, address: "Yaba Tech Junction", color: "text-red-500" },
  { id: 4, lat: 60, left: 80, status: "Clean", rating: 4, address: "Ikeja City Mall", color: "text-green-600" },
  { id: 5, lat: 30, left: 45, status: "Maintenance", rating: 0, address: "Oshodi Transport Interchange", color: "text-gray-500" },
];

export default function HomePage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-white overflow-hidden flex flex-col">
      {/* Bubble Animation Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bubble blue"></div>
        <div className="bubble green"></div>
        <div className="bubble purple"></div>
        <div className="bubble blue" style={{ left: '20%', animationDelay: '3s', width: '20px', height: '20px' }}></div>
        <div className="bubble green" style={{ left: '60%', animationDelay: '5s', width: '45px', height: '45px' }}></div>
        <div className="bubble purple" style={{ left: '90%', animationDelay: '1s' }}></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        
        {/* Hero Text */}
        <div className="text-center mb-12 max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="text-accent-purple">Find</span> <span className="text-primary">Clean Restrooms</span> <br/> <span className="text-accent-purple">Anywhere in Nigeria</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Locate, Rate, and Report public restrooms in markets and transport hubs.
            Help us maintain hygiene standards together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="btn-primary">
               Find Restroom Near Me
             </button>
             <button className="btn-purple">
               Add a Restroom
             </button>
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner overflow-hidden mx-auto mt-8">
           <div className="absolute inset-0 flex items-center justify-center text-blue-200/20 font-bold text-9xl select-none pointer-events-none">
              MAP VIEW
           </div>

           {/* Location Pins */}
           {RESTROOMS.map((restroom) => (
             <div
               key={restroom.id}
               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50"
               style={{ top: `${restroom.lat}%`, left: `${restroom.left}%` }}
               onMouseEnter={() => setHoveredId(restroom.id)}
               onMouseLeave={() => setHoveredId(null)}
             >
               <div className={clsx("relative p-2 rounded-full bg-white shadow-lg border-2", 
                  restroom.status === 'Clean' ? 'border-green-500' :
                  restroom.status === 'Average' ? 'border-yellow-500' :
                  restroom.status === 'Dirty' ? 'border-red-500' : 'border-gray-400'
               )}>
                 <MapPin 
                    className={clsx("w-6 h-6", restroom.color)} 
                    fill="currentColor"
                 />
                 
                 {/* Tooltip */}
                 <div className={clsx(
                   "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-48 bg-white rounded-xl shadow-xl p-3 border border-gray-100 transition-all duration-200 origin-bottom z-50",
                   hoveredId === restroom.id ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                 )}>
                   <div className="text-center">
                     <p className="font-bold text-gray-800 text-sm mb-1">{restroom.address}</p>
                     <div className="flex items-center justify-center gap-1 mb-2">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={12} 
                           className={i < restroom.rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                         />
                       ))}
                     </div>
                     <span className={clsx(
                       "inline-block px-2 py-1 rounded-full text-xs font-semibold",
                       restroom.status === 'Clean' ? 'bg-green-100 text-green-700' :
                       restroom.status === 'Average' ? 'bg-yellow-100 text-yellow-700' :
                       restroom.status === 'Dirty' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                     )}>
                       {restroom.status}
                     </span>
                   </div>
                   {/* Tooltip Arrow */}
                   <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white"></div>
                 </div>
               </div>
               {/* Pulse Effect */}
               <div className={clsx("absolute inset-0 rounded-full animate-ping opacity-25", restroom.color.replace('text-', 'bg-'))}></div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
