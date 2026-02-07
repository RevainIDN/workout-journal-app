export const formatDate = (timestamp: number) => {
	return new Date(timestamp).toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});
};

export const formatFullDate = (isoString: string) => {
	return new Date(isoString).toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};