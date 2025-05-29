import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export default function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      className="object-cover"
    />
  </div>
);

const items = [
  {
    title: "Collaborative Culture",
    description:
      "At Tekarsh, we thrive in a culture of teamwork, transparency, and mutual respect.",
    header: <Skeleton src="/tek1.jpg" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Modern Workspaces",
    description:
      "Our open, well-equipped offices foster creativity and comfort.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Growth Opportunities",
    description:
      "We support your personal and professional growth through mentorship and learning.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Celebrations & Events",
    description:
      "From festive events to team outings, we celebrate every milestone together.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Innovation Driven",
    description:
      "Tekarsh encourages experimentation, new ideas, and product innovation.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Diversity & Inclusion",
    description:
      "We believe in building an inclusive workplace for all backgrounds.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Flexible Work-Life Balance",
    description:
      "Enjoy hybrid work options, wellness benefits, and time to recharge.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
