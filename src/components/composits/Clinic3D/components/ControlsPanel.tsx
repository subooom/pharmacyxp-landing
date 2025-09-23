import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { PRESETS } from "../presets";
import { BuilderPreset, PresetKey, RoomConfig } from "../types";
import { TimeOfDay } from "./DayNightCycle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface ControlPanelProps {
  // Preset
  presetKey: PresetKey;
  setPresetKey: React.Dispatch<React.SetStateAction<PresetKey>>;

  // Wall
  wallColor: string;
  setWallColor: React.Dispatch<React.SetStateAction<string>>;

  // Floor
  floorTheme: BuilderPreset["room"]["floor"]["theme"];
  setFloorTheme: React.Dispatch<
    React.SetStateAction<BuilderPreset["room"]["floor"]["theme"]>
  >;

  // Room
  roomDims: RoomConfig;
  setRoomDims: React.Dispatch<React.SetStateAction<RoomConfig>>;

  // Racks
  newRackName: string;
  setNewRackName: React.Dispatch<React.SetStateAction<string>>;

  newRackColumns: number;
  setNewRackColumns: React.Dispatch<React.SetStateAction<number>>;

  newRackRows: number;
  setNewRackRows: React.Dispatch<React.SetStateAction<number>>;

  handleAddRack: () => void;

  selectedRack: number | null;
  handleDeleteRack: () => void;

  // New time of day prop
  timeOfDay: TimeOfDay;
  setTimeOfDay: React.Dispatch<React.SetStateAction<TimeOfDay>>;
}

function ControlsPanel({
  presetKey,
  setPresetKey,
  wallColor,
  setWallColor,
  floorTheme,
  setFloorTheme,
  roomDims,
  setRoomDims,
  newRackName,
  newRackColumns,
  setNewRackName,
  setNewRackColumns,
  setNewRackRows,
  newRackRows,
  handleAddRack,
  selectedRack,
  handleDeleteRack,
  timeOfDay,
  setTimeOfDay,
}: ControlPanelProps) {
  const timeOptions: TimeOfDay[] = [
    "auto",
    "morning",
    "day",
    "evening",
    "night",
  ];

  return (
    <Card className="w-min-content bg-background/80 backdrop-blur-md border-border shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Clinic Builder</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Preset Selector */}
        <div className="space-y-2">
          <Label>Preset</Label>
          <ToggleGroup
            type="single"
            value={presetKey}
            onValueChange={(v) => v && setPresetKey(v as PresetKey)}
          >
            {Object.entries(PRESETS).map(([k, v]) => (
              <ToggleGroupItem
                key={k}
                value={k}
                aria-label={`Select ${v.label} preset`}
                variant="outline"
                className="flex-1 min-w-[80px]"
              >
                {v.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Separator />
        <div className="space-y-2">
          <Label>Time of Day</Label>
          <Select
            onValueChange={(v) => v && setTimeOfDay(v as TimeOfDay)}
            value={timeOfDay}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Of Day" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((k) => (
                <SelectItem
                  key={k}
                  value={k}
                  className="capitalize flex-1 min-w-[80px]"
                >
                  {k}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Wall Color */}
        <div className="space-y-2">
          <Label>Wall Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={wallColor}
              onChange={(e) => setWallColor(e.target.value)}
              className="h-10 w-10 p-0 border cursor-pointer"
            />
            <Input
              type="text"
              value={wallColor}
              onChange={(e) => setWallColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <Separator />

        {/* Floor Type */}
        <div className="space-y-2">
          <Label>Floor Type</Label>
          <ToggleGroup
            type="single"
            value={floorTheme}
            onValueChange={(v) =>
              v && setFloorTheme(v as BuilderPreset["room"]["floor"]["theme"])
            }
          >
            {Object.entries(PRESETS[presetKey].room.floor.themes).map(([k]) => (
              <ToggleGroupItem
                key={k}
                value={k}
                variant="outline"
                className="capitalize flex-1 min-w-[80px]"
              >
                {k}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Separator />

        <Separator />

        {/* Room Dimensions */}
        <div className="space-y-2">
          <Label>Room Dimensions (ft)</Label>
          <div className="grid grid-cols-1 gap-4">
            {/* Width */}
            <div className="space-y-1">
              <Label htmlFor="width" className="text-xs">
                Width ({roomDims.width} ft)
              </Label>
              <Slider
                id="width"
                min={10}
                max={100}
                step={1}
                value={[roomDims.width]}
                onValueChange={(val) =>
                  setRoomDims({ ...roomDims, width: val[0] })
                }
              />
            </div>

            {/* Length */}
            <div className="space-y-1">
              <Label htmlFor="length" className="text-xs">
                Length ({roomDims.length} ft)
              </Label>
              <Slider
                id="length"
                min={10}
                max={100}
                step={1}
                value={[roomDims.length]}
                onValueChange={(val) =>
                  setRoomDims({ ...roomDims, length: val[0] })
                }
              />
            </div>

            {/* Height */}
            <div className="space-y-1">
              <Label htmlFor="height" className="text-xs">
                Height ({roomDims.height} ft)
              </Label>
              <Slider
                id="height"
                min={10}
                max={30}
                step={1}
                value={[roomDims.height]}
                onValueChange={(val) =>
                  setRoomDims({ ...roomDims, height: val[0] })
                }
              />
            </div>
          </div>
        </div>
        <Separator />

        {/* Add New Rack */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Add New Rack</h3>

          <div className="space-y-2">
            <Input
              value={newRackName}
              onChange={(e) => setNewRackName(e.target.value)}
              placeholder="Rack Name"
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="columns" className="text-xs">
                  Columns
                </Label>
                <Input
                  id="columns"
                  type="number"
                  value={newRackColumns}
                  onChange={(e) => setNewRackColumns(Number(e.target.value))}
                  placeholder="Columns"
                  min="1"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="rows" className="text-xs">
                  Rows
                </Label>
                <Input
                  id="rows"
                  type="number"
                  value={newRackRows}
                  onChange={(e) => setNewRackRows(Number(e.target.value))}
                  placeholder="Rows"
                  min="1"
                />
              </div>
            </div>

            <Button onClick={handleAddRack} className="w-full">
              Add Rack ({newRackColumns * newRackRows} slots)
            </Button>
          </div>
        </div>

        {/* Selected Rack Actions */}
        {selectedRack !== null && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Selected Rack</h3>
              <Button
                onClick={handleDeleteRack}
                variant="destructive"
                className="w-full"
              >
                Delete Rack
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ControlsPanel;
