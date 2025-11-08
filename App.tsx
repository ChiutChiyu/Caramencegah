
import React, { useState, useEffect } from 'react';
import { fetchPreventionData } from './services/geminiService';
import type { PreventionData, PreventionTip } from './types';
import { Header } from './components/Header';
import { ImpactCard } from './components/ImpactCard';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [preventionData, setPreventionData] = useState<PreventionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPreventionData();
        setPreventionData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Gagal memuat data: ${err.message}`);
        } else {
          setError('Terjadi kesalahan yang tidak diketahui.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-300 p-4 rounded-lg">
          <p className="font-bold">Terjadi Kesalahan</p>
          <p>{error}</p>
        </div>
      );
    }

    if (!preventionData || !preventionData.tipsPencegahan || preventionData.tipsPencegahan.length === 0) {
      return <div className="text-center text-gray-500">Tidak ada data untuk ditampilkan.</div>;
    }

    return (
      <section>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Langkah-langkah Praktis untuk Pencegahan
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {preventionData.tipsPencegahan.map((item: PreventionTip, index: number) => (
              <ImpactCard key={`tip-${index}`} title={item.judul} description={item.deskripsi} />
            ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <div className="mt-12">
          {renderContent()}
        </div>
        <footer className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          <p>2025 Informasi Edukasi. Konten dihasilkan oleh kelompok 1 untuk tujuan informasi.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
