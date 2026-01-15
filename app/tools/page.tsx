import { getProfileData } from "@/sanity/queries";
import { Code2, Wrench, Layout, Layers } from "lucide-react";

export default async function ToolsPage() {
  const { profile } = await getProfileData();

  // We organize the raw data from Sanity into the 4 categories shown in your design
  const toolCategories = [
    {
      title: "Language & Framework",
      items: profile.skillsLanguages,
      icon: <Code2 className="text-green-500" size={20} />, // Icon for visual flair
    },
    {
      title: "Tools & Systems",
      items: profile.skillsTools,
      icon: <Wrench className="text-green-500" size={20} />,
    },
    {
      title: "UI & UX",
      items: profile.skillsUiUx,
      icon: <Layout className="text-green-500" size={20} />,
    },
    {
      title: "Other",
      items: profile.skillsOther,
      icon: <Layers className="text-green-500" size={20} />,
    },
  ];

  return (
    <div className="px-3 pt-4 min-h-full flex justify-center">
       
       {/* Main Dashed Container */}
       <div className="flex-1 max-w-[700px] border-2 border-dashed border-primary/30 rounded-3xl p-3 md:p-8 relative bg-gradient-to-b from-transparent to-primary/5 flex flex-col gap-8">
          
          {/* Title */}
          <h1 className="text-3xl font-black text-black dark:text-white text-center tracking-wide border-b border-primary/20 pb-4 font-mono">
             My Tools
          </h1>

          {/* Grid Layout (Responsive: 1 col on mobile, 2 cols on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {toolCategories.map((cat, index) => (
              // Only render the card if there are items to show
              cat.items && cat.items.length > 0 && (
                <div 
                  key={index} 
                  className="bg-[#11112b] border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all shadow-xl flex flex-col"
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-3">
                    {cat.icon}
                    <h2 className="text-green-500 font-bold font-mono text-md tracking-wider">
                      {cat.title}
                    </h2>
                  </div>

                  {/* List of Tools */}
                  <ul className="space-y-2">
                    {cat.items.map((tool: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                        {/* Custom White Bullet Dot */}
                        <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                        {tool}
                      </li>
                    ))}
                  </ul>

                </div>
              )
            ))}

          </div>

       </div>
    </div>
  );
}