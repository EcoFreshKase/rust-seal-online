"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useFileContext } from "@/context/FileContext";

export default function FileUpload() {
	const { file, saveFile: addFile, removeFile } = useFileContext();

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			addFile(acceptedFiles[0]);
		},
		[addFile],
	);

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop,
		noKeyboard: true,
	});

	const helpText = useMemo(() => {
		if (isDragActive) {
			return "Drop your file here...";
		}

		return "Drag & drop a file here, or click to choose from your computer";
	}, [isDragActive]);

	return (
		<div className="w-full max-w-xl space-y-3">
			<div
				{...getRootProps()}
				className="cursor-pointer rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50"
			>
				<input {...getInputProps()} />
				<p className="text-sm text-gray-700">{helpText}</p>
				<button
					type="button"
					onClick={open}
					className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
				>
					Upload file
				</button>
			</div>

			{file ? (
				<ul className="space-y-1 text-sm text-gray-700">
					<li key={`${file.name}-${file.lastModified}`}>
						{file.name} ({Math.ceil(file.size / 1024)} KB)
					</li>
					<li>
						<button
							type="button"
							onClick={removeFile}
							className="rounded-md bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-300"
						>
							Remove file
						</button>
					</li>
				</ul>
			) : null}
		</div>
	);
}
