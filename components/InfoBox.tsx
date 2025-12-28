
import React, { useEffect, useState } from 'react';
import { generateTitanReport } from '../services/geminiService';
import { TitanReport } from '../types';

const InfoBox: React.FC = () => {
  const [report, setReport] = useState<TitanReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const data = await generateTitanReport("Eren Yeager");
      setReport(data);
      setLoading(false);
    };
    fetchReport();
  }, []);

  return (
    <div className="absolute right-8 bottom-24 w-72 md:w-96 z-40 transform hover:scale-[1.02] transition-transform duration-500">
      <div className="relative p-8 distressed-texture bg-[#e6d8b5] border-[3px] border-[#5d4037] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm">
        {/* Coffee/Blood stains */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#8b4513]/5 blur-2xl rounded-full"></div>
        
        <div className="relative z-10 font-serif text-[#3e2723]">
          <div className="mb-6 border-b-2 border-[#5d4037] pb-3">
            <h3 className="text-2xl font-black uppercase tracking-widest text-[#2d1a12]">
              現在公開可能な情報 by Orewa_Zenith
            </h3>
            <div className="text-[10px] mt-1 opacity-60 font-mono tracking-tighter">
              Currently Disclosable Information: Intelligence Report #845-E
            </div>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-black/10 rounded w-3/4"></div>
              <div className="h-4 bg-black/10 rounded w-1/2"></div>
              <div className="h-32 bg-black/10 rounded w-full"></div>
            </div>
          ) : (
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Target Name</span>
                <span className="text-lg font-bold border-l-4 border-red-700 pl-3">{report?.subject}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Classification</span>
                  <span className="font-bold">{report?.classification}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Threat Level</span>
                  <span className="font-bold text-red-700">{report?.dangerLevel}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#5d4037]/20 italic text-[13px]">
                "{report?.description}"
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between items-end opacity-50">
            <div className="text-[10px] font-mono leading-none">
              COORD-ID: 7-9-0-1-5-6<br/>
              SURVEY CORPS ARCHIVES
            </div>
            <div className="w-12 h-12 border-2 border-[#5d4037] flex items-center justify-center rounded-full text-[8px] font-bold rotate-12">
              SEALED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
