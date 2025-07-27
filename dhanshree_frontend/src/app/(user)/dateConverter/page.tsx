"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRightLeft, CalendarDays } from "lucide-react";
import ConverterHeader from "@/components/ConverterHeader";
import NepaliDate from "nepali-date-converter";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css"; 


const englishToNepali = (englishDate: string) => {
  try {
    if (!englishDate) return "";

    const jsDate = new Date(englishDate);

    // Create NepaliDate from JavaScript Date
    const nepaliDate = NepaliDate.fromAD(jsDate);

    const year = nepaliDate.getYear();
    const month = nepaliDate.getMonth() + 1; // Add 1 because getMonth() returns 0-based index
    const day = nepaliDate.getDate();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error("Error converting English to Nepali date:", error);
    return "";
  }
};

const nepaliToEnglish = (nepaliDate: string) => {
  try {
    if (!nepaliDate) return "";

    // Parse the Nepali date string (YYYY-MM-DD)
    const [year, month, day] = nepaliDate.split("-").map(Number);

    if (
      !year ||
      !month ||
      !day ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 32
    ) {
      return "";
    }

    const nepDate = new NepaliDate(year, month - 1, day); // Subtract 1 because constructor expects 0-based month

    const jsDate = nepDate.toJsDate();

    return jsDate.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error converting Nepali to English date:", error);
    return "";
  }
};

const getCurrentNepaliDate = () => {
  try {
    const today = new Date();
    const nepaliDate = NepaliDate.fromAD(today);
    const year = nepaliDate.getYear();
    const month = nepaliDate.getMonth() + 1; // Add 1 for proper month display
    const day = nepaliDate.getDate();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error("Error getting current Nepali date:", error);
    return "";
  }
};

export default function DateConverter() {
  const [englishDate, setEnglishDate] = useState("");
  const [nepaliDate, setNepaliDate] = useState("");
  const [convertedEnglishDate, setConvertedEnglishDate] = useState("");
  const [convertedNepaliDate, setConvertedNepaliDate] = useState("");

  const handleEnglishDateChange = (value: string) => {
    setEnglishDate(value);
    const converted = englishToNepali(value);
    setConvertedNepaliDate(converted);
  };

  const handleNepaliDateChange = (value: string) => {
    setNepaliDate(value);
    const converted = nepaliToEnglish(value);
    setConvertedEnglishDate(converted);
  };

  const handleNepaliPickerChange = (value: string) => {
    setNepaliDate(value);
    const converted = nepaliToEnglish(value);
    setConvertedEnglishDate(converted);
  };

  const getCurrentDates = () => {
    const today = new Date().toISOString().split("T")[0];
    setEnglishDate(today);
    const converted = englishToNepali(today);
    setConvertedNepaliDate(converted);
  };

  const getTodaysNepaliDate = () => {
    const todayNepali = getCurrentNepaliDate();
    setNepaliDate(todayNepali);
    const converted = nepaliToEnglish(todayNepali);
    setConvertedEnglishDate(converted);
  };

  useEffect(() => {
    getCurrentDates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ConverterHeader
        title="Date Converter"
        description="Convert dates between English (Gregorian) and Nepali (Bikram Sambat) calendars with ease"
        icon={<Calendar className="h-8 w-8 text-white" />}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* English to Nepali */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <CalendarDays className="h-6 w-6" />
                English to Nepali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="english-date"
                  className="text-sm font-medium text-gray-700"
                >
                  English Date (AD)
                </Label>
                <Input
                  id="english-date"
                  type="date"
                  value={englishDate}
                  onChange={(e) => handleEnglishDateChange(e.target.value)}
                  className="w-full h-12 text-lg border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="flex justify-center">
                <ArrowRightLeft className="h-8 w-8 text-sky-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Nepali Date (BS)
                </Label>
                <div className="w-full h-12 bg-sky-50 border-2 border-sky-200 rounded-lg flex items-center px-4">
                  <span className="text-lg font-semibold text-sky-700">
                    {convertedNepaliDate || "Select English date"}
                  </span>
                </div>
              </div>

              <Button
                onClick={getCurrentDates}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white h-12 text-lg font-medium"
              >
                Use Today's Date
              </Button>
            </CardContent>
          </Card>

          {/* Nepali to English */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <Calendar className="h-6 w-6" />
                Nepali to English
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="nepali-date"
                  className="text-sm font-medium text-gray-700"
                >
                  Nepali Date (BS)
                </Label>

                {/* Nepali Date Picker */}
                <div className="w-full">
                  <NepaliDatePicker
                    inputClassName=" border w-full h-12 text-lg border-2 border-gray-200 focus:border-sky-500 rounded-lg px-4"
                    className="w-full"
                    value={nepaliDate}
                    onChange={handleNepaliPickerChange}
                    options={{
                      calenderLocale: "ne",
                      valueLocale: "en",
                    }}
                  />
                </div>

                {/* Alternative manual input */}
                {/* <div className="text-xs text-gray-500 mt-1">
                  Or enter manually:
                </div>
                <Input
                  id="nepali-date-manual"
                  type="text"
                  placeholder="YYYY-MM-DD (e.g., 2082-04-10)"
                  value={nepaliDate}
                  onChange={(e) => handleNepaliDateChange(e.target.value)}
                  className="w-full h-10 text-sm border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                /> */}
              </div>

              <div className="flex justify-center">
                <ArrowRightLeft className="h-8 w-8 text-sky-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  English Date (AD)
                </Label>
                <div className="w-full h-12 bg-sky-50 border-2 border-sky-200 rounded-lg flex items-center px-4">
                  <span className="text-lg font-semibold text-sky-700">
                    {convertedEnglishDate || "Enter Nepali date"}
                  </span>
                </div>
              </div>

              <Button
                onClick={getTodaysNepaliDate}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white h-12 text-lg font-medium"
              >
                Use Today's Nepali Date
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-12 shadow-lg pt-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 h-16">
            <CardTitle className="text-gray-800 w-full h-full">
              About Date Conversion
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  English Calendar (AD)
                </h4>
                <p className="text-gray-600 text-sm">
                  The Gregorian calendar is internationally accepted and widely
                  used for official purposes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Nepali Calendar (BS)
                </h4>
                <p className="text-gray-600 text-sm">
                  Bikram Sambat is the official calendar of Nepal, approximately
                  57 years ahead of AD.
                </p>
              </div>
            </div>

            {/* Debug information */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">
                Current Date Info:
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  Today's English Date: {new Date().toLocaleDateString()}
                </div>
                <div>Today's Nepali Date: {getCurrentNepaliDate()}</div>
                <div>Selected English: {englishDate}</div>
                <div>Converted Nepali: {convertedNepaliDate}</div>
                <div>Selected Nepali: {nepaliDate}</div>
                <div>Converted English: {convertedEnglishDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
