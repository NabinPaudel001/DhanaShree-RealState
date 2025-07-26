import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBed,
  faBath,
  faRulerCombined,
  faCalendarAlt,
  faArrowUpRightFromSquare,
  faMapMarkerAlt,
  faRoad,
  faS,
  faStairs,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber } from "@/utils/numberUtils";

export default function SpaceOverview({
  property,
  isLoading,
  error,
}: {
  property: any;
  isLoading: boolean;
  error: any;
}) {
  const { i18n } = useTranslation();

  // Helper function to format numbers based on language
  const formatNumber = (value: any) => {
    if (!value) return value;
    return i18n.language === "ne" ? englishToNepaliNumber(value) : value;
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString();
    return i18n.language === "ne"
      ? englishToNepaliNumber(formattedPrice)
      : formattedPrice;
  };

  const features = [
    {
      label: "Area",
      value: `${formatNumber(property.details.landArea.value)}${
        property.details.landArea.unit
      }`,
      icon: faRulerCombined,
    },
    {
      label: "Frontage",
      value: `${formatNumber(property.details.frontage.value)}${
        property.details.frontage.unit
      }`,
      icon: faRoad,
    },
    {
      label: "Floor Number",
      value: formatNumber(property.details.floors),
      icon: faStairs,
    },
    {
      label: "Built Year",
      value: formatNumber(property.details.builtYear),
      icon: faCalendarAlt,
    },
  ];

  const propertyDetails = [
    { label: "Space ID", value: formatNumber(property.propertyCode) },
    { label: "Facing", value: property.details.facing },
    { label: "Purpose", value: property.purpose },
    { label: "Floor", value: formatNumber(property.details.floors) },
    {
      label: "Access Road",
      value: `${formatNumber(property.details.frontage.value)} ${
        property.details.frontage.unit
      }`,
    },
    {
      label: "Total Area",
      value: `${formatNumber(property.details.landArea.value)} ${
        property.details.landArea.unit
      }`,
    },
    { label: "Rent/Month", value: `Rs ${formatPrice(property.price)}` },
    { label: "Date Listed", value: "२०२५-०५-०१" }, // Static date in Nepali if needed
    { label: "Status", value: property.status ? "Available" : "Not Available" },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between py-6">
          <h1 className="font-medium">Overview</h1>
          <h1>
            <span className="font-semibold">Space ID:</span> [
            {formatNumber(property.propertyCode)}]
          </h1>
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
        <h1 className="font-medium py-4">Description</h1>
        <p className="text-gray-500 font-light">
          Well-maintained commercial space in a prime location with modern
          amenities.
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-sky-100 p-4 rounded-lg shadow">
        <h1 className="font-medium py-4">Space Details</h1>
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
