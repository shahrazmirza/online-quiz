"use client";
import Link from "next/link";

export default function Home() {
  const options = [{ name: "Python Quiz", link: "/python" }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Select from the following:
      </h1>
      <div className="w-fit max-w-md grid grid-cols-1 gap-6 font-semibold">
        {options.map((option) => (
          <Link
            key={option.link}
            href={option.link}
            className="block bg-white p-6 text-center rounded-lg shadow-lg hover:bg-blue-50 transition duration-300"
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
