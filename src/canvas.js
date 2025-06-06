import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { Card } from "./components/card";

const SCALE = 10;
const CANVAS_WIDTH = 10 * SCALE * 8;
const CANVAS_HEIGHT = 10 * SCALE * 10;
const OBJECT_SIZES = {
    "3x3": { width: 3 * SCALE, height: 3 * SCALE },
    "4x3": { width: 4 * SCALE, height: 3 * SCALE },
    "5x3": { width: 5 * SCALE, height: 3 * SCALE },
    "6x3": { width: 6 * SCALE, height: 3 * SCALE },
    "8x3": { width: 8 * SCALE, height: 3 * SCALE },


};

export default function CanvasApp() {
    const [objects, setObjects] = useState([
        { id: 1, x: 50, y: 50, width: OBJECT_SIZES["3x3"].width, height: OBJECT_SIZES["3x3"].height },
    ]);
    const [selectedSize, setSelectedSize] = useState("3x3");


    const addObject = () => {
        const newObject = {
            id: objects.length + 1,
            x: 50,
            y: 50,
            width: OBJECT_SIZES[selectedSize].width,
            height: OBJECT_SIZES[selectedSize].height,
        };
        setObjects([...objects, newObject]);
    };

    return (
        <div className="flex gap-4 p-4">
            {/* Canvas Area */}
            <div
                className="relative border bg-gray-100"
                style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
            >
                {objects.map((obj) => (
                    <Rnd
                        key={obj.id}
                        size={{ width: obj.width, height: obj.height }}
                        position={{ x: obj.x, y: obj.y }}
                        onDragStop={(e, d) => {
                            setObjects((prev) =>
                                prev.map((o) => (o.id === obj.id ? { ...o, x: d.x, y: d.y } : o))
                            );
                        }}
                        bounds="parent"
                        className="bg-blue-500 opacity-70 cursor-move"
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-2">
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border p-2">
                    <option value="3x3">3x3 feet</option>
                    <option value="4x3">4x3 feet</option>
                    <option value="5x3">5x3 feet</option>
                    <option value="6x3">6x3 feet</option>
                    <option value="8x3">8x3 feet</option>

                </select>
                <button onClick={addObject} className="bg-blue-500 text-white p-2 rounded">Add Object</button>
            </div>

            {/* Preview Area */}
            <Card className="p-4">
                <h3> Mobile preview Area</h3>
                <div
                    className="border bg-gray-200"
                    style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, position: 'relative' }}
                >
                    {objects.map((obj) => (
                        <div
                            key={obj.id}
                            className="bg-blue-500 opacity-70"
                            style={{
                                width: obj.width,
                                height: obj.height,
                                position: 'absolute',
                                top: `${obj.y}px`,
                                left: `${obj.x}px`
                            }}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
}
