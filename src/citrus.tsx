import { PieceColor, getFillClass, getStrokeClass } from "./piece";

interface props {
  color: PieceColor;
}

const Citrus = ({ color }: props) => {
  if (color === "glade") {
    return null;
  }
  const stroke = getStrokeClass(color);
  const fill = getFillClass(color);
  const count = Number(color.charAt(1));
  if (count === 1) {
    return (
      <g transform="translate(-33,-33) scale(2)">
        <path
          className={`stroke-1 ${stroke} fill-transparent`}
          d="M22 16.5C22 19.5 19.5 22 16.5 22S11 19.5 11 16.5 13.5 11 16.5 11 22 13.5 22 16.5Z"
        />
        <path
          className={`${fill}`}
          d="M13.3 18L15.6 16.5L13.3 15C13.1 15.5 13 16 13 16.5S13.1 17.5 13.3 18Z"
        />
        <path
          className={`${fill}`}
          d="M16 17.4L13.9 18.8C14.4 19.4 15.2 19.8 16 20V17.4Z"
        />
        <path
          className={`${fill}`}
          d="M16 13.1C15.2 13.2 14.4 13.6 13.9 14.3L16 15.7V13.1Z"
        />
        <path
          className={`${fill}`}
          d="M17 15.6L19.1 14.2C18.6 13.6 17.8 13.2 17 13V15.6Z"
        />
        <path
          className={`${fill}`}
          d="M19.1 18.8L17 17.4V19.9C17.8 19.8 18.6 19.4 19.1 18.8Z"
        />
        <path
          className={`${fill}`}
          d="M20 16.5C20 16 19.9 15.5 19.7 15L17.4 16.5L19.7 18C19.9 17.5 20 17 20 16.5Z"
        />
      </g>
    );
  }

  return (
    <g transform="translate(-22,-22)">
      <g>
        <path
          className={`stroke-1 ${stroke} fill-transparent`}
          d="M22 16.5C22 19.5 19.5 22 16.5 22S11 19.5 11 16.5 13.5 11 16.5 11 22 13.5 22 16.5Z"
        />
        <path
          className={`${fill}`}
          d="M13.3 18L15.6 16.5L13.3 15C13.1 15.5 13 16 13 16.5S13.1 17.5 13.3 18Z"
        />
        <path
          className={`${fill}`}
          d="M16 17.4L13.9 18.8C14.4 19.4 15.2 19.8 16 20V17.4Z"
        />
        <path
          className={`${fill}`}
          d="M16 13.1C15.2 13.2 14.4 13.6 13.9 14.3L16 15.7V13.1Z"
        />
        <path
          className={`${fill}`}
          d="M17 15.6L19.1 14.2C18.6 13.6 17.8 13.2 17 13V15.6Z"
        />
        <path
          className={`${fill}`}
          d="M19.1 18.8L17 17.4V19.9C17.8 19.8 18.6 19.4 19.1 18.8Z"
        />
        <path
          className={`${fill}`}
          d="M20 16.5C20 16 19.9 15.5 19.7 15L17.4 16.5L19.7 18C19.9 17.5 20 17 20 16.5Z"
        />
      </g>
      <g transform="translate(11,11)">
        <path
          className={`stroke-1 ${stroke} fill-transparent`}
          d="M22 16.5C22 19.5 19.5 22 16.5 22S11 19.5 11 16.5 13.5 11 16.5 11 22 13.5 22 16.5Z"
        />
        <path
          className={`${fill}`}
          d="M13.3 18L15.6 16.5L13.3 15C13.1 15.5 13 16 13 16.5S13.1 17.5 13.3 18Z"
        />
        <path
          className={`${fill}`}
          d="M16 17.4L13.9 18.8C14.4 19.4 15.2 19.8 16 20V17.4Z"
        />
        <path
          className={`${fill}`}
          d="M16 13.1C15.2 13.2 14.4 13.6 13.9 14.3L16 15.7V13.1Z"
        />
        <path
          className={`${fill}`}
          d="M17 15.6L19.1 14.2C18.6 13.6 17.8 13.2 17 13V15.6Z"
        />
        <path
          className={`${fill}`}
          d="M19.1 18.8L17 17.4V19.9C17.8 19.8 18.6 19.4 19.1 18.8Z"
        />
        <path
          className={`${fill}`}
          d="M20 16.5C20 16 19.9 15.5 19.7 15L17.4 16.5L19.7 18C19.9 17.5 20 17 20 16.5Z"
        />
      </g>
    </g>
  );
};

export default Citrus;
