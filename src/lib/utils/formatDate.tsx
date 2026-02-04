export const formatDate = (timestamp: number) => {
	return new Date(timestamp).toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});
};