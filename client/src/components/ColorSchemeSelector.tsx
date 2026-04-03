import { ColorSchemes } from "../data/dataAssets";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="mt-2">
      <label className="text-sm text-zinc-200 my-3">Color Scheme</label>
      <div className="grid grid-cols-6 gap-3 my-3">
        {ColorSchemes.map((scheme) => (
          <button
            key={scheme?.id}
            onClick={() => onChange(scheme.id)}
            className={`rounded-lg transition-all ${value === scheme.id && "ring-2 ring-orange-500"}`}
          >
            <div className="flex h-10 overflow-hidden rounded-lg">
              {scheme.colors.map((color, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: color }}
                  className="flex-1"
                />
              ))}
            </div>
          </button>
        ))}
      </div>
      <p>
        Selected: {ColorSchemes.find((scheme) => scheme.id === value)?.name}
      </p>
    </div>
  );
};

export default ColorSchemeSelector;
