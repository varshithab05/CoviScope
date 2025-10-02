'use client';

import { useState } from 'react';
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

type VariantData = {
  country: string;
  mutations: {
    silent: number;
    missense: number;
    nonsense: number;
  };
  color: string;
};

const variantData: VariantData[] = [
  {
    country: 'India',
    mutations: {
      silent: 24000,
      missense: 380000,
      nonsense: 6000
    },
    color: '#00E0FF'
  },
  {
    country: 'China',
    mutations: {
      silent: 25000,
      missense: 360000,
      nonsense: 5000
    },
    color: '#9D4EDD'
  },
  {
    country: 'USA',
    mutations: {
      silent: 26000,
      missense: 390000,
      nonsense: 10000
    },
    color: '#FF6B6B'
  }
];

export default function GeoAnalysis() {
  const chartData = {
    labels: variantData.map(data => data.country),
    datasets: [
      {
        label: 'Silent Mutations',
        data: variantData.map(data => data.mutations.silent),
        backgroundColor: '#00E0FF',
        borderColor: '#00E0FF',
        borderWidth: 1,
      },
      {
        label: 'Missense Mutations',
        data: variantData.map(data => data.mutations.missense),
        backgroundColor: '#9D4EDD',
        borderColor: '#9D4EDD',
        borderWidth: 1,
      },
      {
        label: 'Nonsense Mutations',
        data: variantData.map(data => data.mutations.nonsense),
        backgroundColor: '#FF6B6B',
        borderColor: '#FF6B6B',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Mutation Distribution by Country',
        color: '#fff',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        }
      }
    },
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-4xl mt-12 font-bold text-center mb-8 ">
          Geographic Analysis
        </h1>

        <div className="bg-glass p-6 rounded-xl mb-8">
          <p className="text-gray-300 text-center">
            Geographic analysis was conducted exclusively on the Omicron variant across three major countries. 
            Analysis of other variants could not be performed due to insufficient data availability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <motion.div
            className="bg-glass p-6 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Bar data={chartData} options={options} className="min-h-[400px]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {variantData.map((data) => (
              <motion.div
                key={data.country}
                className="bg-glass p-6 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: data.color }}>
                  {data.country}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Silent</span>
                    <span className="text-accent-cyan">{data.mutations.silent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Missense</span>
                    <span className="text-accent-purple">{data.mutations.missense.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Nonsense</span>
                    <span className="text-red-400">{data.mutations.nonsense.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}