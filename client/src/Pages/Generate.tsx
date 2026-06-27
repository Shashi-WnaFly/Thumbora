import { useEffect, useMemo, useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { useNavigate, useParams } from "react-router-dom";
import AspectRatioSelector from "../components/AspectRatioSelector";
import type {
  IAspectRatio,
  IThumbnailStyle,
  IThumbnail,
} from "../data/dataAssets";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useDispatch, useSelector } from "react-redux";
import type { IStore } from "../types/types";
import api from "../configs/api";
import useToast from "../hooks/useToast";
import { unShiftThumbnail } from "../utils/thumbnailListSlice";

const Generate = () => {
  const { thumbId } = useParams<string>();
  const user = useSelector((store: IStore) => store.user);
  const thumbnailList = useSelector((store: IStore) => store.thumbnailList);

  const curThumbnail = useMemo(
    () => thumbnailList.find((t) => t._id === thumbId),
    [thumbId, thumbnailList],
  );

  const thumbnail: IThumbnail | null = curThumbnail || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(curThumbnail?.title || "");
  const [aspectRatio, setAspectRatio] = useState<IAspectRatio>(
    curThumbnail?.aspectRatio || "16:9",
  );
  const [style, setStyle] = useState<IThumbnailStyle>(
    (curThumbnail?.style as IThumbnailStyle) || "Bold & Graphic",
  );
  const [colorScheme, setColorScheme] = useState<string>(
    curThumbnail?.colorScheme || "vibrant",
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<string>(
    curThumbnail?.userPrompt || "",
  );
  const [loading, setLoading] = useState<boolean>(
    curThumbnail?.isGenerating || false,
  );
  const { showToast } = useToast();

  useEffect(() => {
    if (!user) navigate(`/login`);
  }, [user, navigate]);

  const fetchThumbnail = async () => {
    try {
      if (loading) return;
      if (!title.trim()) {
        showToast("warning", "Fill the title fields!!");
        return;
      }

      setLoading(true);

      const { data } = await api.post(`/user/generate/thumbnail`, {
        title,
        prompt: additionalInfo,
        style,
        aspectRatio,
        colorScheme,
        textOverlay: true,
      });

      if (!data.success) throw new Error(data.message);

      dispatch(unShiftThumbnail(data.data));
      navigate(`/generate/${data.data._id}`);
    } catch (error) {
      console.error(error);
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to generate thumbnail",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-19 min-h-screen">
      <SoftBackdrop />
      <main className="pt-16 max-w-7xl mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* left panel */}
          <div className={`${thumbId && "pointer-events-none"} space-y-6`}>
            <div className="bg-white/8 border-white/12 rounded-2xl p-6 space-y-2">
              <div>
                <h1 className=" text-zinc-100 font-semibold text-xl">
                  Generate Your Thumbnails
                </h1>
                <p className="text-zinc-400 text-sm">
                  Describe your vision and let AI bring it to life
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title or Topic
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="description"
                  id="title"
                  className="block w-full rounded-md outline-0 border border-zinc-600 shadow-sm focus:ring-2 focus:ring-orange-700 p-2 sm:text-sm bg-transparent text-zinc-400"
                  placeholder="e.g., 'How to Make a Perfect Cup of Coffee'"
                  maxLength={100}
                />
                <span className="block pt-2 text-zinc-400 text-right text-sm">
                  {title.length}/100
                </span>
              </div>
              {/* AspactRatioSelector */}
              <AspectRatioSelector
                value={aspectRatio}
                onChange={setAspectRatio}
              />
              {/* {StyleSelector} */}
              <StyleSelector
                value={style}
                onChange={setStyle}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
              {/* ColorSchemeSelector */}
              <ColorSchemeSelector
                value={colorScheme}
                onChange={setColorScheme}
              />
              <div>
                <label className="text-sm text-zinc-200">
                  Additional Details{" "}
                  <span className="text-zinc-400">(optional)</span>
                </label>
                <textarea
                  id="additionalInfo"
                  rows={3}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="block w-full rounded-lg outline-0 border border-zinc-600 resize-none shadow-sm focus:ring-2 focus:ring-orange-700 p-2 sm:text-sm bg-transparent text-zinc-300 mt-1"
                  placeholder="e.g., 'Include a steaming coffee cup and beans in the background'"
                  maxLength={200}
                ></textarea>
              </div>
              {!thumbId && (
                <button
                  className="w-full text-[15px] py-3.5 rounded-xl font-medium bg-linear-to-b from-orange-500 to-orange-600 hover:from-orange-700 disabled:cursor-not-allowed transition-colors"
                  onClick={() => fetchThumbnail()}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Thumbnails"}
                </button>
              )}
            </div>
          </div>
          {/* right panel */}
          <div>
            <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
              <h2 className="text-lg font-semibold text-zinc-100">Preview</h2>
              <PreviewPanel
                thumbnail={
                  {
                    title: thumbnail?.title,
                    imageUrl: thumbnail?.imageUrl,
                  } as IThumbnail
                }
                isLoading={loading}
                aspectRatio={aspectRatio}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generate;
