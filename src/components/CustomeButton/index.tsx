"use client";

import {
  useField,
  toast,
  useFormFields,
  useDocumentInfo,
  useSelection,
  useAllFormFields,
} from "@payloadcms/ui";
import { Button } from "@payloadcms/ui";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  reduceFieldsToValues,
  getSiblingData,
  getFieldPaths,
} from "payload/shared";

export interface Preset {
  name: string;
  type: string;
  value: any;
  id: string;
}

export const SaveToLibrary = ({ path }) => {
  const [fields, dispatchFields] = useAllFormFields();
  const [loading, setLoading] = useState(false);
  const [presetName, setPresetName] = useState("");
  
  const [selectedPreset, setSelectedPreset] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);
  const siblingData = getSiblingData(fields, String(path));
  const blockType = siblingData.blockType
  const [presetType, setPresetType] = useState(blockType);

  const final = Object.entries(siblingData);
  const obj = {}
  useEffect(() => {
    const fetchTypesofSection = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/presets?where[type][equals]=${siblingData.blockType}`
      );
      const data = response.data.docs;
      setPresets(data as Preset[]);
    };
    void fetchTypesofSection();
  }, []);


  const handleSave = async () => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    if (!presetType.trim()) {
      toast.error("Please select a preset type");
      return;
    }

    try {
      let obj: any = {};
      for (let f of final) {
        if (f[0] !== "id" && f[0] != "rows" && f[1] !== "none" && f[0]!="Columns" && f[0]!="blockType") {
          obj[f[0]] = f[1];
        }
      }
      const presetData = {
        name: presetName,
        type: presetType,
        value: obj,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/presets`,
        presetData
      );

      console.log(response);

      toast.success("Saved to Library");
      setPresetName("");
      setPresetType("");
      setShowSaveForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save preset");
    }

    setLoading(false);
  };

  const handleImport = () => {
    if (!selectedPreset) {
      toast.error("Please select a preset to import");
      return;
    }
    const preset = presets.find((p) => p.id === selectedPreset);
    const values = preset?.value;

     Object.entries(values).forEach(([key, value]) => {
      const targetPath = `sections.0.${key}`;
      dispatchFields({ type: "UPDATE", path: targetPath, value });
    });

    // Your import logic will go here
    console.log("preset:", presets);
  };

  return (
    <div className="space-y-4">
      {/* Import Section */}
      <div className="flex items-center gap-2">
        <select
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          className="flex-1 h-9 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select a preset to import</option>
          {presets.length === 0 ? (
            <option>No presets found</option>
          ) : (
            presets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))
          )}
        </select>

        <Button onClick={handleImport} size="small" disabled={!selectedPreset}>
          Import
        </Button>
      </div>

      {/* Save Section */}
      <div className="space-y-3">
        <Button
          onClick={() => setShowSaveForm(!showSaveForm)}
          size="small"
          buttonStyle="secondary"
          className="w-full"
        >
          {showSaveForm ? "Cancel Save" : "Save to Library"}
        </Button>

        {showSaveForm && (
          <div className="space-y-3 p-3 bg-gray-50 border border-gray-200 rounded">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">
                Preset Name
              </label>
              <input
                type="text"
                placeholder="Enter preset name"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="w-full h-9 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">
                Preset Type
              </label>
              <select
                value={presetType}
                onChange={(e) => setPresetType(e.target.value)}
                className="w-full h-9 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="section">Section</option>
                <option value="layout">Layout</option>
                <option value="component">Component</option>
                <option value="row">Row</option>
                <option value="column">Column</option>     
              </select>
            </div>

            <Button
              onClick={handleSave}
              disabled={loading}
              size="small"
              className="w-full"
            >
              {loading ? "Saving..." : "Save Preset"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
