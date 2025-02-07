
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type videoInfo = {
    title: string;
    duration: string;
    thumbnail: string;
    channel: string;

}