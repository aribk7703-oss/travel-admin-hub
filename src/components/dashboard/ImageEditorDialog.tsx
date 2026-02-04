import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop as CropIcon,
  Maximize2,
  Save,
} from "lucide-react";

interface ImageEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  imageName: string;
  onSave: (editedImageUrl: string) => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageEditorDialog = ({
  open,
  onOpenChange,
  imageUrl,
  imageName,
  onSave,
}: ImageEditorDialogProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [scale, setScale] = useState(100);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("crop");

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    setOriginalWidth(naturalWidth);
    setOriginalHeight(naturalHeight);
    setWidth(naturalWidth);
    setHeight(naturalHeight);
    
    if (aspectRatio) {
      const newCrop = centerAspectCrop(width, height, aspectRatio);
      setCrop(newCrop);
    }
  }, [aspectRatio]);

  const rotateLeft = () => setRotation((r) => (r - 90) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);
  const toggleFlipH = () => setFlipH((f) => !f);
  const toggleFlipV = () => setFlipV((f) => !f);

  const setAspect = (aspect: number | undefined) => {
    setAspectRatio(aspect);
    if (aspect && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      setCrop(undefined);
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (aspectRatio) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (aspectRatio) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const applyEdits = async () => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Determine output dimensions
    let outputWidth = width || originalWidth;
    let outputHeight = height || originalHeight;

    // If we have a completed crop, use crop dimensions
    if (completedCrop && completedCrop.width && completedCrop.height) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      outputWidth = Math.round(completedCrop.width * scaleX);
      outputHeight = Math.round(completedCrop.height * scaleY);
    }

    // Swap dimensions if rotated 90 or 270 degrees
    if (rotation === 90 || rotation === -270 || rotation === 270 || rotation === -90) {
      [outputWidth, outputHeight] = [outputHeight, outputWidth];
    }

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.save();
    
    // Move to center of canvas
    ctx.translate(outputWidth / 2, outputHeight / 2);
    
    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);
    
    // Apply flips
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Calculate source and destination
    let sx = 0, sy = 0, sWidth = image.naturalWidth, sHeight = image.naturalHeight;
    
    if (completedCrop && completedCrop.width && completedCrop.height) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      sx = completedCrop.x * scaleX;
      sy = completedCrop.y * scaleY;
      sWidth = completedCrop.width * scaleX;
      sHeight = completedCrop.height * scaleY;
    }

    // Swap back for drawing if rotated
    let drawWidth = outputWidth;
    let drawHeight = outputHeight;
    if (rotation === 90 || rotation === -270 || rotation === 270 || rotation === -90) {
      [drawWidth, drawHeight] = [drawHeight, drawWidth];
    }

    ctx.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );

    ctx.restore();

    // Convert to data URL
    const editedImageUrl = canvas.toDataURL("image/png");
    onSave(editedImageUrl);
    onOpenChange(false);
    
    // Reset state
    resetEditor();
  };

  const resetEditor = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setScale(100);
    setAspectRatio(undefined);
    setWidth(originalWidth);
    setHeight(originalHeight);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Image: {imageName}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="crop">
              <CropIcon className="mr-2 h-4 w-4" />
              Crop
            </TabsTrigger>
            <TabsTrigger value="rotate">
              <RotateCw className="mr-2 h-4 w-4" />
              Rotate & Flip
            </TabsTrigger>
            <TabsTrigger value="resize">
              <Maximize2 className="mr-2 h-4 w-4" />
              Resize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crop" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={aspectRatio === undefined ? "default" : "outline"}
                size="sm"
                onClick={() => setAspect(undefined)}
              >
                Free
              </Button>
              <Button
                variant={aspectRatio === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setAspect(1)}
              >
                1:1
              </Button>
              <Button
                variant={aspectRatio === 16 / 9 ? "default" : "outline"}
                size="sm"
                onClick={() => setAspect(16 / 9)}
              >
                16:9
              </Button>
              <Button
                variant={aspectRatio === 4 / 3 ? "default" : "outline"}
                size="sm"
                onClick={() => setAspect(4 / 3)}
              >
                4:3
              </Button>
              <Button
                variant={aspectRatio === 3 / 2 ? "default" : "outline"}
                size="sm"
                onClick={() => setAspect(3 / 2)}
              >
                3:2
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="rotate" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={rotateLeft}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={rotateRight}>
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={flipH ? "default" : "outline"}
                  size="icon"
                  onClick={toggleFlipH}
                >
                  <FlipHorizontal className="h-4 w-4" />
                </Button>
                <Button
                  variant={flipV ? "default" : "outline"}
                  size="icon"
                  onClick={toggleFlipV}
                >
                  <FlipVertical className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                Rotation: {rotation}°
              </span>
            </div>
          </TabsContent>

          <TabsContent value="resize" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Scale: {scale}%</Label>
              <Slider
                value={[scale]}
                onValueChange={([v]) => {
                  setScale(v);
                  setWidth(Math.round(originalWidth * (v / 100)));
                  setHeight(Math.round(originalHeight * (v / 100)));
                }}
                min={10}
                max={200}
                step={1}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Original size: {originalWidth} × {originalHeight}px
            </p>
          </TabsContent>
        </Tabs>

        {/* Image Preview */}
        <div className="flex items-center justify-center bg-muted rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-hidden">
          <div
            style={{
              transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
              transition: "transform 0.2s ease",
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Edit preview"
                onLoad={onImageLoad}
                style={{ maxHeight: "350px", maxWidth: "100%" }}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />

        <DialogFooter>
          <Button variant="outline" onClick={resetEditor}>
            Reset
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={applyEdits}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
