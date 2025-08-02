import React from "react";

const truncate = (value, max = 50) => {
  if (typeof value !== "string") return value;
  return value.length > max ? value.slice(0, max) + "..." : value;
};

const formatDate = (value) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const DynamicTable = ({ data = [], columns, actions }) => {
  if (!data.length) return <p>No data found.</p>;

  const keys = columns || Object.keys(data[0]).filter(k => k !== "__v");

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {keys.map((key) => (
              <th key={key} className="py-3 px-4 border-b capitalize">{key}</th>
            ))}
            {actions && <th className="py-3 px-4 border-b">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id || row.id} className="border-t hover:bg-gray-50">
              {keys.map((key) => {
                let value = row[key];
                if (typeof value === "object" && value !== null) {
                  value = value.name || JSON.stringify(value);
                }

                // Truncate id fields
                if (typeof value === "string" && key.toLowerCase().includes("id")) {
                  value = value.length > 8 ? value.slice(0, 8) + "..." : value;
                }

                // Format date fields
                if (typeof value === "string" && (key.toLowerCase().includes("createdat") || key.toLowerCase().includes("date"))) {
                  value = formatDate(value);
                }

                const displayValue = typeof value === "string" && value.length > 50
                  ? (
                      <span title={value}>
                        {truncate(value)}
                      </span>
                    )
                  : value;

                return (
                  <td key={key} className="py-3 px-4">
                    {displayValue}
                  </td>
                );
              })}
              {actions && (
                <td className="py-3 px-4">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;