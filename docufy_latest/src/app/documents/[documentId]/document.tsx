// import { Editor } from "./editor";
// import { Navbar } from "./navbar";
// import { Toolbar } from "./toolbar";

// interface DocumentIdPageProps {
//     params: Promise<{ documentId: string }>;
// };


// const DocumentsIdPage = async ({ params }: DocumentIdPageProps) =>{
//     // const {documentId} = await params;
//     await params;
//     return(
//         <div className="min-h-screen bg-[#FAFBFD]">
//             <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
//                 <Navbar />
//                 <Toolbar />
//             </div>
//             <div className="pt-[114px] print:pt-0">
//                 <Editor />
//             </div>
//         </div>
//     );
// }

// export default DocumentsIdPage;
"use client";

import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { Room } from "./room";
import { api } from "../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

 export const Document= ({ preloadedDocument }: DocumentProps) => {
    const document = usePreloadedQuery(preloadedDocument);


  return (
    <Room>
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Navbar + Toolbar (sticky top) */}
      <div className="flex flex-col px-4 pt-3 gap-y-2 fixed top-0 left-0 right-0 z-50 shadow-md border-b border-white/10 print:hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <Navbar data={document}/>
        <Toolbar />
      </div>

      {/* Editor section */}
      <div className="pt-[112px] px-2 sm:px-4 lg:px-6 max-w-9xl mx-auto print:pt-0 pb-2">
        <div className="bg-white/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-white/10 shadow-md min-h-[75vh] mt-4 w-full ">
          <Editor />
        </div>
      </div>
    </div>
    </Room>
  );
};



