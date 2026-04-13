import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Blocks, Cpu, Smartphone, Layout, Layers, Box, Globe, MessageSquare 
} from 'lucide-react';

const InteractiveGraphic = ({ type = 'hero' }) => {
  const getConfig = () => {
    switch(type) {
      case 'hero':
        return {
          icons: [Code, Blocks, Cpu, Smartphone],
          colors: ['from-cyan-400 to-blue-500', 'from-purple-500 to-indigo-500'],
          label: "Interactive Developer"
        };
      case 'projects':
        return {
          icons: [Layout, Layers, Box, Globe],
          colors: ['from-emerald-400 to-cyan-500', 'from-blue-400 to-indigo-500'],
          label: "Creative Solutions"
        };
      case 'skills':
        return {
          icons: [Cpu, Blocks, Code, Layers],
          colors: ['from-amber-400 to-orange-500', 'from-red-400 to-pink-500'],
          label: "Tech Expertise"
        };
      case 'contact':
        return {
          icons: [MessageSquare, Globe, Smartphone, Code],
          colors: ['from-fuchsia-400 to-purple-500', 'from-violet-400 to-indigo-500'],
          label: "Let's Connect"
        };
      default:
        return {
          icons: [Code, Box, Layers, Blocks],
          colors: ['from-cyan-400 to-blue-500', 'from-purple-500 to-indigo-500'],
          label: "Visualization"
        };
    }
  };

  const config = getConfig();

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden glass rounded-xl">
      {/* Background ambient glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className={`absolute w-3/4 h-3/4 rounded-full blur-3xl opacity-30 bg-gradient-to-tr ${config.colors[0]}`}
      />

      <div className="relative z-10 grid grid-cols-2 gap-4 lg:gap-8 p-8">
        {config.icons.map((Icon, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 0 }}
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.5
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 glass rounded-2xl flex items-center justify-center bg-gradient-to-br ${idx % 2 === 0 ? config.colors[0] : config.colors[1]} bg-opacity-10 shadow-[0_0_30px_rgba(0,0,0,0.1)] border border-white/10 backdrop-blur-md cursor-pointer`}
          >
            <Icon size={48} className="text-white opacity-80" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-0 w-full text-center pointer-events-none"
      >
        <div className="inline-block px-4 py-2 glass rounded-full border border-white/10">
          <p className="text-sm md:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {config.label}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveGraphic;