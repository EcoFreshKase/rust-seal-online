"use client";

import { useCallback, useState } from "react";
import { usePasswordContext } from "@/context/PasswordContext";

export default function PasswordInput() {
	const { password, savePassword } = usePasswordContext();
	const [isVisible, setIsVisible] = useState(false);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			savePassword(event.target.value);
		},
		[savePassword],
	);

	const toggleVisibility = useCallback(() => {
		setIsVisible((prev) => !prev);
	}, []);

	return (
		<div className="w-full max-w-xl space-y-2">
			<label htmlFor="password" className="block text-sm font-medium text-gray-700">
				Password
			</label>
			<div className="relative flex items-center">
				<input
					id="password"
					type={isVisible ? "text" : "password"}
					value={password || ""}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					placeholder="Enter your encryption password"
				/>
				<button
					type="button"
					onClick={toggleVisibility}
					className="absolute right-3 text-gray-500 hover:text-gray-700"
					aria-label={isVisible ? "Hide password" : "Show password"}
				>
					{isVisible ? "🙈" : "👁️"}
				</button>
			</div>
		</div>
	);
}
