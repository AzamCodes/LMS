"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Chapter, MuxData } from "@prisma/client";
import MuxVideoPlayer from "@mux/mux-player-react";
import axios from "axios";
import { ImageIcon, PlusCircle, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

interface ChapterVideoFormProps {
  initialData: Chapter & {
    muxData?: MuxData | null;
  };
  chapterId: string;
  courseId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  chapterId,
  courseId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.loading("Uploading video...");

      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );

      toast.dismiss();
      toast.success("Chapter Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.dismiss();
      toast.error("Upload failed. Please try again.");

      console.error("Upload error:", error);
    }
  };
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Video
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              {initialData.videoUrl ? "Edit Video" : "Add a video"}
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxVideoPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
            onError={(error) => {
              toast.error("Upload failed. Please try again.");
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
