import { useCallback, useEffect, useRef, useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import type { IAspectRatio, IThumbnail } from "../data/dataAssets";
import ThumbnailCard from "../components/ThumbnailCard";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { IStore } from "../types/types";
import api from "../configs/api";
import { pushThumbnail } from "../utils/thumbnailListSlice";

const MyGenerations = () => {
  const user = useSelector((store: IStore) => store.user);

  const {
    items: thumbnailList,
    page,
    hasMore,
  } = useSelector((store: IStore) => store.thumbnailList);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const AspectRatioClass: Record<IAspectRatio, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const fetchThumbnails = useCallback(async () => {
    if (fetchingRef.current || !hasMore) return;

    fetchingRef.current = true;
    setLoading(true);

    try {
      const { data } = await api.get(`/user/thumbnails?page=${page}&limit=15`);

      const curList = {
        data: data.data,
        hasMore: data.hasMore,
      };

      dispatch(pushThumbnail(curList));
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to load thumbnails. Please try again.");
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [hasMore, page, dispatch, showToast]);

  useEffect(() => {
    if (thumbnailList.length === 0) fetchThumbnails();
  }, []);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          fetchThumbnails();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchThumbnails, hasMore]);

  return (
    <>
      <SoftBackdrop />
      <div className="mt-29 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-zinc-200 text-2xl font-bold">My Generations</h1>
          <p className="text-zinc-400 text-sm mt-1">
            View or manage your AI-generated thumbnails
          </p>
        </div>
        {loading && (
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/8 border-white/12 rounded-2xl p-4 h-52"
              />
            ))}
          </div>
        )}

        {!loading && thumbnailList.length < 1 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <h3 className="font-bold text-zinc-200 text-lg">
              No thumbnails yet
            </h3>
            <p className="text-zinc-400 text-sm mt-2">
              You haven't generated any thumbnails yet. Start creating to see
              them here.
            </p>
          </div>
        )}

        {thumbnailList.length > 0 && (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {thumbnailList.map((thumb: IThumbnail) => (
              <div
                key={thumb._id}
                onClick={() => navigate(`/generate/${thumb._id}`)}
                className="cursor-pointer"
              >
                <ThumbnailCard
                  thumbnail={thumb}
                  aspectRatio={
                    AspectRatioClass[thumb.aspectRatio as IAspectRatio]
                  }
                />
              </div>
            ))}
            <div
              ref={observerRef}
              className="h-10 flex items-center justify-center col-span-full"
            >
              {loading && (
                <p className="text-center text-zinc-400">Loading more...</p>
              )}
              {!hasMore && (
                <p className="text-center text-zinc-400">No more thumbnails</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyGenerations;
