import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
  faCouch,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

function ApartmentOverview({
  isLoading,
  error,
  property,
}: {
  isLoading: boolean;
  error: any;
  property: fetchPropertyDetails;
}) {
  const { i18n } = useTranslation();

  // Helper function to format numbers based on language
  const formatNumber = (value: any) => {
    if (!value) return value;
    return i18n.language === "ne" ? englishToNepaliNumber(value) : value;
  };

  const formatPrice = (price: number) => {
    const formattedPrice = Number(price).toLocaleString();
    return i18n.language === "ne"
      ? englishToNepaliNumber(formattedPrice)
      : formattedPrice;
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return i18n.language === "ne"
      ? englishToNepaliNumber(formattedDate)
      : formattedDate;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
  if (!property) return <div>No property data available.</div>;

  const features = [
    { label: "BHK", value: property.details.apartmentType, icon: faBed },
    {
      label: "Built Area",
      value: `${formatNumber(property.details?.builtInArea?.value)} ${
        property.details?.builtInArea?.unit
      }`,
      icon: faRulerCombined,
    },
    {
      label: "Floor",
      value: formatNumber(property.details.floors),
      icon: faArrowUpRightFromSquare,
    },
    {
      label: "Furnished Type",
      value: property.details.furnishing,
      icon: faCouch,
    },
    {
      label: "Built Year",
      value: formatNumber(property.details.builtYear),
      icon: faCalendarAlt,
    },
  ];

  const propertyDetails = [
    { label: "Apartment ID", value: formatNumber(property.propertyCode) },
    { label: "Property Face", value: property.details.facing },
    { label: "Total Floors", value: formatNumber(property.details.floors) },
    {
      label: "Total Area",
      value: `${formatNumber(property.details.landArea.value)} ${
        property.details.landArea.unit
      }`,
    },
    {
      label: "Built Up Area",
      value: `${formatNumber(property.details?.builtInArea?.value)} ${
        property.details?.builtInArea?.unit
      }`,
    },
    {
      label: "Date Posted",
      value: formatDate(property.createdAt),
    },
    {
      label: "Price",
      value: property.price ? `Rs ${formatPrice(property.price)}` : "N/A",
    },
    { label: "Status", value: property.status },
    { label: "Purpose", value: property.purpose },
    {
      label: "Road Access",
      value: `${formatNumber(property.details.frontage.value)} ${
        property.details.frontage.unit
      }`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h2 className="font-medium text-lg">Overview</h2>
          <h2>
            <span className="font-semibold">Apartment ID:</span>{" "}
            {formatNumber(property.propertyCode)}
          </h2>
        </div>

        <div className="flex flex-wrap gap-6">
          {features.map((item, index) => (
            <div key={item.label} className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 text-gray-500">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: "#74C0FC" }}
                  />
                  <p className="font-semibold text-black">{item.value}</p>
                </div>
                <p className="text-sm">{item.label}</p>
              </div>
              {index < features.length - 1 && (
                <div className="h-10 border-r border-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-medium py-4">Description</h2>
        <p className="text-gray-500 font-light">
          {property.details.description.en || "No description available."}
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
        <h2 className="font-medium py-4">Apartment Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
          {propertyDetails.map((item, index) => (
            <div key={index} className="grid grid-cols-2">
              <p className="text-gray-400  pr-2">{item.label}</p>
              <p className="">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApartmentOverview;
