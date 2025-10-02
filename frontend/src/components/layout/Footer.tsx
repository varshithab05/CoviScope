import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full bg-background/80 backdrop-blur-sm border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400"
            >
              © 2025 CoviScope | Built with Explainable AI
            </motion.span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/about" 
              className="text-sm text-gray-400 hover:text-accent-cyan transition-colors"
            >
              About
            </Link>
            <Link 
              href="/methodology" 
              className="text-sm text-gray-400 hover:text-accent-cyan transition-colors"
            >
              Methodology
            </Link>
            <a 
              href="#" 
              className="text-sm text-gray-400 hover:text-accent-cyan transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Paper link placeholder
              }}
            >
              Research Paper
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}