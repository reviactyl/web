import Image from 'next/image';

export function Reviactyl() {
  return (
    <Image
      src="/icon.png"
      alt="Reviactyl"
      width={64}
      height={64}
      priority
    />
  );
}

export function Blueprint() {
  return (
    <Image
      src="/bpfw.png"
      alt="Blueprint"
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
