'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [sequenceInput, setSequenceInput] = useState('');

  const handleRedirectWithData = (data: any) => {
    sessionStorage.setItem('analysisResults', JSON.stringify(data));
    router.replace('/results');  // Using replace instead of push
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/sars-variants/predictSarsFile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Analysis completed successfully!');
        handleRedirectWithData(data);
      } else {
        toast.error('Failed to process file');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [router]);

  const handleSequenceSubmit = async () => {
    if (!sequenceInput.trim()) {
      toast.error('Please enter a sequence');
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch('http://localhost:8000/api/sars-variants/predictSarsSequence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sequence: sequenceInput }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Analysis completed successfully!');
        handleRedirectWithData(data);
      } else {
        toast.error('Failed to process sequence');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSampleSequence = () => {
    const sampleSequence = `>Sample_SARS_CoV_2
ATTAAAGGTTTATACCTTCCCAGGTAACAAACCAACCAACTTTCGATCTCTTGTAGATCT
GTTCTCTAAACGAACTTTAAAATCTGTGTGGCTGTCACTCGGCTGCATGCTTAGTGCACT
CACGCAGTATAATTAATAACTAATTACTGTCGTTGACAGGACACGAGTAACTCGTCTATC`;
    setSequenceInput(sampleSequence);
  };

  const handleSampleDownload = () => {
    const sampleSequence = `>Sample_SARS_CoV_2
ATTAAAGGTTTATACCTTCCCAGGTAACAAACCAACCAACTTTCGATCTCTTGTAGATCT
GTTCTCTAAACGAACTTTAAAATCTGTGTGGCTGTCACTCGGCTGCATGCTTAGTGCACT
CACGCAGTATAATTAATAACTAATTACTGTCGTTGACAGGACACGAGTAACTCGTCTATC`;

    const blob = new Blob([sampleSequence], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_sequence.fasta';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.fasta', '.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mt-12 mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Sequence Analysis
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload your SARS-CoV-2 sequence or use our sample data to analyze variants and mutations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: Upload and Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* File Upload Section */}
            <div className="bg-glass p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-semibold text-accent-cyan mb-4">Upload File</h2>
              <div
                {...getRootProps()}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
                  ${isDragActive 
                    ? 'border-accent-cyan bg-accent-cyan/5' 
                    : 'border-gray-600 hover:border-accent-purple'
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M24 14v14m0-14l-4 4m4-4l4 4m-12 4h16"
                    />
                  </svg>
                  <p className="text-lg text-gray-300">
                    {isDragActive ? "Drop your file here..." : "Drag and drop your FASTA or CSV file"}
                  </p>
                  {fileName && <p className="mt-2 text-accent-cyan">{fileName}</p>}
                </div>
              </div>
            </div>

            {/* Sequence Input Section */}
            <div className="bg-glass p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-accent-purple">Input Sequence</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleSampleSequence}
                    className="px-3 py-1 text-sm rounded-lg bg-glass hover:bg-white/10 text-accent-cyan border border-accent-cyan/30 transition-all duration-300"
                  >
                    Use Sample
                  </button>
                  <button
                    onClick={handleSampleDownload}
                    className="px-3 py-1 text-sm rounded-lg bg-glass hover:bg-white/10 text-accent-purple border border-accent-purple/30 transition-all duration-300"
                  >
                    Download Sample
                  </button>
                </div>
              </div>
              <textarea
                value={sequenceInput}
                onChange={(e) => setSequenceInput(e.target.value)}
                placeholder="Paste your sequence here..."
                className="w-full h-48 bg-background/50 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-accent-purple focus:outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={handleSequenceSubmit}
                disabled={isUploading}
                className="w-full px-6 py-4 rounded-xl relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan bg-[length:200%_auto] animate-gradient" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">
                    Analyze Sequence
                  </span>
                  <svg 
                    className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Section: Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/omicron.png"
                alt="SARS-CoV-2 Omicron Variant"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">About the Analysis</h3>
              <p className="text-gray-300">
                Our advanced deep learning model analyzes SARS-CoV-2 sequences to identify variants and mutations with high accuracy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isUploading && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-glass p-8 rounded-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-cyan mx-auto mb-4" />
            <p className="text-white">Processing...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}