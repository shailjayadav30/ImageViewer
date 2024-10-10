import { useState, useEffect, useRef } from "react";
import ImageViewer from "./component/ImageViewer";
import StatisticsChart from "./component/StatisticsChart";
import Controls from "./component/Controls";
import DataTable from "./component/Datatable";
import Card from "./component/Card";
import CardHeader from "./component/Cardheader";
import CardContent from "./component/Cardcontent";
import image from "./Images/wsi.png";

interface FindingData {
  category: string;
  count: number;
  percentage: number;
}

const findingsData: FindingData[] = [
  { category: "Atypical Cells", count: 20, percentage: 40 },
  { category: "Epithelial Components", count: 15, percentage: 30 },
  { category: "Red Cells", count: 10, percentage: 20 },
  { category: "Inflammatory", count: 5, percentage: 10 },
];

const otherData: FindingData[] = [
  { category: "WBC", count: 150, percentage: 75 },
  { category: "Research", count: 122, percentage: 61 },
  { category: "Education", count: 89, percentage: 44 },
  { category: "LiveImage", count: 2, percentage: 1 },
  { category: "Normal", count: 67, percentage: 33 },
];

export default function WholeSlideViewer() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<"split" | "full">("split");
  const [, setPosition] = useState({ x: 0, y: 0 });

  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date();
        timeRef.current.textContent = now.toLocaleTimeString();
      }
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handlePan = (newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
  };

  const onDownload = () => {
    const pdfUrl = "Sample.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this image!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-0">
          Whole Slide Image Viewer
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <span ref={timeRef} className="text-gray-600" />
          <select
            className="px-3 py-1 rounded border"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "split" | "full")}
          >
            <option value="split">Split View</option>
            <option value="full">Full View</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={viewMode === "full" ? "lg:col-span-2" : ""}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-lg font-semibold">Findings & Analysis</h2>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === "table"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setActiveTab("table")}
              >
                Table
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === "chart"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setActiveTab("chart")}
              >
                Chart
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === "table" ? (
              <DataTable findingsData={findingsData} otherData={otherData} />
            ) : (
              <StatisticsChart data={[...findingsData, ...otherData]} />
            )}
          </CardContent>
        </Card>

        <div className="space-y-4  ">
          <Controls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onRotate={handleRotate}
            onDownload={onDownload}
            onShare={onShare}
            onPrint={handlePrint}
            onPan={() => {}}
          />
          <ImageViewer
            src={image}
            initialZoomLevel={zoomLevel}
            initialRotation={rotation}
            onPan={handlePan}
          />
        </div>
      </div>
    </div>
  );
}
