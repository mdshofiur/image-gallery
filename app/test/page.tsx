"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageCard({ imageUrl, title, description }: any) {
  return (
    <div className="w-full h-full border border-red-500 bg-white rounded-md relative group">
      <Image
        width={200}
        height={200}
        src={imageUrl}
        className="w-full h-full object-cover object-center rounded-md"
        alt="image"
      />

      <div
        className=" 
         bg-custom transition-opacity
        duration-500 ease-in-out "
      >
        <input
          type="checkbox"
          className="w-5 h-5"
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen py-10">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <ImageCard
            imageUrl="https://via.placeholder.com/300"
            title="Card 1"
            description="This is the first image card."
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <ImageCard
            imageUrl="https://via.placeholder.com/300"
            title="Card 2"
            description="This is the second image card."
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <ImageCard
            imageUrl="https://via.placeholder.com/300"
            title="Card 3"
            description="This is the third image card."
          />
        </div>
      </div>
    </main>
  );
}
