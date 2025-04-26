"use client";

import Link from "next/link";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-params";

const Home = () => {
  const [search] = useSearchParam();
  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.get, {search}, { initialNumItems: 5 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0f1c2e]/90 backdrop-blur-md shadow-md">
        <div className="p-4 max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-10 pb-10">
        {/* Welcome
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-300 mt-2 text-lg max-w-xl mx-auto">
            Explore templates and manage your documents in style.
          </p>
        </section> */}


        {/* Templates */}
        <section className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 mt-6">
          <h2 className="text-2xl font-semibold text-slate-300 mb-4">
            Templates Gallery
          </h2>
          <TemplatesGallery />
        </section>

        {/* Documents */}
        <section className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20">
          <h2 className="text-2xl font-semibold text-slate-300 mb-4">
            Your Documents
          </h2>
          <DocumentsTable
            documents={results}
            loadMore={loadMore}
            status={status}
          />
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-8 pb-6">
        © {new Date().getFullYear()} COdox. All rights reserved.
      </footer>
    </div>
  );
};

export default Home