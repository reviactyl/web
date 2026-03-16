import Image from 'next/image';

export function Reviactyl() {
  return (
    <Image
      src="/rcyl.png"
      alt="Reviactyl"
      width={64}
      height={64}
      priority
    />
  );
}

export function Development() {
  return (
    <Image
      src="/dev.png"
      alt="Development"
      width={64}
      height={64}
      priority
    />
  );
}
