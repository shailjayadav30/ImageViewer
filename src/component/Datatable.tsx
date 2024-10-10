import React from "react";

interface DataItem {
  category: string;
  count: number;
  percentage: number;
}

interface DataTableProps {
  findingsData: DataItem[];
  otherData: DataItem[];
}

const DataTable: React.FC<DataTableProps> = ({ findingsData, otherData }) => {
  const combinedData = [...findingsData, ...otherData];

  if (combinedData.length === 0) {
    return <p className="text-gray-500">No data available</p>;
  }

  return (
    <div className="space-y-6 mt-14">
      <table className="w-full" aria-label="Data Table">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left py-2 px-3" scope="col">
              Category
            </th>
            <th className="text-right py-2 px-3" scope="col">
              Count
            </th>
            <th className="text-right py-2 px-3" scope="col">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-3">{item.category}</td>
              <td className="text-right py-2 px-3">{item.count}</td>
              <td className="text-right py-2 px-3">{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
