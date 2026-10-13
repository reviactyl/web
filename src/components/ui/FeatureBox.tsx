import { ReactNode } from "react";

type FeatureBoxProps = {
    icon: ReactNode;
    text: string;
};

export const FeatureBox = ({ icon, text }: FeatureBoxProps) => (
    <div className="flex items-center gap-2 rounded-full border border-gray-50/10 bg-gray-900/60 px-4 py-2 backdrop-blur-md transition-colors duration-200 hover:border-gray-50/20 hover:bg-gray-800/60">
        <span className="text-gray-400">{icon}</span>
        <span className="text-sm font-medium text-gray-300">{text}</span>
    </div>
);
