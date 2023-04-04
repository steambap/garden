import { hexSize } from "./constants";
import { IPoint, Hex, IHex, hexOrigin } from "./hex";

const innerSize = hexSize - 2;

function polygonInnerPoint(h: IHex) {
  const corners: IPoint[] = [];
  const center = Hex.toPixel(h);
  for (let i = 0; i < 6; i++) {
    const angle = (2.0 * Math.PI * (i + 0.5)) / 6.0;
    const x = Math.cos(angle) * innerSize + center.x;
    const y = Math.sin(angle) * innerSize + center.y;

    corners.push({ x, y });
  }

  return corners;
}

const corners = polygonInnerPoint(hexOrigin);
const points: string[] = [];
corners.forEach((point) => {
  points.push(`${point.x},${point.y}`);
});

interface props {
  className?: string;
}

export const InnerPolygon = ({ className = "", ...rest }: props) => {
  return (
    <polygon
      points={points.join(" ")}
      className={"stroke-gray-600 " + className}
      filter="url(#bevel)"
      {...rest}
    />
  );
};

export const BevelFilter = () => {
  return (
    <svg>
      <filter
        id="bevel"
        filterUnits="objectBoundingBox"
        x="-10%"
        y="-10%"
        width="150%"
        height="150%"
      >
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="blur" />
        <feSpecularLighting
          in="blur"
          surfaceScale="10"
          specularConstant="3.5"
          specularExponent="10"
          result="specOut"
          lightingColor="white"
        >
          <fePointLight x="-5000" y="-10000" z="0000" />
        </feSpecularLighting>
        <feComposite
          in="specOut"
          in2="SourceAlpha"
          operator="in"
          result="specOut2"
        />
        <feComposite
          in="SourceGraphic"
          in2="specOut2"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litPaint"
        />
      </filter>
    </svg>
  );
};
