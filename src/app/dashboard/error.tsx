"use client";

type Props = {
  className?: string;
}

const Error = ({ className = "" }: Props) => {
  return (
    <section className={className}>Error</section>
  )
}

export default Error;