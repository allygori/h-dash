type Props = {
  className?: string;
}

const Loading = ({ className = "" }: Props) => {
  return (
    <section className={className}>Loading</section>
  )
}

export default Loading;