'use client';

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function About() {
  return (
    <div className="min-h-[calc(100vh-8rem)] p-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          About CoviScope
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-glass p-8 rounded-xl backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Project Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              CoviScope is an advanced AI-powered platform designed to predict SARS-CoV-2 variants
              and map their mutations. Using state-of-the-art deep learning techniques, we provide
              accurate variant predictions while maintaining transparency through explainable AI.
            </p>
          </motion.div>

          <motion.div
            className="bg-glass p-8 rounded-xl backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-accent-purple mb-4">Methodology</h2>
            <p className="text-gray-300 leading-relaxed">
              Our system employs Convolutional Neural Networks (CNN) combined with Layer-wise
              Relevance Propagation (LRP) for explainable predictions. This approach allows us
              to not only identify variants but also understand the specific mutations that
              contribute to the classification.
            </p>
          </motion.div>

          <motion.div
            className="bg-glass p-8 rounded-xl backdrop-blur-sm md:col-span-2"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Research Impact</h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Currently under review at Neurocomputing (Elsevier, 2025), our research
                demonstrates significant advances in viral variant prediction accuracy and
                explainability. The project contributes to both the scientific community
                and public health decision-making.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <span className="text-accent-purple">Publication Status:</span>
                <span className="bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full text-sm">
                  Under Review
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-glass p-8 rounded-xl backdrop-blur-sm md:col-span-2"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-accent-purple mb-6">Research Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add team member cards here */}
              <div className="bg-background/40 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-accent-cyan">Lead Researcher</h3>
                <p className="text-gray-400">Varshitha Bammidi</p>
                <p className="text-sm text-gray-500">B.Tech UnderGraduate at IIITS</p>
              </div>
              {/* Add more team members as needed */}
              <div className="bg-background/40 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-accent-cyan">Co-Researcher</h3>
                <p className="text-gray-400">Dr. ChandraMohan Dasari</p>
                <p className="text-sm text-gray-500">Proffessor at IIIT</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}