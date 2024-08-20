"use client";

import { useState } from "react";

function createRange<T>(
  length: number,
  initializer: (index: number) => T,
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

const getMockItems = () => {
  return createRange(4, (index) => ({ id: index + 1 }));
};

type Props = {};

const Homepage = ({}: Props) => {
  const [items, setItems] = useState(getMockItems);

  return <main className="min-h-screen w-8/12">Homepage</main>;
};

export default Homepage;
