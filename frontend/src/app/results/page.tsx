'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types for our mutation data
type NucleotideMutation = {
  Position: number;
  Reference: string;
  Mutated: string;
};

type CodonMutation = {
  Codon_Position: number;
  Reference_Codon: string;
  Mutated_Codon: string;
  Mutation_Type: string;
};

type ResultData = {
  variant: string;
  mutations: NucleotideMutation[];
  codon_wise_mutations: CodonMutation[];
};

export default function Results() {
  const [data, setData] = useState<ResultData | null>(null);
  const [activeTab, setActiveTab] = useState('nucleotide');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('analysisResults');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-cyan" />
      </div>
    );
  }

  if (!data || !data.mutations || !data.codon_wise_mutations) {
    return (
      <div className="min-h-[calc(100vh-8rem)] p-4 flex items-center justify-center">
        <div className="bg-glass p-6 rounded-xl text-center">
          <h2 className="text-2xl text-accent-cyan mb-4">No Analysis Data</h2>
          <p className="text-gray-300">Please upload a sequence or file to analyze.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent mb-4">
            Analysis Results
          </h1>
          <div className="bg-glass p-6 rounded-xl backdrop-blur-sm border border-white/10 mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Predicted Variant: 
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent ml-2 from-accent-cyan to-accent-purple px-6 py-2 rounded-lg">
                {data?.variant}
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={() => setActiveTab('nucleotide')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-semibold relative
              bg-gradient-to-r from-accent-cyan/20 to-accent-cyan/10
              ${activeTab === 'nucleotide'
                ? 'ring-2 ring-accent-cyan text-white scale-105 shadow-lg shadow-accent-cyan/20'
                : 'text-gray-300 hover:text-white hover:scale-102'
              }`}
            whileHover={{ scale: activeTab === 'nucleotide' ? 1.05 : 1.02 }}
          >
            {activeTab === 'nucleotide' && (
              <motion.div
                className="absolute inset-0 bg-accent-cyan/20 rounded-lg"
                layoutId="activeTabBackground"
              />
            )}
            <span className="relative z-10">Nucleotide Mutations</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('codon')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-semibold relative
              bg-gradient-to-r from-accent-purple/20 to-accent-purple/10
              ${activeTab === 'codon'
                ? 'ring-2 ring-accent-purple text-white scale-105 shadow-lg shadow-accent-purple/20'
                : 'text-gray-300 hover:text-white hover:scale-102'
              }`}
            whileHover={{ scale: activeTab === 'codon' ? 1.05 : 1.02 }}
          >
            {activeTab === 'codon' && (
              <motion.div
                className="absolute inset-0 bg-accent-purple/20 rounded-lg"
                layoutId="activeTabBackground"
              />
            )}
            <span className="relative z-10">Codon Mutations</span>
          </motion.button>
        </div>

        {activeTab === 'nucleotide' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {data?.mutations.map((mutation, index) => (
              <motion.div
                key={index}
                className="bg-glass p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-accent-cyan/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-accent-cyan">
                    Position {mutation.Position}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-6">
                  <span className="text-2xl text-red-400 font-mono">{mutation.Reference}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-2xl text-green-400 font-mono">{mutation.Mutated}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {data?.codon_wise_mutations.map((mutation, index) => (
              <motion.div
                key={index}
                className="bg-glass p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-accent-purple/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-accent-purple">
                    Position {mutation.Codon_Position}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mutation.Mutation_Type === 'Missense' 
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {mutation.Mutation_Type}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-6">
                  <span className="text-xl text-red-400 font-mono">{mutation.Reference_Codon}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-xl text-green-400 font-mono">{mutation.Mutated_Codon}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}